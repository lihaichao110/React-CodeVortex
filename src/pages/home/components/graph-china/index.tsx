import * as echarts from "echarts/core";
import {
  ToolboxComponent,
  GridComponent,
  VisualMapComponent,
  GeoComponent
} from "echarts/components";
import chinaJson from './china.json'
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect } from "react";

echarts.use([
  VisualMapComponent,
  ToolboxComponent,
  GridComponent,
  CanvasRenderer,
  UniversalTransition,
  GeoComponent,
]);

export default function GraphTrend() {
  useEffect(() => {
    const mapData = [
      { name: "南海诸岛", value: 0 },
      { name: "北京", value: 3 },
      { name: "天津", value: 5 },
      { name: "上海", value: 6 },
      { name: "重庆", value: 15 },
      { name: "河北", value: 15 },
      { name: "河南", value: 15 },
      { name: "云南", value: 15 },
      { name: "辽宁", value: 7 },
      { name: "黑龙江", value: 5 },
      { name: "湖南", value: 68 },
      { name: "安徽", value: 34 },
      { name: "山东", value: 34 },
      { name: "新疆", value: 34 },
      { name: "江苏", value: 34 },
      { name: "浙江", value: 34 },
      { name: "江西", value: 34 },
      { name: "湖北", value: 34 },
      { name: "广西", value: 34 },
      { name: "甘肃", value: 34 },
      { name: "山西", value: 34 },
      { name: "内蒙古", value: 9 },
      { name: "陕西", value: 16 },
      { name: "吉林", value: 16 },
      { name: "福建", value: 16 },
      { name: "贵州", value: 16 },
      { name: "广东", value: 43 },
      { name: "青海", value: 43 },
      { name: "西藏", value: 43 },
      { name: "四川", value: 43 },
      { name: "宁夏", value: 43 },
      { name: "海南", value: 75 },
      { name: "台湾", value: 75 },
      { name: "香港", value: 75 },
      { name: "澳门", value: 75 },
    ];
    const myChart = echarts.init(document.getElementById("graph-china"));
    echarts.registerMap("china", chinaJson as any);
    const option = {
      color: ['#fff'],
      tooltip: {
        backgroundColor: '#5468ff',
        trigger: "item",
        textStyle: {
          // 提示框浮层的文本样式。
          color: '#fff',
          fontSize: 14,
        },
      },
      // 左侧导航
      visualMap: {
        show: true,
        left: 'left',
        top: 'bottom',
        textStyle: {
          fontSize: 8,
        },
        showLabel: 0,
        text: ["高", "低"],
        splitList: [
          // {start: 0, end: 0},
          { start: 1, end: 9 },
          { start: 10, end: 99 },
          { start: 100, end: 999 },
        ],
        inRange: {
          color: ['#D2DDFF', '#6E92FF'], //取值范围的颜色
        },
      },
      geo: {
        map: 'china',
        roam: true, //不开启缩放和平移
        zoom: 2, //视角缩放比例
        label: {
          color: '#fff',
          textBorderColor: 'inherit',
        },
        emphasis: {
          label: {
            color: '#fff'
          }
        },
        itemStyle: {
          emphasis: {
            areaColor: '#5468ff', //鼠标选择区域颜色
            shadowOffsetX: 0,
            shadowOffsetY: 0,
            shadowBlur: 20,
            borderWidth: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            label: {
              color: '#000'
            }
          },
        },
      },

      // 配置属性
      series: [
        {
          name:'人口',
          type: 'map',
          geoIndex: 0,
          data: mapData,
        }
      ],
    };
    option && myChart.setOption(option);
  }, []);
  return (
    <div
      style={{ width: "100%", height: "100%", minHeight: 200 }}
      id="graph-china"
    ></div>
  );
}
