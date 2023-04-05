import { parseISO, formatDistanceToNow } from 'date-fns';
import styles from './TimeAgo.module.css'
import {TfiTimer} from 'react-icons/tfi'
const TimeAgo = ({ timeStamp }) => {
    let timeAgo = ''
    if (timeStamp) {
        const date = parseISO(timeStamp)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    
    return (
        <span className={styles.timeAgo}>
            &nbsp;<TfiTimer />&nbsp;&nbsp;<span>{timeAgo}</span>
        </span>
    )
}
export default TimeAgo