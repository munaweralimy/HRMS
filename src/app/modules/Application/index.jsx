import React, { useEffect } from 'react';
import { Row, Typography, Col, Card } from "antd";
import HeadingChip from '../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../configs/constantData';
import Dashboard from './Dashboard';
import PendingRequests from './PendingRequests';
import StaffPerformance from './StaffPerformance';
import RequestList from '../HRMS/Requests/RequestList';
import moment from 'moment';
import { getPendingIssues, getPolicyList, getTimesheetData, getCalenderData } from './ducks/actions';

const { Title } = Typography;

export default (props) => {

    const dispatch = useDispatch();
    const i18n = useTranslate();
    const { t } = i18n;
    const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;
    //const id = 'HR-EMP-00006'
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
    const pendingData = useSelector(state => state.global.pendingData);
    const policyData = useSelector(state => state.global.policyData);
    const timesheetData = useSelector(state => state.global.timesheetData);
    //const calenderData = useSelector(state => state.global.calenderData);
    
    useEffect(() => {
        dispatch(getPendingIssues());
        dispatch(getPolicyList());
        dispatch(getTimesheetData());
        //dispatch(getCalenderData());
    }, [])

    return (
       <Row gutter={[20, 50]}>
           <Col span={24}>
               <Dashboard policyData={policyData} timesheetData={timesheetData} />
           </Col>
           <Col span={24}>
               <RequestList />
           </Col>
           <Col span={24}>
               <StaffPerformance />
           </Col>
           <Col span={24}>
                <PendingRequests pendingData={pendingData} />
            </Col>
       </Row>
    )
}