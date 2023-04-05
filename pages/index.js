import { useGetSectionsQuery } from "this/features/Sections/SectionsSlice";
import SectionsExcert from "this/features/Sections/SectionsExcert";
import AddNewSection from "this/features/Sections/AddNewSection";
import styles from "this/styles/Home.module.css";

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useSession, signIn, signOut} from "next-auth/react";

import Header from "this/features/Sections/Header";

const SectionsList = () => {

  const { data: session } = useSession();
  

  const {
    data: sections,
    isLoading: isGetLoading,
    isSuccess,
    isError,
    error,
  } = useGetSectionsQuery("getSections");
  
  // Sections List
  let content;
  if (isGetLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    const renderedSections = sections.ids.map((sectionId) => (
      <SectionsExcert key={sectionId} sectionId={sectionId} />
    ));

    content = (
      <section>
        
        <h2 className={styles.heading}>Sections List</h2>
        <div className={styles.deleteDescription}>
          Sections can only be deleted when empty.
        </div>
        <div className={styles.sectionsList}>{renderedSections}</div>
      </section>
    );
  } else if (isError) {
    content = <h2>Some thing went wrong....</h2>;
    console.log(error);
  }

  return (
    <div className={styles.section}>
      <Header session={session} signOut={signOut} />
      <AddNewSection />
      <div>{content}</div>
    </div>
  );
};

export default SectionsList;

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
  

  return {
    props: {
      session,
    },
  };
}