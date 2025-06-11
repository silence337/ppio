import React, { useState, useEffect,  } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useMotionValue, MotionValue  } from 'framer-motion';
import Header from '../components/layout/Header';

interface HistoryContext {
  path: 'isHistory';
}

interface WorkContext {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

type LayoutContext = HistoryContext | WorkContext | null;

const MainLayout = () => {
  const x = useMotionValue(100);
  const y = useMotionValue(100);

  const handleMouse = (event: React.MouseEvent<HTMLDivElement>) => {
    x.set(event.pageX);
    y.set(event.pageY);
  };

  const location = useLocation();
  const [path, setPath] = useState('');
  const [contextData, setContextData] = useState<LayoutContext>(null);

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === "/") {
      setPath('isMain');
    } else if (pathname === "/history") {
      setPath('isHistory');
      setContextData({ path: 'isHistory' });

    } else if (pathname === "/work") {
      setPath('isWork');
      setContextData({ x, y } as WorkContext);

    } else {
      setPath('');
    }
  }, [location.pathname]);

  return (
    <motion.div
      className={'rootWrap'}
      style={{ perspective: 3600, height: '100%' }}
      onMouseMove={handleMouse}
    >
      <Header pathClassName={path} />
      <Outlet context={contextData} />
    </motion.div>
  );
}
export default MainLayout;