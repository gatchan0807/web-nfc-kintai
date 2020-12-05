import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Status from "../src/components/Status";

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
        <NFCUsableFlag></NFCUsableFlag>
        <Status></Status>
      </main>
      <footer className={styles.footer}>このアプリについて</footer>
    </div>
  );
}

function NFCUsableFlag() {
  const [nfcReadFlag, setNFCReadFlag] = useState("False");
  const [nfcWriteFlag, setNFCWriteFlag] = useState("False");

  useEffect(() => {
    if (process.browser) {
      if ("NDEFReader" in window) {
        setNFCReadFlag("True");
      }
      if ("NDEFWriter" in window) {
        setNFCWriteFlag("True");
      }
    }
  });

  return (
    <div>
      NFC Usable (Read): {nfcReadFlag} / NFC Usable (Write): {nfcWriteFlag}
    </div>
  );
}
