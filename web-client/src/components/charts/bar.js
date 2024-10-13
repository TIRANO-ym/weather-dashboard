import React, { Fragment, useEffect, useRef, useState } from 'react';
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

  useEffect(() => {
    // wrapper 전체 비율 계산
    widthRatio = wrapperRef.current.clientWidth / window.innerWidth;
    heightRatio = wrapperRef.current.clientHeight / window.innerHeight;

    // 윈도우 창크기 변경 이벤트 리스너
    window.addEventListener('resize', resizeCanvas, false);

    // 차트 데이터 설정
    setData();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  // useEffect(() => {
  //   // todo: 데이터 재설정
  // }, data);

  const setData = () => {
    const seriesData = [
      ['13:00', 40000],
      ['14:00', 50000],
      ['15:00', 60000],
      ['16:00', 70000],
      ['17:00', 80000],
      ['18:00', 90000]
    ];
    setChartOptions({
      chart: {
        type: 'column',
        // FIXME: 창 조절 시 높이 반영 방안.. 100% 지정시 초과됨, wrapper를 따르지 않음
        // width: `${window.innerWidth * widthRatio}px`,
        height: `${window.innerHeight * heightRatio}px`,
        events: {
          click: onClickEvent,
          redraw: true
        }
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
      series: [{ name: "data1", data: seriesData }]
    });
  };

  const resizeCanvas = () => {
    setWidth(window.innerWidth * widthRatio);
    setHeight(window.innerHeight * heightRatio);
    // setData();
  };

  const onClickEvent = (e) => {
    if (e) {
      console.log(e.point.name, e.point.y);
    }
  };

  return <Wrapper ref={wrapperRef} style={{width: width, height: height}}>
    <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
  </Wrapper>;
};

export default BarChart;