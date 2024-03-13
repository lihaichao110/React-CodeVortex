import styles from './index.module.scss'
import Icon from "@/components/icon";
import GraphPin from '../graph-pin';
import GraphTrend from '../graph-trend';
import GraphChina from '../graph-china';
export default function Graph() {
  return (
    <div className={styles.root}>
      <div className="graph">
        <div className="graph-item">
          <div className="title">
            <Icon style={{marginRight: 4, fontSize: 18}} iconName='icon-fenbu'></Icon>
            <span className="text">分布</span>
          </div>
          <div className="graph-pin">
            <GraphPin></GraphPin>
          </div>
        </div>
        <div className="graph-item">
          <div className="title">
            <Icon style={{marginRight: 4, fontSize: 18}} iconName='icon-chengshi'></Icon>
            <span className="text">城市</span>
          </div>
          <div className="graph-trend">
            <GraphChina></GraphChina>
          </div>
        </div>
        <div className="graph-item">
          <div className="title">
            <Icon style={{marginRight: 4, fontSize: 18}} iconName='icon-qushi'></Icon>
            <span className="text">趋势</span>
          </div>
          <div className="graph-trend">
            <GraphTrend></GraphTrend>
          </div>
        </div>
      </div>
    </div>
  )
}
