import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import Header from 'components/layout/Header';
import Main from 'pages/main/index';
import Work from 'pages/work/index';
import History from 'pages/history/index';

const App = () => {
  const history = useNavigate(); // useHistory
  const location = useLocation();
  const x = useMotionValue(100);
  const y = useMotionValue(100);
  const [path, setPath] = useState('');

  const handleMouse = (event) => {
    x.set(event.pageX);
    y.set(event.pageY);
  };

  useEffect(() => {
    if (history.pathname === '/' || location.pathname === '/') {
      setPath('isMain');
    } else if (
      history.pathname === '/history' ||
      location.pathname === '/history'
    ) {
      setPath('isHistory');
    } else if (history.pathname === '/work' || location.pathname === '/work') {
      setPath('isWork');
    }
  }, [location]);

  return (
    <motion.div
      className={'rootWrap'}
      style={{ perspective: 3600, height: '100%' }}
      onMouseMove={handleMouse}
    >
      <Header pathClassName={path} />

      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/work" element={<Work x={x} y={y} />} />
          <Route
            exact
            path="/history"
            element={<History pathClassName={path} />}
          />
          {/* <Navigate path="*" to="/" /> */}
        </Routes>
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
