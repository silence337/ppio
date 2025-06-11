import { motion } from 'framer-motion';

interface PortfolioItem {
  id: number;
  title: string;
  thum: string;
  year: string;
  description: string[];
  tools: string;
  link: string;
  copy: string;
}

interface WorkListProps {
  data: PortfolioItem[];
  ul: React.RefObject<HTMLUListElement>;
  current: React.RefObject<HTMLLIElement>;
  activeNum: number;
  obj: {
    thumX: any; // or MotionValue<number>
    thumY: any;
    tX: any;
    tY: any;
  };
}

const WorkList: React.FC<WorkListProps> = ({ 
  data = [], 
  ul, 
  current, 
  activeNum, 
  obj 
}) => {
  const { thumX, thumY, tX, tY } = obj;

  const url = (e: string) => {
    if (e === '') {
      return alert('오픈 준비중입니다');
    }
    window.open(e);
  };
  

  return (
    <ul ref={ul}>
      {data?.map((site, idx) => {
        const active = idx === activeNum;
        const { link, thum, year, title, description, tools, copy, id } = site;
        return (
          <li
            key={id}
            className={`${active ? 'active' : ''}`}
            ref={active ? current : null}
          >
            <a href={undefined}
              onClick={() => url(link)}
              rel="noopener noreferrer"
              style={{ perspective: 400 }}
            >
              <figure>
                <motion.div
                  style={active ? { translateX: thumX, translateY: thumY } : {}}
                >
                  <img src={`/data/${thum}.jpg`} alt="" />
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
                    {description?.map((text, i) => (
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
