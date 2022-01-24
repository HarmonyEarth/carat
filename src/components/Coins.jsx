import React, { useState, useEffect } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input, Typography } from "antd";

import { useGetCoinsQuery } from "../services/coinApi";
import Loader from "./Loader";

const { Title } = Typography;

const Coins = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: coinsList, isFetching } = useGetCoinsQuery(count);
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const filteredData = coinsList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm)
    );

    setCoins(filteredData);
  }, [coinsList, searchTerm]);

  console.log("mua", coins);
  if (isFetching) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Title level={2} style={{ textAlign: "center" }}>
            {" "}
            Coins{" "}
          </Title>
          <Input
            placeholder="Search Coins"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {coins?.map((coin) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={coin.uuid}>
            <Link to={`/coin/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={coin.iconUrl}
                    alt={`${coin.name} Logo`}
                  />
                }
                hoverable
              >
                <p style={{ fontWeight: "500" }}>
                  {" "}
                  Price: {millify(coin.price)}{" "}
                </p>
                <p style={{ fontWeight: "500" }}>
                  {" "}
                  Market Cap: {millify(coin.marketCap)}{" "}
                </p>
                <p style={{ fontWeight: "500" }}>
                  {" "}
                  Daily Change: {millify(coin.change)}%{" "}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Coins;
