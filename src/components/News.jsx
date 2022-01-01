import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import dayjs from 'dayjs';

import relativeTime from 'dayjs/plugin/relativeTime';
import { useGetCoinNewsQuery } from '../services/coinNewsApi';
import { useGetCoinsQuery } from '../services/coinApi';
import Loader from './Loader';



const { Text, Title } = Typography;
const { Option } = Select;

const defaultImage = 'https://images.unsplash.com/photo-1621504450181-5d356f61d307?auto=format&fit=crop&w=687&q=80'

let windowSizeMobile = window.matchMedia('(max-width: 576px)')

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
    const { data: coinNews } = useGetCoinNewsQuery({ newsCategory, count: simplified ? 6 : 18 });
    const { data } = useGetCoinsQuery(100);

    // console.log(coinNews);

    if(!coinNews?.value) return <Loader />;

    return (
        <Row gutter={[ 24, 24 ]}>
            {!simplified && (
                
        <Col span={24}>
            <Title level={2}> News </Title>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Coin"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurency">All Coins</Option>
            {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
          </Select>
        </Col>
      )}
            {coinNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i} >
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer' >
                            <div className='news-image-container'>
                            <Title className="news-title" level={4}>{news.name.length > 50 && windowSizeMobile ?
                             `${news.name.substring(0,50)}...` : news.name}</Title>
                            <img style={{ maxWidth:'100px', maxHeight: '100px' }}
                            src={news?.image?.thumbnail?.contentUrl || defaultImage } alt={`${news.name}`} />
                            </div>
                            <p>{news.description.length > 100 ? `${news.description.substring(0, 100)}...` : news.description}</p>
                            <div className="provider-container">
                                <div>
                                <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || defaultImage} alt={news.provider[0].name} />
                                <Text className="provider-name">{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{dayjs.extend(relativeTime)} {dayjs(news.datePublished).fromNow(true)}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
                ))}
        </Row>
    )
}

export default News
