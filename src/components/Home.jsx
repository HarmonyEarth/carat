import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";

import { useGetCoinsQuery } from "../services/coinApi";
import { Coins, News } from "../components";
import Loader from "./Loader";

const { Title } = Typography;

const Home = () => {
  const { data, isFetching } = useGetCoinsQuery(10);

  if (isFetching) return <Loader />;

  const globalStats = data?.data?.stats;

  return (
    <>
      <Title level={2} className="heading">
        {" "}
        Cryptocurrency Stats
      </Title>
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic title="Total Cryptocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24 Hour Volume"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          {" "}
          Top 10 Cryptocurrency Coins{" "}
        </Title>
        <Title level={3} className="show-more">
          {" "}
          <Link to="/coins">Show More</Link>
        </Title>
      </div>
      <Coins simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          {" "}
          Latest Crypto News{" "}
        </Title>
        <Title level={3} className="show-more">
          {" "}
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Home;
