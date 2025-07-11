import { motion, Transition, AnimatePresence } from 'framer-motion';
import type { RootState, AppDispatch } from 'store';
import React, { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import { useSelector, useDispatch } from 'react-redux';
import { hList } from 'store/HistorySlice';
import List from 'components/History';

interface OutletContextType {
  path: string;
}

const History = () => {
  const context = useOutletContext<OutletContextType>();
  const pathClassName = context.path;
  const dispatch = useDispatch<AppDispatch>();
  const historyData = useSelector((state: RootState) => state.history);
  const listRef = useRef<HTMLUListElement | null>(null);
  const currentRef = useRef<HTMLLIElement | null>(null);
  const bar = useRef<HTMLSpanElement | null>(null);
  const [historyNum, setHistoryNum] = useState(0);

  const doUp = Math.max(0, historyNum - 1);
  const doDown = Math.min(historyData.length - 1, historyNum + 1);

  const prev = () => {
    setHistoryNum(doUp);
    if (currentRef.current && listRef.current) {
      let pos = currentRef.current.offsetHeight * doUp;
      listRef.current.style.transform = 'translateY(-' + pos + 'px)';
      progress(pos);
    }
    //console.log(doUp);
  };

  const next = () => {
    setHistoryNum(doDown);
    if (currentRef.current && listRef.current) {
      let pos = currentRef.current.offsetHeight * doDown;
      listRef.current.style.transform = 'translateY(-' + pos + 'px)';
      progress(pos);
    }
  };

  const reset = () => {
    setHistoryNum(0);
    if (listRef.current) {
      listRef.current.style.transform = 'translateY(0)';
    }
  };

  const pageVariants = {
    initial: {
      opacity: 0,
    },
    in: {
      opacity: 1,
    },
    out: {
      opacity: 0,
    },
  };
  const pageTransition: Transition = {
    type: 'tween',
    ease: 'easeInOut',
    delay: 0,
    duration: 0.6,
  };

  const progress = (s: number) => {
    //100 / height * measure
    console.log(s);
    if (!listRef.current || !bar.current) return;
    let pos = (100 / (listRef.current.offsetHeight - 442)) * s;
    bar.current.style.width = (pos < 100 ? pos : '100') + '%';
    //console.log(historyList.current.offsetHeight, windowH);
  };

  useEffect(() => {
    reset();
    dispatch(hList());
  }, []);

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        className={'history'}
        initial='initial'
        animate='in'
        exit='exit'
        variants={pageVariants}
        transition={pageTransition}
      >
        <ReactScrollWheelHandler
          upHandler={prev}
          downHandler={next}
          wheelConfig={[9, 100, 0.02, 0]}
          style={{ width: '100%', height: '100%' }}
        >
          <span className='progress'>
            <span ref={bar}></span>
          </span>
          <div
            className={`list${pathClassName === 'isHistory' ? ' show' : ''}`}
          >
            <List
              data={historyData}
              list={listRef as React.RefObject<HTMLUListElement>}
              current={currentRef as React.RefObject<HTMLLIElement>}
              number={historyNum}
            />
            <span className='circle'></span>
          </div>
        </ReactScrollWheelHandler>
      </motion.div>
    </AnimatePresence>
  );
};
export default History;
