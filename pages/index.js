import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          カードにパスコードを<Link href="/register">登録する</Link>
        </h1>
      </main>

      <footer className={styles.footer}>このアプリについて</footer>
    </div>
  );
}
