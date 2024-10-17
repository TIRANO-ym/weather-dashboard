import styled from "styled-components";
import BarChart from "../components/charts/bar";
// import { useEffect } from "react";
// import apiService from "../services/apiService";
import PieChart from "../components/charts/pie";
import LineChart from "../components/charts/line";
import Grid from "../components/charts/grid";
import GaugeChart from "../components/charts/gauge";
import KoreaMap from "../components/charts/map";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 35% 65%;
`;

const LeftBox = styled.div`
  // background-color: green;
  height: 100%;
  display: grid;
  grid-template-rows: 60% 20% 20%;
  padding: 0 10px;
`;
const LeftInfo1 = styled.div`
  border: 2px solid red;
`;
const LeftInfo2 = styled.div`
  border: 2px solid red;
`;
const LeftInfo3 = styled.div`
  border: 2px solid red;
`;

const RightBox = styled.div`
  // background-color: blue;
  height: 100%;
  display: grid;
  grid-template-rows: 20% 35% 45%;
  padding: 0 10px;
`;

const RightInfo1 = styled.div`
  border: 2px solid red;
`;
const RightInfo2 = styled.div`
  border: 2px solid red;
`;
const RightInfo3 = styled.div`
  border: 2px solid red;
`;

function Dashboard() {
  // useEffect(() => {
  //   // init test
  //   apiService.get('/weather').then((res) => {
  //     console.log('#### res: ', res);
  //   });
  // }, []);

  const onGridRowClick = (e) => {
    console.log(e.data);
  };

  return (
    <Wrapper>
      <LeftBox>
        <LeftInfo1>
          <KoreaMap/>
        </LeftInfo1>
        <LeftInfo2>
          <PieChart/>
        </LeftInfo2>
        <LeftInfo3>
          <Grid colDefs={[]} rowData={[]} onRowClick={onGridRowClick} pagination={true}/>
        </LeftInfo3>
      </LeftBox>
      <RightBox>
        <RightInfo1>
          <GaugeChart/>
        </RightInfo1>
        <RightInfo2>
          <BarChart />
        </RightInfo2>
        <RightInfo3>
          <LineChart/>
        </RightInfo3>
      </RightBox>
    </Wrapper>
  )
}

export default Dashboard;