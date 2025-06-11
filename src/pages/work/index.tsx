import { motion, AnimatePresence, useMotionValue, MotionValue, useTransform } from 'framer-motion';
import type { RootState, AppDispatch } from 'store';
import React, { useRef, useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import useAxios from 'axios-hooks';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import { useSelector, useDispatch } from 'react-redux';
import { pList } from 'store/WorkReducer';
import List from 'components/work';


interface OutletContextType {
  x: MotionValue<number> ;
  y: MotionValue<number>;
}

const Work = () => {
  const context = useOutletContext<OutletContextType>();
  const dispatch = useDispatch<AppDispatch>();

  console.log(context?.x)

  const [{ data: results, loading, error }] = useAxios('/data/work.json');
  const worksData = useSelector((state: RootState) => state.work);

  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);

  const x = context?.x ?? fallbackX;
  const y = context?.y ?? fallbackY;

  const rotateX = useTransform(y, [0, 1000], [25, -25]);
  const rotateY = useTransform(x, [0, 1920], [-30, 30]);
  const boxY = useTransform(x, [0, 1920], [100, -100]);
  const thumX = useTransform(y, [0, 1920], [45, -45]);
  const thumY = useTransform(x, [0, 1920], [-45, 45]);
  const tX = useTransform(y, [0, 1000], [65, -65]);
  const tY = useTransform(x, [0, 1920], [-65, 65]);

  const obj = { thumX, thumY, tX, tY };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 200,
      scale: 0.8,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: 300,
      scale: 0.8,
    },
  };
  const pageTransition = {
    delay: 0,
    type: 'spring',
  };
  

  useEffect(() => {
    if (!results) {
      return;
    }
    dispatch(pList());
    reset();
  }, [results]);

  const workList = useRef<HTMLUListElement | null>(null);
  const currentRef = useRef<HTMLLIElement | null>(null);
  const [activeNum, setActiveNum] = useState<number>(0);
  const doPrev = Math.max(0, activeNum - 1);
  const doNext = Math.min(worksData.length - 1, activeNum + 1);

  const prev = () => {
    setActiveNum(doPrev);
    if (workList.current && currentRef.current) {
      workList.current.style.transform = 'translateX(-' + currentRef.current.offsetWidth * doPrev + 'px)';
    }
  };

  const next = () => {
    setActiveNum(doNext);
    if (workList.current && currentRef.current) {
      workList.current.style.transform = 'translateX(-' + currentRef.current.offsetWidth * doNext + 'px)';
    }
  };

  const reset = () => {
    setActiveNum(0);
    if (workList.current) {
      workList.current.style.transform = 'translateX(0)';
    }
  };

  if (loading) return <p>loading!</p>;
  if (error) return <p>Error!</p>;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="workCircle"
        initial="initial"
        animate="in"
        exit="exit"
        variants={pageVariants}
        transition={pageTransition}
      >
        <ReactScrollWheelHandler
          upHandler={prev}
          downHandler={next}
          leftHandler={next}
          rightHandler={prev}
          wheelConfig={[9, 100, 0.02, 1]}
        >
          <motion.div
            style={{width: '100%', height: 'calc(100vh - 40px)', rotateX: rotateX, rotateY: rotateY }}
          >
            <div className="list">
              <h3>
                Work<i></i>
              </h3>
              <p className="info">
                리뉴얼 및 서비스종료 등의 프로젝트는 제외 되었습니다.
              </p>
              {loading ? (
                <div>loading</div>
              ) : (
                <List
                  data={worksData}
                  ul={workList as React.RefObject<HTMLUListElement>}
                  current={currentRef as React.RefObject<HTMLLIElement>}
                  activeNum={activeNum}
                  obj={obj}
                />
              )}

              <span className="circle"></span>
              <motion.div className="circleBack" style={{ translateX: boxY }} />
            </div>
          </motion.div>
        </ReactScrollWheelHandler>
        <motion.div className="box" />
      </motion.div>
    </AnimatePresence>
  );
};
export default Work;
