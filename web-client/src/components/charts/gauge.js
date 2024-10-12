import { useEffect, useRef, useState } from "react";
import GaugeChart from "react-gauge-chart"
import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  svg {
    height: 100%;
  }
`;

export default function Gauge() {
  // FIXME: 사이즈 문제
  const wrapperRef = useRef(null);
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  let widthRatio, heightRatio;    // 초기 사이즈 비율
  const [percent, setPercent] = useState(null);

  useEffect(() => {
    // wrapper 전체 비율 계산
    widthRatio = wrapperRef.current.clientWidth / window.innerWidth;
    heightRatio = wrapperRef.current.clientHeight / window.innerHeight;
    resizeCanvas();

    // 윈도우 창크기 변경 이벤트 리스너
    window.addEventListener('resize', resizeCanvas, false);

    setTimeout(() => {
      setData();
    }, 2000)

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const resizeCanvas = () => {
    setWidth(window.innerWidth * widthRatio);
    setHeight(window.innerHeight * heightRatio);
  };

  const setData = () => {
    setPercent(50);
  };

  return <Wrapper ref={wrapperRef} style={{width: width, height: height}}>
    {
      percent ? <GaugeChart
        id="gauge-chart1"
        nrOfLevels={4}
        cornerRadius={20}
        // animate={true}
        percent={50}
        needleColor="#345243"
        style={{width: width, height: height}}
      /> : null
    }
  </Wrapper>
}