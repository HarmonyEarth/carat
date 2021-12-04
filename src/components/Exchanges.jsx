import React from 'react';
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import HTMLReactParser from 'html-react-parser';

import { useGetExchangesQuery } from '../services/coinApi';
import Loader from './Loader';

const { Text, Title } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data, isFetching } = useGetExchangesQuery();
  const exchangesList = data?.data?.exchanges;

  if (isFetching) return <Loader />;

  return (
    <>
    <Title level={2} className='heading'> Exchanges </Title>
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24}>
            <Collapse>
              <Panel
                key={exchange.id}
                showArrow={false}
                header={(
                  <Row key={exchange.id}>
                    <Row span={6}>
                      <Text><strong>{exchange.rank}.</strong></Text>
                      <Avatar className="exchange-image" src={exchange.iconUrl} />
                      <Text style={{fontWeight:'700'}}>{exchange.name}&nbsp;</Text>
                    </Row>
                    <Row span={6} style={{fontWeight:'600'}}>
                        <Text>
                        &nbsp;24 Hour Trade Volume:&nbsp; 
                         <Text style={{ color:'limegreen' }} >
                         ${millify(exchange.volume)} &nbsp;
                         </Text> 
                         </Text>
                        
                    </Row>
                    <Row span={6} style={{fontWeight:'600'}}>
                        <Text>
                        &nbsp; Number of Markets:&nbsp;
                            <Text style={{ color:'blue' }} >
                                {millify(exchange.numberOfMarkets)} &nbsp;
                            </Text>
                        </Text>
                         </Row>
                    <Row span={6} style={{fontWeight:'600'}} >
                        <Text>
                        &nbsp; Market Share:&nbsp;
                            <Text style={{ color:'red'  }} >
                                {millify(exchange.marketShare)}% 
                            </Text>
                        </Text>

                        
                    </Row>
                  </Row>
                  )}
              >
                {HTMLReactParser(exchange.description || 'No Description Available')}
              </Panel>
            </Collapse>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
