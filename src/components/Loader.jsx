import React from 'react';
import { Image, Col, Typography } from 'antd';

import LoadingImg from '../assets/carat.gif';


const { Title } = Typography;



const Loader = () => {
    return (
        <Col span={24}>
            <Image src={LoadingImg} justify="center" />
            <Title>
                Now Loading...
            </Title>

        </Col>
    )
}

export default Loader;
