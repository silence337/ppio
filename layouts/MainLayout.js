import React, { useState, useEffect,  } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useMotionValue } from 'framer-motion';
import Header from '../components/layout/Header';


export default function MainLayout() {
  const x = useMotionValue(100);
  const y = useMotionValue(100);

  const handleMouse = (event) => {
    x.set(event.pageX);
    y.set(event.pageY);
  };

  const location = useLocation();
  const [path, setPath] = useState('');
  const [contextData, setContextData] = useState(null);

  useEffect(() => {
    const pathname = location.pathname;

    if (pathname === "/") {
      setPath('isMain');
    } else if (pathname === "/history") {
      setPath('isHistory');
      setContextData({ path: 'isHistory' });

    } else if (pathname === "/work") {
      setPath('isWork');
      setContextData({ x, y });

    } else {
      setPath('');
    }
  }, [location.pathname, x, y]);

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
