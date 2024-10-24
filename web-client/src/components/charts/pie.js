import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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

const PieChart = ({data, options}) => {
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
    const seriesData = [
      {
        name: 'data1',
        y: 5
      },
      {
        name: 'data2',
        sliced: true,
        selected: true,
        y: 2
      },
      {
        name: 'data3',
        y: 1
      },
      {
        name: 'data4',
        y: 3
      }
    ];
    setChartOptions({
      chart: {
        type: 'pie'
      },
      title: {
        text: null
      },
      tooltip: {
        valueSuffix: '%'
      },
      credits: {
        enabled: false
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          }
        },
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
          data: seriesData,
          colors: PALETTE
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
      console.log(e.point.name, e.point.y);
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

export default PieChart;