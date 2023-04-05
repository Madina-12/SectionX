import {
  useGetSectionsQuery,
  useDeleteSectionMutation,
  useUpdateSectionMutation,
} from "./SectionsSlice";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";

import { GiCancel, GiConfirmed } from "react-icons/gi";


import styles from './SectionsExcert.module.css'

import { useState } from "react";
import Link from "next/link";
const SectionsExcert = ({sectionId}) => {
    const { section } = useGetSectionsQuery('getSections', {
        selectFromResult: ({ data }) => ({
            section: data?.entities[sectionId]
        }),
    })


  const [updateSection] = useUpdateSectionMutation();

  const [deleteSection] = useDeleteSectionMutation();
  // Edit Section
  const [renameSection, setRenameSection] = useState("");
  const [isRenaming, setIsRenaming] = useState("");
  const onSaveRenameSection = async () => {
    if (renameSection) {
      await updateSection({ sectionId: isRenaming, sectionName: renameSection });
      setIsRenaming("");
      setRenameSection("");
    }
  };
  // Delete section
  const [isDeleteClicked, setIsDeletedClicked] = useState("");
  const deleteSectionHandler = async (sectionId) => {
    await deleteSection({ sectionId });
    setIsDeletedClicked("");
  };

  return  <span key={sectionId}>
        {isRenaming !== sectionId ? (
          <div className={styles.sections}>
            <Link href={`/posts/?sectionId=${sectionId}`}  className={styles.sectionNameLink}>
            <div  className={styles.sectionName}>
              {section.name}
            </div>
            </Link>
            <BiEdit
              onClick={() => {
                setIsRenaming(sectionId);
                setRenameSection(section.name);
              }}
              styles={{color:'blue'}}
              className={styles.Reactions}
            />
            {isDeleteClicked === sectionId ? (
              <span>
                <GiConfirmed onClick={() => deleteSectionHandler(sectionId)} styles={{color:'red'}} className={styles.Reactions} />
                <GiCancel onClick={() => setIsDeletedClicked("")} styles={{color:'blue'}} className={styles.Reactions} />
              </span>
            ) : (
              <span className={styles.tooltip}>
                <RiDeleteBin5Line onClick={() => setIsDeletedClicked(sectionId)} className={styles.Reactions} />
                </span>
            )}
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={renameSection}
              onChange={(e) => setRenameSection(e.target.value)}
              className={styles.editInput}
              autoFocus
            />
            <button className={styles.editSave} onClick={onSaveRenameSection}>Save</button>
          </div>
        )}
      </span>
    
};

export default SectionsExcert;
