import React, { useState, useEffect, Fragment } from 'react';
import { Row, Col } from "antd";
import PendingRequestCard from '../../../molecules/PendingRequestCard';
import HeadingChip from '../../../molecules/HeadingChip';

export default (props) => {

    const data = [
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

    const issues = [
        {
            title: 'Tasks',
            label: 'Task Issues',
            data: data,
            count: data.length,
            link: '/tasks',
            innerlink: '/tasks/',
            status: 'b-error'
        },
        {
            title: 'Development',
            label: 'Advancement Issues',
            data: data,
            count: data.length,
            link: '/advancement',
            innerlink: '/advancement/',
            status: 'b-error'
        },
        {
            title: 'Employment',
            label: 'Employment Issues',
            data: data,
            count: data.length,
            link: '/employment',
            innerlink: '/employment/',
            status: 'b-error'
        },
        {
            title: 'Finance',
            label: 'Finance Issues',
            data: data,
            count: data.length,
            link: '/finance',
            innerlink: '/finance/',
            status: 'b-error'
        },
        {
            title: 'Leaves',
            label: 'Leaves Issues',
            data: data,
            count: data.length,
            link: '/leaves',
            innerlink: '/leaves/',
            status: 'b-error'
        },
        {
            title: 'Attendance',
            label: 'Attendance Issues',
            data: data,
            count: data.length,
            link: '/attendance',
            innerlink: '/attendance/',
            status: 'b-error'
        },

    ]

    return (
        <Row gutter={[20, 30]}>
            <Col span={24}>
                <HeadingChip title={'Pending Issues'} />
            </Col>
            <Col span={24}>
                <Row gutter={[20, 20]}>
                    {issues.map((item, index) => (
                    <Fragment key={index}>
                        <Col flex='1 1 300px'>
                            <PendingRequestCard
                            data={item.data}
                            title={item.title}
                            count={item.count}
                            link={item.link}
                            label={item.label}
                            innerlink={item.innerlink}
                            status={item.status}
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