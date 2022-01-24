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
import { getPolicyList, getTimesheetData } from './ducks/actions';
import Roles from '../../../routing/config/Roles';
import { allowed } from '../../../routing/config/utils';

const { Title } = Typography;

export default (props) => {

    const dispatch = useDispatch();
    const i18n = useTranslate();
    const { t } = i18n;
    
    //const id = 'HR-EMP-00006'
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
    //const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;
    const policyData = useSelector(state => state.global.policyData);
    const timesheetData = useSelector(state => state.global.timesheetData);
    
    
    useEffect(() => {
        dispatch(getPolicyList());
        dispatch(getTimesheetData());
        //dispatch(getCalenderData());
    }, [])

    return (
       <Row gutter={[20, 50]}>
           <Col span={24}>
               <Dashboard policyData={policyData} timesheetData={timesheetData} />
           </Col>
           {allowed([Roles.REQUESTS], 'read') ? <Col span={24}>
               <RequestList dashboard={true} />
           </Col> : null}
           {allowed([Roles.ADVANCEMENT], 'read') ? <Col span={24}>
               <StaffPerformance />
           </Col> : null}
           {allowed([Roles.SETUP], 'read') ? <Col span={24}>
                <PendingRequests />
            </Col> : null}
       </Row>
    )
}