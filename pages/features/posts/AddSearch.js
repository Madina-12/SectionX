import React from 'react'
import styles from './AddSearch.module.css'
import { GoPlus } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { useSpring, animated } from '@react-spring/web';
const AddSearch = ({isSearch, setIsSearch, onAddPostClicked, searchText, onSearchChanged}) => {
  const [spring] = useSpring(()=>({
    reverse:isSearch,
    from:{rotateX:0, rotateY:0, opacity:1},
    to:{rotateX:0, rotateY:90, opacity:0},
    config:{duration:92}
}),[isSearch])
  return (
    <div className={styles.add_filter}>
            <div className={styles.addIconDiv}>
              <GoPlus onClick={onAddPostClicked} className={styles.addIcon} />
            </div>
            <span
              className={styles.search}
              onClick={() => setIsSearch(!isSearch)}
            >
              <FaSearch />
              Search
            </span>
            <animated.div
              className={styles.search_prompt}
              style={{ ...spring }}
            >
              <input
                type="text"
                value={searchText}
                onChange={onSearchChanged}
                className={styles.search_input}
                placeholder="search here"
              />
            </animated.div>
          </div>
  )
}

export default AddSearch