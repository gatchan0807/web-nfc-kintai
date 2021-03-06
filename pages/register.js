import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Register.module.css";

import Status from "../src/components/status";
import { MAIN_MESSAGE } from "../src/constants/message";
import {
  onReadErrorWithAlert,
  onStanbyErrorWithAlert,
} from "../src/lib/nfcCommonHandlers";

export default function Register() {
  const [nfcId, setNFCId] = useState("");
  const [passcode, setPasscode] = useState("");
  const [mainMessage, setMainMessage] = useState(MAIN_MESSAGE.READ_WAIT);

  // 初回NFCカードID確認
  useEffect(() => {
    const reader = new NDEFReader();

    reader
      .scan()
      .then(() => {
        reader.onerror = onReadErrorWithAlert;
        reader.onreading = (event) =>
          nfcIdReadHandler(event, passcode, { setNFCId, setMainMessage });
      })
      .catch(onStanbyErrorWithAlert);
  }, []);

  // パスコード入力待機・書き込み処理
  useEffect(() => {
    if (passcode.length <= 0) return () => {};

    let timer = setTimeout(async () => {
      setMainMessage(MAIN_MESSAGE.WRITE_STAND_BY);

      const writeResult = await writeStart(passcode);
      if (writeResult) {
        setMainMessage(MAIN_MESSAGE.SUCCESS);
      }
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [passcode]);

  // パスコードの入力処理
  const inputPassCode = (passcode) => {
    setPasscode(passcode);

    if (passcode.length <= 0) {
      setMainMessage(MAIN_MESSAGE.INPUT_WAIT);
    }
  };

  //パスコードの内容チェック
  const startConfirmPassCode = () => {
    setMainMessage(MAIN_MESSAGE.TOUCH_CARD);
    const reader = new NDEFReader();

    reader.scan().then(() => {
      reader.onreading = (event) =>
        nfcCardPasscodeReadHandler(event, passcode, { setMainMessage });
    });
  };

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
                onChange={(e) => {
                  inputPassCode(e.target.value);
                }}
                value={passcode}
                placeholder="パスコード"
                type="password"
              />
            </div>
            <Status message={mainMessage}></Status>
            <div className={styles.stepWrapper}>
              <h2 className={styles.stepTitle}>3.&nbsp;書き込みチェック</h2>
              <p className={styles.stepDescription}>
                最後に書き込んだパスコードと入力されている内容が間違いないかチェック
              </p>
              <button
                className={styles.button}
                onTouchEnd={startConfirmPassCode}
              >
                チェック開始
              </button>
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

// ============== NFC Handlers ==============
const writeStart = async (passcode) => {
  const writer = new NDEFWriter();

  try {
    await writer.write({
      records: [{ recordType: "text", data: passcode }],
    });

    return true;
  } catch (error) {
    console.log(error);
    // alert("何らかの原因でパスコード書き込みに失敗しました");
    return false;
  }
};

/**
 * 初回NFCカード読み込み成功時の処理をまとめた関数（ハンドラ）
 * @param {*} event
 * @param {*} passcode
 * @param {*} hooksFunctions
 */
const nfcIdReadHandler = (event, passcode, { setNFCId, setMainMessage }) => {
  setNFCId(event.serialNumber);
  if (passcode.length <= 0) {
    setMainMessage(MAIN_MESSAGE.INPUT_WAIT);
  }
};

/**
 * NFCカードに書き込まれたパスコードと入力済みの内容をチェックする関数（ハンドラ）
 * @param {*} event
 * @param {*} passcode
 * @param {*} hooksFunctions
 */
const nfcCardPasscodeReadHandler = (event, passcode, { setMainMessage }) => {
  const record = event.message.records[0];
  const { data, encoding, recordType } = record;

  if (recordType === "text") {
    const textDecoder = new TextDecoder(encoding);
    const text = textDecoder.decode(data);

    if (passcode === text) {
      setMainMessage(MAIN_MESSAGE.PASSCODE_MATCHED);
    }
  }
};
