import React, { useRef, useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import { motion, useTransform } from 'framer-motion';
import ReactScrollWheelHandler from 'react-scroll-wheel-handler';
import { useSelector, useDispatch } from 'react-redux';
import { setData } from 'store/WorkReducer';
import List from 'components/work/List';

const Work = ({ x, y }) => {
  const dispatch = useDispatch();
  //const listData = useSelector((state) => state.work);
  const [{ data: results, loading, error }, refetch] =
    useAxios('/data/work.json');
  const { data: worksData } = useSelector((state) => state.work);

  let rotateX = useTransform(y, [0, 1000], [25, -25]);
  let rotateY = useTransform(x, [0, 1920], [-30, 30]);
  //let boxX = useTransform(y, [0, 1920], [40, -40]);
  let boxY = useTransform(x, [0, 1920], [100, -100]);
  let thumX = useTransform(y, [0, 1920], [45, -45]);
  let thumY = useTransform(x, [0, 1920], [-45, 45]);
  let tX = useTransform(y, [0, 1000], [65, -65]);
  let tY = useTransform(x, [0, 1920], [-65, 65]);

  const obj = { thumX, thumY, tX, tY };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: '200px',
      scale: 0.8,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: '300px',
      scale: 0.8,
    },
  };
  const pageTransition = {
    //ease: "easeInOut",
    delay: 0,
    type: 'spring',
    //stiffness: 80,
    transition: {
      //delayChildren: 0.8,
    },
  };
  const url = (e) => {
    if (e === '') {
      return alert('오픈 준비중입니다');
    }
    window.open(e);
  };

  useEffect(() => {
    if (!results) {
      return;
    }
    const { Workspace: data } = results;
    dispatch(setData({ data }));
    reset();
  }, [results]);

  const workList = useRef(null);
  const currentRef = useRef(null);
  const [activeNum, setActiveNum] = useState(0);
  const doPrev = Math.max(0, activeNum - 1);
  const doNext = Math.min(worksData.length - 1, activeNum + 1);

  const prev = () => {
    setActiveNum(doPrev);
    workList.current.style.transform =
      'translateX(-' + currentRef.current.offsetWidth * doPrev + 'px)';
  };

  const next = () => {
    setActiveNum(doNext);
    workList.current.style.transform =
      'translateX(-' + currentRef.current.offsetWidth * doNext + 'px)';
  };

  const reset = () => {
    setActiveNum(0);
    workList.current.style.transform = 'translateX(0)';
  };

  if (loading) return <p>loading!</p>;
  if (error) return <p>Error!</p>;

  return (
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
        wheelConfig={[9, 100, 0.02]}
        customStyle={{
          width: '100%',
          height: 'calc(100vh - 40px)',
        }}
      >
        <motion.div
          style={{ height: '100%', rotateX: rotateX, rotateY: rotateY }}
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
                worksData={worksData}
                ulRef={workList}
                currentRef={currentRef}
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
  );
};
export default Work;
