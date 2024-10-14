import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// import {
//   Chart,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   BarController,
//   TimeScale,
//   Title,
//   Tooltip,
//   Legend,
//   BarElement,
// } from "chart.js";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  // overflow: hidden;
  // .highcharts-container {
  //   position: absolute !important;
  //   height: 50% !important;
  // }
`;

const BarChart = ({data}) => {
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  let widthRatio, heightRatio;    // 초기 사이즈 비율

  const [chartOptions, setChartOptions] = useState(null);
  const PALETTE = [
    'rgba(255, 99, 132, 1)',    // 빨
    'rgba(54, 162, 235, 1)',    // 파
    'rgba(75, 192, 192, 1)',    // 초
    'rgba(255, 205, 86, 1)',    // 노
    'rgba(200, 162, 235, 1)',   // 보
    'rgba(201, 203, 207, 1)'    // 회
  ];

  useEffect(() => {
    // wrapper 전체 비율 계산
    widthRatio = wrapperRef.current.clientWidth / window.innerWidth;
    heightRatio = wrapperRef.current.clientHeight / window.innerHeight;

    // 윈도우 창크기 변경 이벤트 리스너
    window.addEventListener('resize', resizeCanvas, false);

    // 차트 설정
    setData();
    resizeCanvas();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // useEffect(() => {
  //   // todo: 데이터 재설정
  // }, data);

  const setData = () => {
    const seriesData1 = [
      ['13:00', 40000],
      ['14:00', 50000],
      ['15:00', 60000],
      ['16:00', 70000],
      ['17:00', 80000],
      ['18:00', 90000]
    ];
    const seriesData2 = [
      ['13:00', 60000],
      ['14:00', 20000],
      ['15:00', 30000],
      ['16:00', 80000],
      ['17:00', 40000],
      ['18:00', 90000]
    ];
    setChartOptions({
      chart: {
        type: 'column'
      },
      title: {
        text: 'test bar chart'
      },
      credits: {
        enabled: false
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        min: 0,
        title: {
          enabled: false
        }
      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          cursor: 'pointer',
          point: {
            events: {
              click: onClickEvent
            }
          }
          // stacking: 'normal',
          // dataLabels: {
          //   enabled: true,
          //   format: "<b>{point.y}</b>",
          // }
        }
      },
      series: [
        {
          name: "data1",
          data: seriesData1,
          color: PALETTE[0].replace(', 1)', ', 0.2)'),
          borderColor: PALETTE[0]
        },
        {
          name: "data2",
          data: seriesData2,
          color: PALETTE[1].replace(', 1)', ', 0.2)'),
          borderColor: PALETTE[1]
        }
      ]
    });
  };

  const resizeCanvas = () => {
    setWidth(window.innerWidth * widthRatio);
    setHeight(window.innerHeight * heightRatio);
  };

  const onClickEvent = (e) => {
    if (e) {
      console.log(e.point.series.name, e.point.name, e.point.y);
    }
  };

  return <Wrapper ref={wrapperRef}>
    <HighchartsReact
      highcharts={Highcharts}
      options={chartOptions}
      containerProps={{ style: { width: `${width}px`, height: `${height}px` } }}
    />
  </Wrapper>;
};

export default BarChart;