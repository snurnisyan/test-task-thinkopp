import data from "../../utils/mockData";
import styles from "./card.module.css";

export default function Card() {
  const card = data[0];
  return (
    <div className={styles.cardContainer}>
      <img src={card.img} alt={card.title} className={styles.image} />
      <div className={styles.titleContainer}>
        <p className={styles.title}>{card.title}</p>
        <p className={styles.data}>{card.date}</p>
      </div>
    </div>
  )
}
