import * as echarts from 'echarts/core';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useEffect } from 'react';

export default function GraphPin() {
  echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
  ]);
  useEffect(() => {
    const myChart = echarts.init(document.getElementById('graph-pin'))
    const option = {
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          data: [
            { value: 1048, name: '上海' },
            { value: 735, name: '北京' },
            { value: 580, name: '南京' },
            { value: 484, name: '深圳' },
            { value: 300, name: '广州' }
          ]
        }
      ]
    };
    option && myChart.setOption(option);

    window.addEventListener('resize', myChart.resize() as any);

    return () => {
      window.removeEventListener('resize', myChart.resize() as any)
    }
  }, [])

  return (
    <div style={{width: '100%', height: '100%', minHeight: 200}} id='graph-pin'></div>
  )
}
