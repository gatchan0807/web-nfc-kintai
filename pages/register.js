import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Register() {
  return (
    <div className={styles.container}>
      <h1>はじめまして！</h1>
      <div>
        <p>Hello World!</p>
        <p>
          <Link href="/">TOPに戻る</Link>
        </p>
      </div>
    </div>
  );
}
