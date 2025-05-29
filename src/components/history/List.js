import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const HistoryList = ({ historyData, listRef, currentRef, historyNum }) => {
  return (
    <ul ref={listRef}>
      {historyData.map((data, idx) => {
        const active = idx === historyNum;
        const { year, type, work } = data;
        return (
          <li
            className={`${active ? 'active' : ''}`}
            ref={active ? currentRef : null}
          >
            <strong>{year}</strong>
            <span className="type">{type}</span>
            <div className="textArea">
              {work.map((cont, i) => (
                <dl key={i}>
                  <dt>{cont.subj}</dt>
                  <dd>
                    <ul>
                      {cont.text.map((list, i) => (
                        <li key={i}>{list}</li>
                      ))}
                    </ul>
                  </dd>
                </dl>
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
export default HistoryList;
