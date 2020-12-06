import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";
import Status from "../src/components/status";

export default function Register() {
  return (
    <div className={styles.container}>
      <Head>
        <title>パスコード登録</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>カードにパスコードを登録</h1>
        <div>
          <div>
            <div>
              <h2>カードIDを確認</h2>
              <p>
                まずはNFCカードのIDを読み込んで確認し、スプレッドシートに登録してください
              </p>
              <label>カードID</label>
              <input placeholder="NFCカードID" />
            </div>
            <div>
              <h2>カードに登録するパスコードを入力</h2>
              <p>
                NFCカードにパスコードを書き込み、NFCカードIDと紐付けてスプレッドシートに登録してください
              </p>
              <label>パスコード</label>
              <input placeholder="パスコード" type="password" />
            </div>
            <Status></Status>
            <div>
              <label>書き込みチェック</label>
              <button>チェック開始</button>
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
