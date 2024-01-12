import Card from "../card/card";
import data from "../../utils/mockData";
import {ReactElement, useEffect, useRef, useState} from "react";
import styles from './slider.module.css';
import {borderRules} from "../../utils/constants";
import {TBorderType} from "../../utils/types";
import SliderNav from "../slider-nav/slider-nav";

export default function Slider(): ReactElement {
  const borderTypes = Object.keys(borderRules) as TBorderType[];
  const [bordersForRender, setBorders] = useState<TBorderType[]>([] as TBorderType[]);
  const maxScrollWidth = useRef<number>(0);
  const slider = useRef<HTMLDivElement>(null);

  const movePrev = () => {
    if (slider.current === null) return;
    let newScroll = Math.round(
      (slider.current.scrollLeft - slider.current.offsetWidth)/slider.current.offsetWidth
    )*slider.current.offsetWidth;
    newScroll = Math.max(newScroll, 0);
    slider.current.scrollLeft = newScroll;
  };

  const moveNext = () => {
    if (slider.current === null) return;
    let newScroll = Math.round(
      (slider.current.scrollLeft + slider.current.offsetWidth)/slider.current.offsetWidth
    )*slider.current.offsetWidth;
    newScroll = Math.min(newScroll, maxScrollWidth.current);
    slider.current.scrollLeft = newScroll;
  };

  useEffect(() => {
    maxScrollWidth.current = slider.current
      ? slider.current.scrollWidth - slider.current.offsetWidth
      : 0;
  }, []);

  useEffect(() => {
    const firstBorderType = borderTypes[Math.floor(Math.random() * borderTypes.length)];
    const bordersArray = [firstBorderType];
    for (let i = 1; i < data.length; i++) {
      const possibleBorders = borderRules[bordersArray[i-1]];
      const borderType = possibleBorders[Math.floor(Math.random() * possibleBorders.length)]
      bordersArray.push(borderType);
    }
    setBorders(bordersArray);
  }, [borderRules]);

  const isDisabled = (direction: string) => {
    if (slider.current === null) return true;
    if (direction === 'prev') {
      return slider.current.scrollLeft <= 0;
    }

    if (direction === 'next') {
      return slider.current.scrollLeft >= maxScrollWidth.current;
    }
    return true;
  };

  return (
    <main className={styles.slider}>
      <div className={styles.wrapper}>
        <section className={styles.cardSection} ref={slider}>
          {data.map((card, index) => {
            let isLong = false;
            if (card.title.length > 35) {
              isLong = true;
            }
            return (<Card cardData={card} long={isLong} borderType={bordersForRender[index]} key={card.id} />)
          })}
        </section>
      </div>
      <SliderNav movePrev={movePrev} moveNext={moveNext} isDisabled={isDisabled} scrollRef={slider} />
    </main>
  )
}
