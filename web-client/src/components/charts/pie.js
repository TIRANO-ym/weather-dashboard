import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  PolarAreaController,
  RadialLinearScale,
  ArcElement,
  TimeScale,
  Title,
  Tooltip,
  Legend
} from "chart.js";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const PieChart = () => {
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  let widthRatio, heightRatio;    // 초기 사이즈 비율

  const chartRef = useRef(null);
  let chartInstance = null;
  let chartData = null;

  useEffect(() => {
    // 차트 데이터 설정
    setData();

    // 컴포넌트가 처음 렌더링될 때 차트 초기화
    initializeChart();

    // wrapper 전체 비율 계산
    widthRatio = wrapperRef.current.clientWidth / window.innerWidth;
    heightRatio = wrapperRef.current.clientHeight / window.innerHeight;

    // 윈도우 창크기 변경 이벤트 리스너
    window.addEventListener('resize', resizeCanvas, false);

    // 컴포넌트가 unmount될 때 차트 파괴
    return () => {
      destroyChart();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const setData = () => {
    chartData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [5, 7, 4, 8, 5, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.3)',
            'rgba(75, 192, 192, 0.3)',
            'rgba(255, 205, 86, 0.3)',
            'rgba(201, 203, 207, 0.3)',
            'rgba(54, 162, 235, 0.3)',
            'rgba(200, 162, 235, 0.3)'
          ]
        }
      ]
    };
  };

  const createChart = () => {
    const ctx = chartRef.current.getContext("2d");
    Chart.register(
      PolarAreaController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      RadialLinearScale,
      ArcElement,
      TimeScale,
      Title,
      Tooltip,
      Legend
    );
    chartInstance = new Chart(ctx, {
      type: 'polarArea',
      data: chartData,
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          }
          // title: {
          //   display: true,
          //   text: 'Chart.js Polar Area Chart'
          // }
        }
      },
    });
  };

  const destroyChart = () => {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  };

  const initializeChart = () => {
    destroyChart(); // 이전 차트 파괴
    createChart(); // 새로운 차트 생성
  };

  const resizeCanvas = () => {
    setWidth(window.innerWidth * widthRatio);
    setHeight(window.innerHeight * heightRatio);
  };

  return <Wrapper ref={wrapperRef} style={{width: width, height: height}}><canvas ref={chartRef} /></Wrapper>;
};

export default PieChart;