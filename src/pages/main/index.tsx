import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, Transition } from 'framer-motion';
import Video from 'assets/resources/m.mp4';

const Main = () => {
  const video = useRef<HTMLVideoElement | null>(null);
  const wave = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: '200px',
    },
    in: {
      opacity: 1,
      y: 0,
      //scale: 1
    },
    out: {
      opacity: 0,
      y: '200px',
      transition: {
        //delayChildren: 0.2,
      },
    },
  };
  const pageTransition: Transition = {
    type: 'tween',
    delay: 0.4,
    duration: 1.4,
  };

  const videoPlay = useCallback(() => {
    if (isPlaying) {
      return;
    }
    if (!video.current) {
      return;
    }

    let play = video.current.play();

    if (play !== undefined) {
      play
        .then((_) => {
          setIsPlaying(true);

          video.current?.addEventListener('timeupdate', (e: Event) => {
            const target = e.target as HTMLVideoElement;

            if (!wave.current) {
              return;
            }

            const currentTime = target.currentTime;
            if (target.ended) {
              setIsPlaying(false);
            }
            if (currentTime > 2) {
              return;
            }
            wave.current.style.transform =
              'translateY(-' + currentTime * 50 + 'px)';
            //console.log(target.currentTime);
          });
        })
        .catch((error) => {});
    }
  }, [isPlaying]);

  useEffect(() => {
    videoPlay();
  }, [videoPlay]);

  return (
    <motion.div
      className="main"
      style={{ position: 'absolute' }}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <article>
        {/* <img src={require('assets/resources/me.png').default} /> */}
        <div className="video">
          <video muted ref={video}>
            <source src={Video} type="video/mp4" />
          </video>
        </div>
        <span className="liner"></span>
        <div className="linerRotate"></div>
      </article>

      <div className="wave" ref={wave}>
        <h2>© 2020 silence337</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(252,103,3,0.7"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(255,255,255,0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(255,255,255,0.3)"
            />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#f4d8c0" />
          </g>
        </svg>
      </div>
    </motion.div>
  );
};
export default Main;
