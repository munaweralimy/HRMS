import React, {useEffect} from 'react';
import {Row, Col } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ApplicationProgress from '../../../molecules/ApplicationProgress';
import EnrolledLayout from '../../../molecules/EnrolledLayout';
import { getApplicationLeads, getApplicationProgress, getTotalStudentEnrolled } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../configs/constantData';
import ListCard from '../../../molecules/ListCard'

export default (props) => {
    const dispatch = useDispatch();
    const i18n = useTranslate();
    const { t } = i18n;
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const applicationLeads = useSelector(state => state.marketing.applicationList);
    const delayedApplicationCount = useSelector(state => state.marketing.applicationCount);
    const applicationProgress = useSelector(state => state.marketing.applicationProg);
    const totalStudentsEnrolled = useSelector(state => state.marketing.totalStudentEnrolled);

    useEffect(() => {
        dispatch(getApplicationLeads());
        dispatch(getApplicationProgress());
        dispatch(getTotalStudentEnrolled());
    }, []);

    const ListCol = [
        {
          title: 'Application Type',
          dataIndex: 'applicationType',
          key: 'applicationType',
        },
        {
          title: 'Agents',
          dataIndex: 'agents',
          key: 'age',
        },
        {
          title: 'Marketing',
          dataIndex: 'marketing',
          key: 'address',
        },
        {
          title: 'Online',
          dataIndex: 'online',
          key: 'address',
        },
        {
          title: 'Total',
          dataIndex: 'total',
          key: 'address',
        },
      ];

      const dataSource = [
        {
          key: '1',
          applicationType: 'New Applicants',
          agents: '5',
          marketing: '2',
          online: '6',
          total: '13'
        },
        {
          key: '2',
          applicationType: 'Direct Upgrade',
          agents: '5',
          marketing: '2',
          online: '6',
          total: '13'
        },
        {
          key: '3',
          applicationType: 'Alumni',
          agents: '5',
          marketing: '2',
          online: '6',
          total: '13'
        },
        {
          key: '4',
          applicationType: 'Transfer Students',
          agents: '5',
          marketing: '2',
          online: '6',
          total: '13'
        },
        {
          key: '5',
          applicationType: 'Total',
          agents: '5',
          marketing: '2',
          online: '6',
          total: '13'
        },
      ];

    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title="Marketing Overview" />
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]}>
                    <Col flex='1 1 300px'>
                        <ApplicationProgress label="Incomplete Applications" link="/marketing/applications/incomplete-applications" incompApplication={applicationProgress} />
                    </Col>
                    <Col flex='1 1 300px' order={isHDScreen ? 0 : 1}>
                        <EnrolledLayout label='Enrolled Students' totalStudent={totalStudentsEnrolled} />
                    </Col>
                    <Col flex='1 1 300px'>
                        <PendingRequestCard
                        data={applicationLeads}
                        title=""
                        count={applicationLeads.length || 0}
                        link=""
                        label="Application Leads"
                        innerlink=""
                        />
                    </Col>
                    <Col span={24} order={4}>
                        <ListCard
                        title='Total Recruitment'
                        ListCol={ListCol}
                        ListData={dataSource}
                        pagination={false}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}