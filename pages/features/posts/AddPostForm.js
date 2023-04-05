import { useState } from "react";
import { useAddNewPostMutation } from "./postsSlice";
import { useRouter } from "next/router";
import { useGetSectionsQuery } from "../Sections/SectionsSlice";

const AddPostForm = () => {
    const [addNewPost, { isLoading }] = useAddNewPostMutation()
    const router = useRouter()
    const {sectionId: sectionid} = router.query
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [sectionId, setSectionId] = useState(sectionid)

    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onSectionChanged = e => setSectionId(e.target.value)

    const canSave = [title, content, sectionId].every(Boolean) && !isLoading;

    const { data: sections, isSuccess } = useGetSectionsQuery('getSections')

    const onSavePostClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            try {
                // console.log(title, content, sectionId);
                await addNewPost({ title, content,sectionId}).unwrap()

                setTitle('')
                setContent('')
                setSectionId('')
                // router.push('/features/posts/PostsList')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }

    let sectionsOptions
    if (isSuccess) {
        sectionsOptions = sections.ids.map(id => (
            <option key={id} value={id}>
                {sections.entities[id].name}
            </option>
        ))
    }
    
    console.log(sections);
    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <label htmlFor="postSection">Section:</label>
                <select id="postSection" value={sectionId} onChange={onSectionChanged} >
                    {sectionsOptions}
                </select>
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >Save Post</button>
            </form>
        </section>
    )
}
export default AddPostForm