import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  BarController,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const BarChart = () => {
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
    const NUMBER_CFG = [5, 7, 4, 8, 5, 3, 2];

    chartData = {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'Dataset 1',
          data: NUMBER_CFG,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Dataset 2',
          data: NUMBER_CFG,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    };
  };

  const createChart = () => {
    const ctx = chartRef.current.getContext("2d");
    Chart.register(
      BarController,
      CategoryScale,
      LinearScale,
      PointElement,
      BarElement,
      TimeScale,
      Title,
      Tooltip,
      Legend
    );
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        maintainAspectRatio: false,
        // responsive: false,
        scales: {
          x: {
            display: true,
          },
          y: {
            beginAtZero: true,
            max: 10, // 최대값 설정
          },
        },
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

export default BarChart;