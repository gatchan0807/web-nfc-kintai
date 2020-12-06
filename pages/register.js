import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Register.module.css";

import Status from "../src/components/status";

export default function Register() {
  const [nfcId, setNFCId] = useState("");

  useEffect(() => {
    const reader = new NDEFReader();

    reader
      .scan()
      .then(() => {
        reader.onerror = (event) => {
          console.log(event);
          alert("何らかの原因で読み込みに失敗しました");
        };
        reader.onreading = (event) => {
          setNFCId(event.serialNumber);
        };
      })
      .catch((error) => {
        console.log(error);
        alert("NFCカードの読み込み準備に失敗しました");
      });
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>パスコード登録</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className={styles.pageTitle}>カードにパスコードを登録</h1>
        <div>
          <div>
            <div className={styles.stepWrapper}>
              <h2 className={styles.stepTitle}>1.&nbsp;カードIDを確認</h2>
              <p className={styles.stepDescription}>
                まずはNFCカードのIDを読み込んで確認し、スプレッドシートに登録してください
              </p>
              <label className={styles.stepLabel}>カードID</label>
              <input
                className={`${styles.stepInput} ${styles.gray}`}
                placeholder="カードを読み込んでください"
                readOnly
                value={nfcId}
              />
            </div>
            <div className={styles.stepWrapper}>
              <h2 className={styles.stepTitle}>
                2.&nbsp;カードに登録するパスコードを入力
              </h2>
              <p className={styles.stepDescription}>
                NFCカードにパスコードを書き込み、NFCカードIDと紐付けてスプレッドシートに登録してください
              </p>
              <label className={styles.stepLabel}>パスコード</label>
              <input
                className={styles.stepInput}
                placeholder="パスコード"
                type="password"
              />
            </div>
            <Status></Status>
            <div className={styles.stepWrapper}>
              <h2 className={styles.stepTitle}>3.&nbsp;書き込みチェック</h2>
              <p className={styles.stepDescription}>
                最後に書き込んだパスコードと入力されている内容が間違いないかチェック
              </p>
              <button className={styles.button}>チェック開始</button>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <Link href="/">TOPに戻る</Link>
      </footer>
    </div>
  );
}
