import styles from "../../styles/components/Status.module.css";

export default function Status(props) {
  return <div className={styles.circle}>{props.message}</div>;
}
