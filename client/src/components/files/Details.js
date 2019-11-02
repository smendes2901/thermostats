import React from "react";
import { withRouter } from "react-router-dom";
import { Layout, Button } from "antd";
import LineChart from "../graph/LineChart_zoom";
import "./Details.css";

const { Content } = Layout;

const Details = props => {
  const handleBack = () => {
    props.history.push("/");
  };
  return (
    <div>
      <Content>
        <div className="back">
          <Button type="ghost" onClick={handleBack}>
            Back
          </Button>
        </div>
        <div className="chart-boundaries">
          <LineChart fileName={props.match.params.slug} />
        </div>
      </Content>
    </div>
  );
};

export default withRouter(Details);
