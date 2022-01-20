import React, { Fragment, useEffect } from 'react';
import { Row, Col } from "antd";
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import HeadingChip from '../../../molecules/HeadingChip';
import { getPendingIssues } from '../../Application/ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

export default (props) => {
    const dispatch = useDispatch();
    const pendingData = useSelector(state => state.global.pendingData);
    //const company = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;

    useEffect(() => {
        dispatch(getPendingIssues());
    }, [])

    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title={'Pending Issues'} />
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]}>
                    {pendingData.map((item, index) => (
                    <Fragment key={index}>
                        <Col flex='1 1 300px'>
                            <PendingRequestCard
                                data={item?.rows}
                                title={item?.title}
                                count={item?.count}
                                link={item?.title}
                                label={item?.title}
                                innerlink={item?.title}
                                status='b-error'
                                level={4}
                            />
                        </Col>
                    </Fragment>
                    ))}
                </Row>
            </Col>
        </Row>
    )
}