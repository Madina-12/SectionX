import { useRef } from 'react'
import styles from './AddSearch.module.css'
import { GoPlus } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useSpring, animated } from '@react-spring/web';
const AddSearch = ({isSearch, setIsSearch, onAddPostClicked, searchText, setSearchText, onSearchChanged, setPageNumber}) => {
  const inputRef = useRef(null);
  const [spring] = useSpring(()=>({
    reverse:isSearch,
    from:{rotateX:0, rotateY:0, opacity:1},
    to:{rotateX:0, rotateY:90, opacity:0},
    config:{duration:92}
}),[isSearch])
const searchClickHandler = () => {
  setIsSearch(!isSearch)
  setSearchText("")
  setPageNumber(1)
  if(!isSearch){
    inputRef.current.focus();
  }
}
  return (
    <div className={styles.add_filter}>
            <div className={styles.addIconDiv}>
              <GoPlus onClick={onAddPostClicked} className={styles.addIcon} />
            </div>
            <span
              className={styles.search}
              onClick={searchClickHandler}

            >
              {isSearch?<ImCross />:<FaSearch />}
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
                ref={inputRef}
              />
            </animated.div>
          </div>
  )
}

export default AddSearch