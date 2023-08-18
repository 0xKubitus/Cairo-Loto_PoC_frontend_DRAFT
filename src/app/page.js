import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1>Header</h1>
      </header>

      <main className={styles.main}>
        <div className={styles.description}>
          <p>Main section</p>
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.insideFooter}>
          <p>footer</p>
        </div>
      </footer>
    </>
  );
}
