import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.mainContainer}>
      <h2>Main section</h2>
      <div>
        <button>MORE INFO</button>
        <button>BUY A TICKET</button>
      </div>
    </div>
  );
}
