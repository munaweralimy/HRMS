import React from 'react';
import { Row, Col, Calendar } from "antd";
import DashboardClock from '../component/DashboardClock';
import PolicyRequestCard from '../../../molecules/PolicyRequestCard';
import LeaveCalendar from '../../../molecules/HRMS/LeaveCalendar';
import ProgressCard from '../../../molecules/HRMS/ProgressCard';

export default (props) => {
    const {policyData, timesheetData, checkInData} = props;
    
    return (
        <Row gutter={[20,20]}>
            <Col span={24}>
                <DashboardClock checkInData={checkInData} />
            </Col>
            <Col flex='1 0 398px'>
                {policyData?.rows?.length > 0 && <PolicyRequestCard
                    data={policyData?.rows[0]}
                    title={'Policy'}
                    level={4}
                    spacing={10}
                />}
            </Col>
            <Col flex='1 0 398px'>
                <ProgressCard timesheetData={timesheetData} />
            </Col>
            <Col flex='1 0 398px'>
                <LeaveCalendar />
            </Col>
        </Row>
    )
}