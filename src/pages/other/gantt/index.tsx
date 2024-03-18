import { useEffect, useState } from 'react'
import styles from './index.module.scss'

export default function Gantt() {
  const [lastDaysCacha, setLastDaysCacha] = useState<LastDaysType[]>([])

  // 回显数据
  const [ projectList,  ] = useState([
    {
      projectName: '项目1',
      projectManager: '张三',
      projectTime: [
        {
          startTime: 1711065600000,
          endTime: 1711324800000
        }
      ],
    },
    {
      projectName: '项目2',
      projectManager: '李四',
      projectTime: [
        {
          startTime: 1711584000000,
          endTime: 1711756800000 
        }
      ],
    },
    {
      projectName: '项目3',
      projectManager: '王五',
      projectTime: [
        {
          startTime: 1712016000000,
          endTime: 1712188800000 
        }
      ],
    }
  ])

  type ComputedTime = {
    startTime: number
    endTime: number
  }
  type DaysType = {
    timeStamp: number
    day: number | string
    week: string
  }
  type LastDaysType = {
    yearMonth: string
    days: DaysType[]
  }

  let CacheDaysList: DaysType[] = []
  // 计算色块位置
  const computedWork = (projectTime: ComputedTime, projectIndex: number) => {
    if(CacheDaysList && CacheDaysList.length) {
      return computedFunc(projectTime, projectIndex)
    }
    return computedFunc(projectTime, projectIndex)
  }

  // 逻辑复用
  const computedFunc = (projectTime: ComputedTime, projectIndex: number) => {
    const COLORS = [ "#FF6D60", "#F7D060", "#98D8AA", "#F3E99F", "#3C486B", "#F9D949", "#F45050"]
    CacheDaysList = lastDaysCacha.flatMap((item: LastDaysType) => item.days)
    const { startTime, endTime } = projectTime
    const startIndex = CacheDaysList.findIndex((day: DaysType) => day.timeStamp >= startTime) - 1
    const endIndex = CacheDaysList.findIndex((day: DaysType) => endTime <= day.timeStamp)
    return {
      'Position': 'absolute',
      'left': startIndex * 48 + 'px',
      'zIndex': 9,
      'width': (endIndex - startIndex) * 48 + 'px',
      'backgroundColor': COLORS[projectIndex],
      'border': 'none',
    }
  }

  // 计算引导文案元素宽高
  useEffect(() => {
    const dataList = document.querySelector('.data-list')
    const guideDesc = document.querySelector('.guide .desc') as HTMLElement
    guideDesc!.style.height = dataList?.clientHeight + 'px'
    guideDesc!.style.width = dataList?.clientHeight + 'px'
  }, [])


  // 获取最近 30天 日期信息
  const lastDay = () => {
    if(lastDaysCacha && lastDaysCacha.length) {
      return lastDaysCacha
    }
    const weeks = ['日', '一', '二', '三', '四', '五', '六']
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    const currentDate = new Date().getDate() - 1 // - 1 是为了让当前日期也在表格中
    // 初始值
    const lastDays: LastDaysType[] = [{ yearMonth: currentYear + '年' + currentMonth + '月', days: [] }]
    // 当前月份共天
    const currentMonthCountDay = new Date(currentYear, currentMonth, 0).getDate()
    // 当前月份剩余天数
    const currentMonthSurplusDay = currentMonthCountDay - currentDate
    // 如果剩余天数小于30, 那么就将下个月也加进去
    if(currentMonthSurplusDay < 30) {
      const newDate = new Date(currentYear, currentMonth)
      const [ newYear, newMonth ] = [newDate.getFullYear(), newDate.getMonth() + 1]
      lastDays.push({
        yearMonth: newYear + '年' + newMonth + '月',
        days: []
      })
    }

    lastDays.forEach((item: LastDaysType, index: number) => {
      if(currentMonthSurplusDay < 30) {
        if(index === 0) {
          for (let i = 0; i < currentMonthSurplusDay; i++) {
            const dayI = new Date(new Date().getTime()+i*(24*60*60*1000)).getDate()
            const weekI = new Date(new Date().getTime()+i*(24*60*60*1000)).getDay()
            const yearMonth = item.yearMonth.replace('年', '-').replace('月', '')
            item.days.push({
              day: dayI < 10 ? '0' + dayI : dayI,
              week: weeks[weekI],
              timeStamp: new Date(yearMonth + '-' + dayI).getTime()
            })
          }
        } else {
          for (let i = 0; i < 30 - currentMonthSurplusDay; i++) {
            const newDate = new Date(currentYear, currentMonth, i + 1)
            const [ newDay, newWeek ] = [newDate.getDate(), newDate.getDay()]
            const yearMonth = item.yearMonth.replace('年', '-').replace('月', '')
            item.days.push({
              day: newDay < 10 ? '0' + newDay : newDay,
              week: weeks[newWeek],
              timeStamp: new Date(yearMonth + '-' + newDay).getTime()
            })
          }
        }
      }
    })

    setLastDaysCacha(lastDays)
    return lastDays
  }
  return (
    <div className={styles.root}>
      <div className="inner">
        <div className="guide">
          <div className="desc">
            <span className="date">日期</span>
            <span className="item">项目</span>
          </div>
          <div className="item-name-list">
            {
              projectList.map((item, index) => {
                return (
                  <div className="guide-name" key={index}>
                    {item.projectName}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="content">
          <div className="data-list">
            {
              lastDay().map((item: LastDaysType) => {
                return (
                  <div className="month-item" key={item.yearMonth}>
                    <div className="month">{item.yearMonth}</div>
                    <div className="day-box">
                      {
                        item.days.map((day: DaysType, dayINdex: number) => {
                          return (
                            <div className="day-item" key={dayINdex}>
                              <div className="day">{day.day}</div>
                              <div className="week">{day.week}</div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="schedule-box">
            {
              projectList.map((item, index) => {
                return (
                  <div className="date-box" key={index}>
                    {
                      Array.from(new Array(30), (_, dateIndex) => {
                        return (
                          <div 
                            key={dateIndex}
                            style={{width: 200}}
                            className={
                              ["date-item"].join(' ')
                            }
                          ></div>
                        )
                      })
                    }
                    {
                      item.projectTime.map((work, workIndex) => {
                        return (
                          <div
                            key={workIndex}
                            style={computedWork(work, index)}
                            className="data-item-work">{item.projectManager}</div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
            
          </div>
        </div>
      </div>
    </div>
  )
}
