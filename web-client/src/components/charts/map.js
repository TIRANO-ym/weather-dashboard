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
import HighchartsMap from "highcharts/modules/map";
import topology from "./kr-topo.json";

HighchartsMap(Highcharts);

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  // overflow: hidden;
  // .highcharts-container {
  //   position: absolute !important;
  //   height: 50% !important;
  // }
`;

const KoreaMap = ({data}) => {
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

  const setData = async () => {
    // const topology = await fetch('https://code.highcharts.com/mapdata/countries/kr/kr-all.topo.json')
    //   .then(response => response.json());
    console.log(topology);
    setChartOptions({
      chart: {
        map: topology
      },
      title: {
        text: 'test map chart'
      },
      credits: {
        enabled: false
      },
      accessibility: {
        description: 'Map where city locations have been defined using ' +
          'latitude/longitude.'
      },
      mapNavigation: {
        enabled: true
      },
      tooltip: {
        headerFormat: '',
        pointFormat: '<b>{point.name}</b><br>Lat: {point.lat}, Lon: ' +
          '{point.lon}'
      },
      yAxis: {
        title: {
          enabled: false
        }
      },

      series: [{
        // Use the gb-all map with no data as a basemap
        name: 'Great Britain',
        borderColor: '#A0A0A0',
        nullColor: 'rgba(200, 200, 200, 0.3)',
        showInLegend: false
      }, {
        name: 'Separators',
        type: 'mapline',
        nullColor: '#707070',
        showInLegend: false,
        enableMouseTracking: false,
        accessibility: {
          enabled: false
        }
      }, {
        // Specify points using lat/lon
        type: 'mappoint',
        name: 'Cities',
        accessibility: {
          point: {
            valueDescriptionFormat: '{xDescription}. Lat: ' +
              '{point.lat:.2f}, lon: {point.lon:.2f}.'
          }
        },
        color: PALETTE[0],
        data: [
          // {
          //   name: 'London',
          //   lat: 51.507222,
          //   lon: -0.1275
          // }, {
          //   name: 'Birmingham',
          //   lat: 52.483056,
          //   lon: -1.893611
          // }, {
          //   name: 'Leeds',
          //   lat: 53.799722,
          //   lon: -1.549167
          // }, {
          //   name: 'Glasgow',
          //   lat: 55.858,
          //   lon: -4.259
          // }, {
          //   name: 'Sheffield',
          //   lat: 53.383611,
          //   lon: -1.466944
          // }, {
          //   name: 'Liverpool',
          //   lat: 53.4,
          //   lon: -3
          // }, {
          //   name: 'Bristol',
          //   lat: 51.45,
          //   lon: -2.583333
          // }, {
          //   name: 'Belfast',
          //   lat: 54.597,
          //   lon: -5.93
          // }, {
          //   name: 'Lerwick',
          //   lat: 60.155,
          //   lon: -1.145,
          //   dataLabels: {
          //     align: 'left',
          //     x: 5,
          //     verticalAlign: 'middle'
          //   }
          // }
        ]
      }]
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
      constructorType={"mapChart"}
    />
  </Wrapper>;
};

export default KoreaMap;