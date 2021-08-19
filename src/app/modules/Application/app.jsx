import React, {useEffect} from 'react';
import { Row, Typography, Col, Card } from "antd";
import HeadingChip from '../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ApplicationProgress from '../../molecules/ApplicationProgress';
import EnrolledLayout from '../../molecules/EnrolledLayout';
import { getApplicationLeads, getApplicationProgress, getTotalStudentEnrolled } from '../Marketing/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../configs/constantData';
import PendingRequestCard from '../../molecules/PendingRequestCard';

const { Title } = Typography;

export default (props) => {
    const dispatch = useDispatch();
    const i18n = useTranslate();
    const { t } = i18n;
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
    const applicationLeads = useSelector(state => state.marketing.applicationList);
    const applicationProgress = useSelector(state => state.marketing.applicationProg);
    const totalStudentsEnrolled = useSelector(state => state.marketing.totalStudentEnrolled);

    useEffect(() => {
        dispatch(getApplicationLeads());
        dispatch(getApplicationProgress());
        dispatch(getTotalStudentEnrolled());
    }, [])

    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title={'Marketing'} />
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
                      count={applicationLeads.length}
                      link=""
                      label="Application Leads"
                      innerlink=""
                    />
                  </Col>
                  
              </Row>
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]} justify="center" align="middle" className="mb-2 mt-2">
                  <Col span={24}>
                    <Title level={3} className="text-white mb-0">
                      Faculty
                    </Title>
                  </Col>
                
                  <Col flex='1 1 300px'>
                    <Card className="uni-card main-card-hover" bordered={false} style={{height: '500px'}}></Card>
                  </Col>
                  <Col flex='1 1 300px'>
                    <Card className="uni-card main-card-hover" bordered={false} style={{height: '500px'}}></Card>
                  </Col>
                  <Col flex='1 1 300px'>
                    <Card className="uni-card main-card-hover" bordered={false} style={{height: '500px'}}></Card>
                  </Col>
                </Row>
            </Col>

            <Col span={24}>
                <Row gutter={[20, 20]} justify="center" align="middle" className="mb-2 mt-2">
                  <Col span={24}>
                    <Title level={3} className="text-white mb-0">
                    Administration
                    </Title>
                  </Col>
                
                  <Col flex='1 1 300px'>
                    <Card className="uni-card main-card-hover" bordered={false} style={{height: '500px'}}></Card>
                  </Col>
                  <Col flex='1 1 300px'>
                    <Card className="uni-card main-card-hover" bordered={false} style={{height: '500px'}}></Card>
                  </Col>
                  <Col flex='1 1 300px'>
                    <Card className="uni-card main-card-hover" bordered={false} style={{height: '500px'}}></Card>
                  </Col>
                </Row>
            </Col>
        </Row>
    )
}