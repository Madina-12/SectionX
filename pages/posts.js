import PostsExcerpt from "./features/posts/PostsExcerpt";
import EditPostForm from "./features/posts/EditPostForm";
import Pagination from "./features/posts/Pagination";
import AddSearch from "./features/posts/AddSearch";
import Header from "./features/Sections/Header";

import { openEditPost } from "./features/api/postSlice";
import { useGetPostsQuery } from "./features/posts/postsSlice";
import { useGetSectionsQuery } from "./features/Sections/SectionsSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

import Head from "next/head";
import styles from "./posts.module.css";

// import { prisma } from "../server/db/client";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession, signIn, signOut} from "next-auth/react";


const PostsList = () => {

  const [isSearch, setIsSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const dispatch = useDispatch();
  const router = useRouter();
  let { sectionId } = router.query;
  
  const { data: session } = useSession();
  if (!session) {
    return (<>
        <h2>Login is required</h2>
        <button onClick={signIn}>signin</button>
      </>
    );
  }

  const { sectionName } = useGetSectionsQuery("getSections", {
    selectFromResult: ({ data }) => ({
      sectionName: data?.entities[sectionId].name,
    }),
  });
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery(sectionId);

  let content;
  const startIndex = (pageNumber - 1) * 12;
  const endIndex = startIndex + 12;

  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess && searchText) {
    const regex = new RegExp(searchText, "g");
    const matchingIds = [];

    for (const id of posts.ids) {
      const entity = posts.entities[id];
      if (regex.test(entity.title)) {
        matchingIds.push(id);
      }
    }

    const pageIds = matchingIds.slice(startIndex, endIndex);
    content = pageIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isSuccess) {
    const pageIds = posts.ids.slice(startIndex, endIndex);
    content = pageIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
    console.log(error);
  }

  const onAddPostClicked = () => {
    const post = { title: "", content: "" };
    dispatch(openEditPost({ post, sectionId }));
  };
  const onSearchChanged = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
    <Head>
        <title>Portfolio by Muhammad Umar Sherpur</title>
        <meta name="Sherpur" content="by MUHAMMAD UMAR" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/my_logo_icon.ico" />
      </Head>
    <section className={styles.home}>
      <div className={styles.mainSection}>
        <Header session={session} signOut={signOut} />

        <div className={styles.sectionPage}>
          <div className={styles.first_row}>

            <div>
              <div className={styles.sectionName}>{sectionName}</div>
              {isSuccess && (
                <div className={styles.total_posts}>
                  {posts.ids.length} posts in this section.
                </div>
              )}
            </div>
          </div>

          <AddSearch
            isSearch={isSearch}
            setIsSearch={setIsSearch}
            onAddPostClicked={onAddPostClicked}
            searchText={searchText}
            onSearchChanged={onSearchChanged}
          />

          <div className={styles.content}>
            {content}
            {isSuccess && (
              <Pagination
                setPageNumber={setPageNumber}
                pageNumber={pageNumber}
                postsIds={posts.ids}
              />
            )}
          </div>
          
        </div>
      </div>
      <EditPostForm />
    </section>
    </>
  );
};
export default PostsList;

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    //redirect to login page
    return { 
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    }
  }
  // const visiter = await prisma.user.findUnique({
  //   where:{
  //     email:session.user.email
  //   }
  // })
  // const userId = visiter.id

  return {
    props: {
      session,
    },
  };
}