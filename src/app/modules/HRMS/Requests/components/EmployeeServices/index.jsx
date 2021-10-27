import React from 'react';
import { Row, Col, Card, Typography } from 'antd';
import CategoryCard from '../../../../../atoms/CategoryCard';
import Roles from '../../../../../../routing/config/Roles';
import {allowed} from '../../../../../../routing/config/utils';
import { TaskIcon, AdvancementIcon, CalendarIcon, FacultyIcon, ClockIcon, StaffIcon } from '../../../../../atoms/CustomIcons';

const { Title } = Typography;

export default (props) => {

    const { id } = props;

    const cardData = [
        {
          title: 'Tasks',
          icon: <TaskIcon />,
          link: `/tasks/${id}`
        },
        {
          title: 'Advancement',
          icon: <AdvancementIcon />,
          text: 'Low Fit Index',
          status: 'c-error',
          link: `/advancement/${id}`
        },
        {
          title: 'Employment',
          icon: <StaffIcon />,
          text: 'Expiring Passport',
          status: 'c-pending',
          link: `/employment/${id}`
        },
        {
          title: 'Finance',
          icon: <FacultyIcon />,
          text: '1 Outstanding Loan',
          status: 'c-error',
          link: `/finance/${id}`
        },
        {
          title: 'Leaves',
          icon: <CalendarIcon />,
          text: '1 Pending Leave Application',
          status: 'c-error',
          link: `/leaves/${id}`
        },
        {
          title: 'Attendance',
          icon: <ClockIcon />,
          link: `/attendance/${id}`
        },
      ]

    return (
        <Card bordered={false} className="uni-card h-auto w-100">
            <Row gutter={[20, 30]}>
              <Col span={24}><Title level={4} className='mb-0'>Select Category</Title></Col>
              <Col span={24}>
                <Row gutter={[20,20]}>
                  {cardData.map((x, i) => {
                    if (x.title != 'Finance' && x.title != 'Employment') {
                      return <Col flex='1 0 250px' key={i}>
                        <CategoryCard data={x} />
                      </Col>
                    } else {
                      if (allowed([Roles.EMPLOYMENT])) {
                        return <Col flex='1 0 250px' key={i}>
                          <CategoryCard data={x} />
                        </Col>
                      }
                    }
                  })}
                </Row>
              </Col>
            </Row>
        </Card>
    )
}