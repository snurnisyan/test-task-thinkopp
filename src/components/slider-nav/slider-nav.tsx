import {useState} from "react";
import PreviousSlideIcon from '../../images/previous-icon.svg?react';
import NextSlideIcon from '../../images/next-icon.svg?react';
import PreviousSlideIconHover from '../../images/previous-icon-hover.svg?react';
import NextSlideIconHover from '../../images/next-icon-hover.svg?react';
import styles from './slider-nav.module.css';

type TSliderNavProps = {
  moveNext: () => void,
  movePrev: () => void,
  isDisabled: (direction: string) => boolean
}
export default function SliderNav({moveNext, movePrev, isDisabled}: TSliderNavProps) {
  const [previousHover, setPreviousHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);
  const onPreviousMouseEnter = () => {
    setPreviousHover(true);
  }
  const onPreviousMouseLeave = () => {
    setPreviousHover(false);
  }

  const onNextMouseEnter = () => {
    setNextHover(true);
  }
  const onNextMouseLeave = () => {
    setNextHover(false);
  }

  return (
    <section className={styles.navSection}>
      <button
        className={styles.icon}
        onMouseEnter={onPreviousMouseEnter}
        onMouseLeave={onPreviousMouseLeave}
        onClick={movePrev}
        disabled={isDisabled('prev')}
      >
        { previousHover ? <PreviousSlideIconHover /> : <PreviousSlideIcon /> }
      </button>
      <button
        className={styles.icon}
        onMouseEnter={onNextMouseEnter}
        onMouseLeave={onNextMouseLeave}
        onClick={moveNext}
        disabled={isDisabled('next')}
      >
        { nextHover ? <NextSlideIconHover /> : <NextSlideIcon /> }
      </button>
    </section>
  )
}
