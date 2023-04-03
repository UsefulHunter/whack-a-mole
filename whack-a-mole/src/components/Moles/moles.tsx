import styles from "./moles.module.css";
const Moles = ({ children }: { children: any }) => (
  <div className={styles.moles}>{children}</div>
);

export default Moles;
