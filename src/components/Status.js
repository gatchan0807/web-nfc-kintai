import { useState } from "react";
import styles from "../../styles/components/Status.module.css";
import { MAIN_MESSAGE } from "../constants/message";

export default function Status() {
  const [statusMessage, setStatusMessage] = useState(MAIN_MESSAGE.READ_WAIT);

  return <div className={styles.circle}>{statusMessage}</div>;
}
