import classNames from 'classnames'
import styles from './index.module.scss'

export default function TimeLine() {
  // ------------------------------------------------ 根据 type 设置对应颜色
  const o = {
    'error': '#F56C6C',
    'info': '#909399',
    'warning': '#E6A23C',
    'success': '#67C23A',
    'primary': '#409EFF',
  }
  const colorBlock = (type: keyof typeof o) => {
    return o[type]
  }

  type TimeLineItemType = {
    text: string
    timestamp: string
    type: keyof typeof o
  }
  const activities: TimeLineItemType[] = [
    {
      text: '开始',
      timestamp: '2018-04-1',
      type: 'primary'
    },
    {
      text: '进行中',
      timestamp: '2018-04-2',
      type: 'success'
    },
    {
      text: '结束1',
      timestamp: '2018-04-3',
      type: 'error'
    },
    {
      text: '结束2',
      timestamp: '2018-04-3',
      type: 'info'
    },
    {
      text: '结束3',
      timestamp: '2018-04-3',
      type: 'warning'
    },
    {
      text: '结束4',
      timestamp: '2018-04-3',
      type: 'error'
    },
    {
      text: '结束5',
      timestamp: '2018-04-3',
      type: 'primary'
    },
    {
      text: '结束6',
      timestamp: '2018-04-3',
      type: 'info'
    },
    {
      text: '结束7',
      timestamp: '2018-04-3',
      type: 'error'
    },
    {
      text: '结束8',
      timestamp: '2018-04-3',
      type: 'info'
    },

  ]

  const rowCount = 4  // 一行数量
  const timeLineItemWidth = 100 / rowCount + '%' // 设置每一个的宽度
  const getTimeLineRowNum = Math.ceil(activities.length / rowCount) // 页面展示行数

  // -------------------------------------------- 是否是相反方向的一行
  const isReverseRow = (rowIndex: number) => {
    return rowIndex % 2
  }

  // --------------------------------------------- 计算半圆的颜色
  const connectRound = (rowIndex: number, index: number, item: TimeLineItemType) => {
    if (index !== rowCount - 1) return {}
    if (isReverseRow(rowIndex)) {
      return {
        borderLeftColor: colorBlock(item.type),
        borderBottomColor: colorBlock(item.type),
      }
    } else {
      return {
        borderTopColor: colorBlock(item.type),
        borderRightColor: colorBlock(item.type),
      }
    }
  }

  // --------------------------------------------- 是否是最后一个
  const isEnd = (rowIndex: number, index: number) => {
    return activities.length === (rowIndex * rowCount + index + 1)
  }
  return (
    <div className={styles.root}>
      <div className="lhc-timeLine">
        {
          Array.from({ length: getTimeLineRowNum }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              style={{
                direction: rowIndex % 2 ? 'rtl' : undefined,
              }}
              className="timeLine-row">
              {
                activities.slice(rowIndex * rowCount, rowIndex * rowCount + rowCount).map((item, index) => {
                  return (
                    <div
                      style={{
                        width: timeLineItemWidth,
                      }}
                      className="lhc-timeLine-item">
                      <div className="item-content">
                        <div className="item-text">{item.text}</div>
                        <div
                          className="color-block"
                          style={{
                            backgroundColor: colorBlock(item.type),
                          }}>

                          {/* // 半圆部分  */}
                          {
                            index === rowCount - 1 && <div
                              style={connectRound(rowIndex, index, item)}
                              className={classNames('round', isReverseRow(rowIndex) ? 'left-round' : 'right-round')}
                            ></div>
                          }

                          {/* // 白色箭头部分 */}
                          {
                            !isEnd(rowIndex, index) && <div
                              style={{ transform: isReverseRow(rowIndex) ? 'translateX(8px)' : '' }}
                              className="arrow">
                              <div className="arrow-left"></div>
                              <div
                                style={{ transform: isReverseRow(rowIndex) ? 'rotate(180deg)' : '' }}
                                className="arrow-right"></div>
                            </div>
                          }


                          {/* <!--结束箭头--> */}
                          {
                            isEnd(rowIndex, index) && <div
                              className={classNames('end-arrow', isReverseRow(rowIndex) ? 'left-end-arrow' : 'right-end-arrow')}
                              style={{
                                borderColor: `transparent transparent transparent ${o[item.type]}`,
                              }}
                            ></div>
                          }
                        </div>
                      </div>
                      <span className="timeLine-item-time">{item.timestamp}</span>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}
