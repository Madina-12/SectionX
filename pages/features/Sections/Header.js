import styles from "./Header.module.css";
import Image from "next/image";
import { useState } from "react";
const Header = ({ session, signOut }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  console.log(session);
  return (
    <div className={styles.header}>
      <div className={styles.logo_name}>
        <div className={styles.logo}>
          <Image
            src="/my_logo.webp"
            fill
            sizes="(max-width: 768px) 30vw,
              30vw,"
            alt="logo"
          />
        </div>
        <div className={styles.name}>Sherpur</div>
      </div>
      <div className={styles.user}>
        
        {session.user.image? (
          <div className={styles.user_image} onClick={() => setIsOpen(!isOpen)}>
            <img
              src={session.user.image}
              className={styles.user_image}
              alt=""
            />
          </div>
        ):<div className={styles.user_image} onClick={() => setIsOpen(!isOpen)}></div>
      }
        <div className={styles.info} style={{display:isOpen?'block':'none'}}>
          <div>{session.user.name}</div>
          <div>{session.user.email}</div>
          <button className={styles.logout_button} onClick={signOut}>
          Logout
        </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
