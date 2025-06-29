import Logo from "../Logo";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLogo}>
          <Logo />
        </div>
        <p className={styles.footerCopyrightText}>
          <span className={styles.footerCopySign}>&copy;</span> 2025 Designed by
          <span className={styles.footerName}> Hamed Teymouri</span>
        </p>
        <p className={styles.footerContact}>
          <span>contact me : </span>
          <a
            className={styles.footerContactMail}
            href="mailto:HamedXTeymouri@gmail.com"
          >
            HamedxTeymouri@gmail.com
          </a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
