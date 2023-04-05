import { useAddNewSectionMutation } from "./SectionsSlice"
import { useState } from "react";
import styles from './AddNewSection.module.css'
import {BsFillSignIntersectionFill} from 'react-icons/bs'
const AddNewSection = () => {
    const [addNewSection, { isLoading }] = useAddNewSectionMutation()

    const [newSectionName, setNewSectionName] = useState('')

    const canSave = newSectionName && !isLoading;

    const onSaveSectionClicked = async () => {
        if (canSave) {
            try {
                await addNewSection({ sectionName:newSectionName }).unwrap()

                setNewSectionName('')
            } catch (err) {
                console.error('Failed to save the post', err)
            }
        }
    }


    return (
        <section className={styles.addSection}>
            <div className={styles.add}>Add New Section</div>
            <form className={styles.form}>
        <label htmlFor="newSectionName" className={styles.title}>Section Title:</label>
        <input
          type="text"
          id="newSectionName"
          name="newSectionName"
          value={newSectionName}
          onChange={e=>setNewSectionName(e.target.value)}
          className={styles.input}
        />
        <button
          type="button"
          onClick={onSaveSectionClicked}
          disabled={!canSave}
          className={styles.save}
        >
          Save Section
        </button>
      </form>
        </section>
    )
}
export default AddNewSection