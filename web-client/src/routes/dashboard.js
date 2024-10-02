import styled from "styled-components";
import BarChart from "../components/charts/bar";

const Wrapper = styled.div``;

function Dashboard() {
  return (
    <Wrapper>
      Dashboard
      <BarChart />
    </Wrapper>
  )
}

export default Dashboard;