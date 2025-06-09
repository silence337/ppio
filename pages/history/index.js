import { motion, AnimatePresence } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import { useSelector, useDispatch } from 'react-redux';
import { hList } from 'store/HistoryReducer';
import List from 'components/history/List';

const History = () => {
  const context = useOutletContext();
  const pathClassName = context?.path;
  console.log(pathClassName);
  const dispatch = useDispatch();
  const historyData = useSelector((state) => state.history);
  const listRef = useRef(null);
  const currentRef = useRef(null);
  const bar = useRef(null);
  const [historyNum, setHistoryNum] = useState(0);

  const doUp = Math.max(0, historyNum - 1);
  const doDown = Math.min(historyData.length - 1, historyNum + 1);

  const prev = () => {
    setHistoryNum(doUp);
    let pos = currentRef.current.offsetHeight * doUp;
    listRef.current.style.transform = 'translateY(-' + pos + 'px)';
    progress(pos);
    //console.log(doUp);
  };

  const next = () => {
    setHistoryNum(doDown);
    let pos = currentRef.current.offsetHeight * doDown;
    listRef.current.style.transform = 'translateY(-' + pos + 'px)';
    progress(pos);
  };

  const reset = () => {
    setHistoryNum(0);
    listRef.current.style.transform = 'translateY(0)';
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
  const pageTransition = {
    type: 'tween',
    ease: 'linear',
    delay: 0,
    duration: 0.6,
  };

  const progress = (s) => {
    //100 / height * measure
    console.log(s);
    let pos = (100 / (listRef.current.offsetHeight - 442)) * s;
    bar.current.style.width = (pos < 100 ? pos : '100') + '%';
    //console.log(historyList.current.offsetHeight, windowH);
  };

  useEffect(() => {
    reset();
    dispatch(hList());
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={'history'}
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <ReactScrollWheelHandler
          upHandler={prev}
          downHandler={next}
          wheelConfig={[9, 100, 0.02]}
          style={{width: '100%', height: '100%'}}
        >
          <span className="progress">
            <span ref={bar}></span>
          </span>
          <div
            className={`list${pathClassName === 'isHistory' ? ' show' : ''}`}
          >
            <List
              historyData={historyData}
              listRef={listRef}
              currentRef={currentRef}
              historyNum={historyNum}
            />
            <span className="circle"></span>
          </div>
        </ReactScrollWheelHandler>
      </motion.div>
    </AnimatePresence>
  );
};
export default History;
