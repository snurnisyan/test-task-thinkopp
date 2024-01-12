import styles from "./card.module.css";
import data from "../../utils/mockData";
import {ReactElement} from "react";
import {borderStyles} from "../../utils/constants";
import {TBorderType} from "../../utils/types";


type TCardDataProps = {
  cardData: typeof data[0],
  long: boolean,
  borderType: TBorderType /* 'leafLeft' | 'leafRight' | 'round' */
}
export default function Card({cardData, long, borderType} : TCardDataProps): ReactElement {

  return (
      <div className={styles.cardContainer + (long ? ` ${styles.longCard}` : '')}>
        <div className={styles.imageContainer + (long ? ` ${styles.longImageContainer}` : '')}>
          <img
            src={cardData.img}
            alt={cardData.title}
            className={styles.image + (long ? ` ${styles.longImage}` : '')}
            style={borderStyles[borderType]}
          />
        </div>
        <div className={styles.titleContainer}>
          <p className={styles.title}>{cardData.title}</p>
          <p className={styles.data}>{cardData.date}</p>
        </div>
      </div>
    )
}
