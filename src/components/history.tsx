interface HistoryItem {
  year: string;
  type: string;
  work: {
    subj: string;
    text: string[];
  }[];
}

interface HistoryListProps {
  data: HistoryItem[];
  list: React.RefObject<HTMLUListElement>;
  current: React.RefObject<HTMLLIElement>;
  number: number;
}

const HistoryList: React.FC<HistoryListProps> = ({
  data = [],
  list,
  current,
  number,
}) => {
  return (
    <ul ref={list}>
      {data?.map((item, idx) => {
        const active = idx === number;
        const { year, type, work } = item;
        return (
          <li
            className={`${active ? 'active' : ''}`}
            ref={active ? current : null}
            key={idx}
          >
            <strong>{year}</strong>
            <span className="type">{type}</span>
            <div className="textArea">
              {work?.map((cont, i) => (
                <dl key={i}>
                  <dt>{cont.subj}</dt>
                  <dd>
                    <ul>
                      {cont.text.map((textLine, i) => (
                        <li key={i}>{textLine}</li>
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
