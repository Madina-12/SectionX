import { useState, useEffect } from 'react'
import { useUpdatePostMutation, useAddNewPostMutation } from "./postsSlice";
import { useDispatch, useSelector } from 'react-redux';
import { closeEditPost } from '../api/postSlice';
import styles from './EditPostForm.module.css'
import { useSpring, animated } from '@react-spring/web';

const EditPostForm = () => {
    const [updatePost] = useUpdatePostMutation()
    const [addNewPost] = useAddNewPostMutation()
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const {isOpen, post, sectionId} = useSelector(state=>state.post)

        useEffect(() => {
            if (isOpen && post.title) {
                setTitle(post.title)
                setContent(post.content)
            }
    }, [isOpen])
    const {...rest} = useSpring({
        from:{rotateX:90,opacity:0},
        to:{rotateX:isOpen?0:90,
            opacity:isOpen?1:1},
        config:{tension:100, friction:10}
    })
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)

    const canSave = [title, content].every(Boolean);

    const onSavePostClicked = async (e) => {
        e.preventDefault()
        if (!post.title && canSave) {
            try {
                dispatch(closeEditPost())
                await addNewPost({sectionId, title, content})
                setTitle('')
                setContent('')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
            return;
        }
        else if (title===post.title && content===post.content) {
            try {
                setTitle('')
                setContent('')
                dispatch(closeEditPost())
            } catch (err) {
                console.error('Failed to save the post', err)
            }
            return;
        }
        else if (canSave) {
            try {
                dispatch(closeEditPost())
                await updatePost({ id: post?.id, sectionId, title, content }).unwrap()
                setTitle('')
                setContent('')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }
    return (<>
            <div className={styles.back} onClick={onSavePostClicked} style={{backgroundColor:'rgba(0,0,0,0.4)', display:isOpen?'block':'none'}}></div>
        <animated.div  style={{...rest}} className={styles.section}>
            <form className={styles.form}>
                
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                    className={styles.title}
                    placeholder='Title'
                    style={{display:isOpen?'block':'none'}}
                />
               
                
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                    className={styles.content}
                    placeholder={isOpen?'Content':''}
                    style={{boxShadow: isOpen?'0rem 0rem 0.4rem black inset':'none'}}
                />
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                    className={styles.submitButton}
                    style={{display:isOpen?'block':'none'}}
                >
                    Save Post
                </button>
            </form>
        </animated.div>
        </>
    )
}

export default EditPostForm