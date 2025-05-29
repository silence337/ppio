import React from 'react';
import { motion } from 'framer-motion';

const WorkList = ({ worksData, ulRef, currentRef, activeNum, obj }) => {
  const { thumX, thumY, tX, tY } = obj;

  const url = (e) => {
    if (e === '') {
      return alert('오픈 준비중입니다');
    }
    window.open(e);
  };

  return (
    <ul ref={ulRef}>
      {worksData.map((site, idx) => {
        const active = idx === activeNum;
        const { link, thum, year, title, description, tools, copy, id } = site;
        return (
          <li
            key={id}
            className={`${active ? 'active' : ''}`}
            ref={active ? currentRef : null}
          >
            <a
              href="#"
              onClick={() => url(link)}
              rel="noopener noreferrer"
              style={{ perspective: 400 }}
            >
              <figure>
                <motion.div
                  style={active ? { translateX: thumX, translateY: thumY } : {}}
                >
                  <img src={require(`assets/resources/${thum}`).default} />
                </motion.div>
              </figure>
              <motion.div
                style={active ? { translateX: tX, translateY: tY } : {}}
              >
                <dl>
                  <dt>
                    <i>{year}</i> {title}
                  </dt>
                  <dd className="text">
                    {description.map((text, i) => (
                      <span key={i}>{text}</span>
                    ))}
                  </dd>
                  <dd className="tools"> {tools} </dd>
                </dl>
              </motion.div>
            </a>
            <span className="copy">{copy}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default WorkList;
