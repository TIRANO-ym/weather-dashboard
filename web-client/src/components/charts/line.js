import React, { useEffect, useRef, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import 'chart.js/auto';
import styled from 'styled-components';
import {
  Chart,
  LineController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const LineChart = () => {
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
          data: [5, 7, 4, 8, 5, 3, 2],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          pointRadius: 5, // 포인트 크기
          pointBackgroundColor: "rgba(255, 99, 132, 1)", // 포인트 배경색
          pointBorderColor: "rgba(255, 255, 255, 1)", // 포인트 테두리 색
          pointHoverRadius: 7, // 호버 시 포인트 크기
          pointHoverBackgroundColor: "rgba(255, 99, 132, 1)", // 호버 시 포인트 배경색
          pointHoverBorderColor: "rgba(255, 255, 255, 1)", // 호버 시 포인트 테두리 색
          fill: 'origin', // 라인 그래프에서 영역 채우기
          tension: 0.3
        },
        {
          label: 'Dataset 2',
          data: [3, 9, 6, 2, 3, 8, 1],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 3
        }
      ]
    };
  };

  const createChart = () => {
    const ctx = chartRef.current.getContext("2d");
    Chart.register(
      LineController,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      TimeScale,
      Title,
      Tooltip,
      Legend,
      Filler
    );
    chartInstance = new Chart(ctx, {
      type: 'line',
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
        // plugins: {
        //   legend: {
        //     position: 'top',
        //   },
        //   filler: {
        //     propagate: true
        //   }
        //   // title: {
        //   //   display: true,
        //   //   text: 'Chart.js Polar Area Chart'
        //   // }
        // }
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

export default LineChart;