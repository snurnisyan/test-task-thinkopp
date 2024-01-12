import {RefObject, useCallback, useEffect, useState} from "react";
import PreviousSlideIcon from '../../images/previous-icon.svg?react';
import NextSlideIcon from '../../images/next-icon.svg?react';
import PreviousSlideIconHover from '../../images/previous-icon-hover.svg?react';
import NextSlideIconHover from '../../images/next-icon-hover.svg?react';
import styles from './slider-nav.module.css';

type TSliderNavProps = {
  moveNext: () => void,
  movePrev: () => void,
  isDisabled: (direction: string) => boolean,
  scrollRef: RefObject<HTMLDivElement>,
}

export default function SliderNav({moveNext, movePrev, isDisabled, scrollRef}: TSliderNavProps) {
  const [previousHover, setPreviousHover] = useState<boolean>(false);
  const [nextHover, setNextHover] = useState<boolean>(false);
  const [isPrevDisabled, setPrevDisabled] = useState<boolean>(false);
  const [isNextDisabled, setNextDisabled] = useState<boolean>(false);
  const scrollRefWidth = scrollRef.current?.offsetWidth;

  const onScrollView = useCallback(() => {
    setPrevDisabled(isDisabled('prev'));
    setNextDisabled(isDisabled('next'));
  }, []);

  useEffect(() => {
    onScrollView();
  }, [scrollRefWidth]);

  useEffect(() => {
    if (scrollRef == null || scrollRef.current === null) return;
    scrollRef.current.addEventListener('scroll', onScrollView);
  }, [scrollRef]);

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
        type='button'
        className={styles.icon}
        onMouseEnter={onPreviousMouseEnter}
        onMouseLeave={onPreviousMouseLeave}
        onClick={movePrev}
        disabled={isPrevDisabled}
      >
        { previousHover ? <PreviousSlideIconHover /> : <PreviousSlideIcon /> }
      </button>
      <button
        type='button'
        className={styles.icon}
        onMouseEnter={onNextMouseEnter}
        onMouseLeave={onNextMouseLeave}
        onClick={moveNext}
        disabled={isNextDisabled}
      >
        { nextHover ? <NextSlideIconHover /> : <NextSlideIcon /> }
      </button>
    </section>
  )
}
