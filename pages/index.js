import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Status from "../src/components/status";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>WebNFCで！勤怠送るくん！</h1>
        <Status></Status>
        <span className={styles.link}>
          <Link href="/register">カードにパスコードを登録する</Link>
        </span>
      </main>
      <footer className={styles.footer}>このアプリについて</footer>
    </div>
  );
}
