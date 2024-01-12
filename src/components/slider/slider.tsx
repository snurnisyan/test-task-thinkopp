import Card from "../card/card";
import data from "../../utils/mockData";
import {ReactElement, useEffect, useLayoutEffect, useRef, useState} from "react";
import styles from './slider.module.css';
import {borderRules} from "../../utils/constants";
import {TBorderType} from "../../utils/types";
import SliderNav from "../slider-nav/slider-nav";

export default function Slider(): ReactElement {
  const borderTypes = Object.keys(borderRules) as TBorderType[];
  const [bordersForRender, setBorders] = useState([] as TBorderType[]);

  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const slider = useRef<HTMLDivElement>(null);
  const minScrollWidth = 344;

  console.log('currentIndex=', currentIndex);
  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const moveNext = () => {
    if (slider.current !== null && slider.current.offsetWidth * currentIndex <= maxScrollWidth.current) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  useEffect(() => {
    if (slider !== null && slider.current !== null) {
      slider.current.scrollLeft = slider.current.offsetWidth * currentIndex;
    }
  }, [currentIndex]);

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

  // const onViewScroll = () => {
  //   if (slider !== null && slider.current !== null) {
  //     let newIndex = currentIndex;
  //     if (slider.current.scrollLeft + slider.current.offsetWidth >= maxScrollWidth.current) {
  //       newIndex = 1;
  //     }
  //
  //     // const newIndex = slider.current.scrollLeft/slider.current.offsetWidth;
  //     console.log('slider.current.scrollLeft=', slider.current.scrollLeft);
  //     console.log('slider.current.offsetWidth=', slider.current.offsetWidth);
  //     console.log('newIndex=', newIndex);
  //     setCurrentIndex(newIndex);
  //   }
  // };

  const isDisabled = (direction: string) => {
    if (direction === 'prev') {
      return currentIndex <= 0;
    }

    if (direction === 'next' && slider.current !== null) {
      return slider.current.offsetWidth * currentIndex >= maxScrollWidth.current;
    }

    return false;
  };

  return (
    <main className={styles.slider}>
      <div className={styles.wrapper}>
        <section className={styles.cardSection} ref={slider}>
          {/*onScroll={onViewScroll}*/}
          {data.map((card, index) => {
            let isLong = false;
            if (card.title.length > 35) {
              isLong = true;
            }
            return (<Card cardData={card} long={isLong} borderType={bordersForRender[index]} key={card.id} />)
          })}
        </section>
      </div>
      <SliderNav movePrev={movePrev} moveNext={moveNext} isDisabled={isDisabled} />
    </main>
  )
}
