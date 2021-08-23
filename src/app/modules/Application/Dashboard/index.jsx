import React from 'react';
import { Row, Col, Calendar } from "antd";
import DashboardClock from '../component/DashboardClock';
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import LeaveCalendar from '../../../molecules/HRMS/LeaveCalendar';
import ProgressCard from '../../../molecules/HRMS/ProgressCard';

export default (props) => {

    const policyData = [
        {
            user_image: '',
            name: '1234565533',
            applicant_name: 'Rebecca Holmes'
        },
        {
            user_image: '',
            name: '454654654',
            applicant_name: 'Rose Chaves'
        },
        {
            user_image: '',
            name: '987265466',
            applicant_name: 'Harry Boyed'
        },
        {
            user_image: '',
            name: '1234565533',
            applicant_name: 'Rebecca Holmes'
        },
        {
            user_image: '',
            name: '454654654',
            applicant_name: 'Rose Chaves'
        },
        {
            user_image: '',
            name: '987265466',
            applicant_name: 'Harry Boyed'
        },
    ]

    return (
        <Row gutter={[20,20]}>
            <Col span={24}>
                <DashboardClock />
            </Col>
            <Col flex='1 0 398px'>
                <PendingRequestCard
                data={policyData}
                title={'Policy'}
                link={''}
                innerlink={''}
                level={4}
                space={10}
                status='none'
                />
            </Col>
            <Col flex='1 0 398px'>
                <ProgressCard />
            </Col>
            <Col flex='1 0 398px'>
                <LeaveCalendar />
            </Col>
        </Row>
    )
}