import React, { useEffect } from 'react';
import { Row, Typography, Col, Card } from "antd";
import HeadingChip from '../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../configs/constantData';
import Dashboard from './Dashboard';
import PendingRequests from './PendingRequests';
import RequestList from '../HRMS/Requests/RequestList';

const { Title } = Typography;

export default (props) => {

    const dispatch = useDispatch();
    const i18n = useTranslate();
    const { t } = i18n;
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    return (
       <Row gutter={[20, 50]}>
           <Col span={24}>
               <Dashboard />
           </Col>
           <Col span={24}>
               <RequestList />
           </Col>
           <Col span={24}>
                <PendingRequests />
            </Col>
       </Row>
    )
}