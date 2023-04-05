import TimeAgo from "./TimeAgo";
import {useGetPostsQuery,} from "./postsSlice";
import styles from "./PostsExcert.module.css";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { openEditPost } from "../api/postSlice";
import {useSpring, animated} from '@react-spring/web'

import { BiBookContent } from "react-icons/bi";
import Reactions from "./Reactions";
import { useState } from "react";

const PostsExcerpt = ({ postId }) => {

  const [isHighlighted, setIsHighlighted] = useState(false)
  const router = useRouter();
  const dispatch = useDispatch();
  let { sectionId } = router.query;

  const { post } = useGetPostsQuery(sectionId, {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });
  const [spring] = useSpring(()=>({
    reverse:!isHighlighted,
    from:{backgroundColor: 'rgb(255, 255, 255)', },
    to:{backgroundColor: 'rgb(167, 167, 248)' },
    config:{duration:313}
}),[isHighlighted])
  const onEditPostClicked = async () => {
    dispatch(openEditPost({ post, sectionId }));
  };
  return (
    <div className={styles.post}>
      <animated.div className={styles.postContent}  style={spring} onMouseEnter={() => setIsHighlighted(true)} onMouseLeave={() => setIsHighlighted(false)}>
        <Reactions post={post} sectionId={sectionId} />
        <div className={styles.title} onClick={onEditPostClicked}>
          <div className={styles.title_letter}>
            {post.title.substring(0, 1).toUpperCase()}
          </div>
          <div className={styles.post_title}>
            {post.title.substring(0, 8)}
          </div>
        </div>
        <div className={styles.content} onClick={onEditPostClicked}>
          <BiBookContent />
          &nbsp;<div>{post.content.substring(0, 9)}</div>...
        </div>
        <TimeAgo timeStamp={post?.createdAt} />
      </animated.div>
    </div>
  );
};

export default PostsExcerpt;
