import {
  useDeletePostMutation,
  useAddIsHeartMutation,
  useUpdatePinnedMutation,
} from "./postsSlice";

import { AiFillHeart } from "react-icons/ai";
import { BsPinAngleFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import styles from './Reactions.module.css'
const Reactions = ({post, sectionId}) => {
  const [deletePost] = useDeletePostMutation();
  const [addIsHeart] = useAddIsHeartMutation();
  const [updatePinned] = useUpdatePinnedMutation();

  const onDeletePostClicked = async () => {
    try {
      await deletePost({ id: post?.id, sectionId }).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };
  const onHeartClicked = async () => {
    try {
      await addIsHeart({
        postId: post?.id,
        sectionId,
        isHeart: !post.isHeart,
      }).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };
  const onPinnedClicked = async () => {
    try {
      await updatePinned({
        postId: post?.id,
        sectionId,
        isPinned: !post.isPinned,
      }).unwrap();
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };
  return (
    <div className={styles.postReactions}>
      <MdDelete onClick={onDeletePostClicked} style={{ color: "black" }} />
      <AiFillHeart
        onClick={onHeartClicked}
        style={{ color: post.isHeart ? "red" : "yellow" }}
      />
      <BsPinAngleFill
        onClick={onPinnedClicked}
        style={{
          color: post.isPinned ? "darkgreen" : "rgb(159, 250, 167)",
        }}
      />
    </div>
  );
};

export default Reactions;
