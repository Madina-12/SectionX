import React from 'react'
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styles from './Pagination.module.css'
const Pagination = ({setPageNumber, pageNumber, postsIds}) => {
  return (
    <div>
              <div className={styles.pagination_buttons}>
                <button
                  onClick={() => setPageNumber(pageNumber - 1)}
                  disabled={pageNumber == 1}
                  className={styles.next_previous}
                >
                  {" "}
                  <GrFormPrevious /> <span>previous</span>
                </button>
                <button
                  onClick={() => setPageNumber(1)}
                  style={{
                    backgroundColor:
                      pageNumber === 1 ? "red" : "white",
                  }}
                >
                  1
                </button>
                <button
                  onClick={() => setPageNumber(2)}
                  style={{
                    backgroundColor:
                      pageNumber === 2 ? "red" : "white",
                  }}
                  disabled={Math.ceil(postsIds.length / 12) < 2}
                >
                  2
                </button>
                <button
                  onClick={() => setPageNumber(3)}
                  disabled={Math.ceil(postsIds.length / 12) < 3}
                >
                  3
                </button>
                <button
                  onClick={() => setPageNumber(pageNumber + 1)}
                  disabled={pageNumber == Math.ceil(postsIds.length / 12)}
                  className={styles.next_previous}
                >
                  <span>next</span> <GrFormNext />
                </button>
              </div>
            </div>
  )
}

export default Pagination