import styled from "styled-components";
import BarChart from "../components/charts/bar";
import { useEffect } from "react";
import apiService from "../services/apiService";

const Wrapper = styled.div``;

function Dashboard() {
  useEffect(() => {
    // init test
    apiService.get('/weather').then((res) => {
      console.log('#### res: ', res);
    });
  }, []);
  return (
    <Wrapper>
      Dashboard
      <BarChart />
    </Wrapper>
  )
}

export default Dashboard;