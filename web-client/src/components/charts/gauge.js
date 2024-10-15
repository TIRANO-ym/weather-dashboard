import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  // overflow: hidden;
  // .highcharts-container {
  //   position: absolute !important;
  //   height: 50% !important;
  // }
`;

const GaugeChart = ({data}) => {
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
        type: 'gauge'
      },
      title: {
        text: null
      },
      tooltip: {
        enabled: false
      },
      credits: {
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
        }
      },
      pane: {
        startAngle: -90,
        endAngle: 89.9,
        background: null,
        center: ['50%', '75%'],
        size: '110%'
      },
      yAxis: {
        min: 0,
        max: 200,
        tickPixelInterval: 72,
        tickPosition: 'inside',
        tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
        tickLength: 20,
        tickWidth: 2,
        minorTickInterval: null,
        labels: {
          distance: 20,
          style: {
            fontSize: '14px'
          }
        },
        lineWidth: 0,
        plotBands: [{
          from: 0,
          to: 130,
          color: '#55BF3B', // green
          thickness: 20,
          borderRadius: '50%'
        }, {
          from: 150,
          to: 200,
          color: '#DF5353', // red
          thickness: 20,
          borderRadius: '50%'
        }, {
          from: 120,
          to: 160,
          color: '#DDDF0D', // yellow
          thickness: 20
        }]
      },
      series: [
        {
          name: 'Speed',
          data: [80],
          // tooltip: {
          //   valueSuffix: ' km/h'
          // },
          dataLabels: {
            format: '{y} km/h',
            borderWidth: 0,
            color: '#333333',
            style: {
              fontSize: '16px'
            }
          },
          dial: {
            radius: '80%',
            backgroundColor: 'gray',
            baseWidth: 12,
            baseLength: '0%',
            rearLength: '0%'
          },
          pivot: {
            backgroundColor: 'gray',
            radius: 6
          }
  
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
      console.log(e.point.series.name, e.point.y);
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

export default GaugeChart;