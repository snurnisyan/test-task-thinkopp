import styles from './header.module.css';
import {ReactElement} from "react";

export default function Header(): ReactElement {

  return (
    <header className={styles.headerContainer}>
      <h1 className={styles.header}>Полезные материалы</h1>
      <p className={styles.text}>Собрали для вас полезные исследования схемы кормления и другие материалы, которые пригодятся для лучших результатов на вашем хозяйстве</p>
    </header>
  )
}
