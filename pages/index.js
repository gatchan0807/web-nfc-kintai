import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Status from "../src/components/status";
import { MAIN_MESSAGE } from "../src/constants/message";

export default function Home() {
  const [mainMessage, setMainMessage] = useState(MAIN_MESSAGE.LOADING);

  // 初回NFCカードID確認
  useEffect(() => {
    const reader = new NDEFReader();
    setTimeout(() => {
      setMainMessage(MAIN_MESSAGE.READ_WAIT);
      reader
        .scan()
        .then(() => {
          reader.onerror = (event) => {
            console.log(event);
            alert("何らかの原因で読み込みに失敗しました");
          };
          reader.onreading = async (event) => {
            // TODO: カードのserialNumberとtext dataを取得
            console.log(event.serialNumber);
            // 表示メッセージを変更
            setMainMessage(MAIN_MESSAGE.SENDING);
            // APIリクエスト実行
            const res = await fetch("/api/hello");
            console.log(await res.json());

            // TODO: API結果によってMAIN_MESSAGEの値を変更
          };
        })
        .catch((error) => {
          console.log(error);
          alert("NFCカードの読み込み準備に失敗しました");
        });
    }, 1000);
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>WebNFCで勤怠送るくん！</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>WebNFCで！勤怠送るくん！</h1>
        <Status message={mainMessage} />
        <span className={styles.link}>
          <Link href="/register">カードにパスコードを登録する</Link>
        </span>
      </main>
      <footer className={styles.footer}>このアプリについて</footer>
    </div>
  );
}
