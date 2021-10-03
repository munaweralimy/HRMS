import React, { Fragment } from 'react';
import { Row, Col } from "antd";
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import HeadingChip from '../../../molecules/HeadingChip';

export default (props) => {
    const {pendingData} = props;

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
                                data={item.rows}
                                title={item.title}
                                count={item.count}
                                link={item.link}
                                label={item.title}
                                innerlink={item.title}
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