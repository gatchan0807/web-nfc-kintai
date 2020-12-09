import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Status from "../src/components/status";
import { MAIN_MESSAGE } from "../src/constants/message";
import {
  onReadErrorWithAlert,
  onStanbyErrorWithAlert,
} from "../src/lib/nfcCommonHandlers";

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
          reader.onerror = onReadErrorWithAlert;
          reader.onreading = (event) => {
            postNFCDataToApi(event, { setMainMessage });
          };
        })
        .catch(onStanbyErrorWithAlert);
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

/**
 * NFCカードに書き込まれたパスコードとNFCカードのIDをAPIに送信する関数（ハンドラ）
 * @param {*} event
 * @param {*} hooksFunctions
 */
const postNFCDataToApi = async (event, { setMainMessage }) => {
  let payload = {
    cardId: "",
    passcode: "",
  };

  payload.cardId = event.serialNumber;

  const record = event.message.records[0];
  const { data, encoding, recordType } = record;

  if (recordType === "text") {
    const textDecoder = new TextDecoder(encoding);
    payload.passcode = textDecoder.decode(data);
  }
  // チェック用
  console.log(payload);

  // 表示メッセージを変更
  setMainMessage(MAIN_MESSAGE.SENDING);
  // APIリクエスト実行
  const res = await fetch("/api/hello", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  console.log(await res.json());

  // TODO: API結果によってMAIN_MESSAGEの値を変更
};
