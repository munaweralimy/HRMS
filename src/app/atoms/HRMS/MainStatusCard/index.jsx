import React from 'react';
import { Row, Col, Typography, Avatar, Card, Space } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { baseUrl } from '../../../../configs/constants';

const { Title, Text } = Typography;

export default (props) => {
  const { data, link, addon, statusKey } = props;
  const history = useHistory();
  const statuses = (status) => {
    switch (status) {
      case 'Missed':
        return 'b-error';
      case 'Pending':
        return 'b-pending';
      case 'Fit Index':
        return 'b-success';
      case 'Low Index':
        return 'b-error';
      case 'Medium Fit Index':
        return 'b-pending';
      case 'Late Clock In':
        return 'b-pending';
      case 'Absent':
        return 'b-error';
      case 'On Duty':
        return 'b-success';
      case 'Outstanding Loan':
        return 'b-error';
      case 'Expiring Asset Possession':
        return 'b-pending';
      case 'Expired Asset Possession':
        return 'b-error';
      case 'Expiring':
        return 'b-pending';
      case 'Expired':
        return 'b-error';
      case 'On Leave':
        return 'b-success';
      case 'Rest Day':
        return 'b-success';
      case 'Early Clock Out':
        return 'b-pending';

      case 'Permanent':
        return 'b-success';
      case 'Contract':
        return 'b-pending';
    }
  };

  return (
    <Link
      to={{
        pathname: link ? `${link}${data.employee_id}` : '',
        state: { tab: link == '/employment/' ? '1' : data?.status },
      }}
    >
      <Card bordered={false} className="uni-card">
        <Row gutter={[20, 30]}>
          <Col span={24}>
            <Space size={17}>
              <Avatar size={70} src={`${baseUrl}${data?.image}`} />
              <Space direction="vertical" size={0}>
                <Title level={5} className="c-default mb-0">
                  {data?.employee_name}
                </Title>
                <Text className="c-gray lineHeight20">{data?.employee_id}</Text>
              </Space>
            </Space>
          </Col>

          <Col span={24}>
            <Card bordered={false} className={`mini-card ${statuses(data[statusKey])}`}>
              <Row gutter={24} wrap={false} align="middle">
                <Col span={24}>
                  <Space direction="vertical" size={2}>
                    <Title level={5} className="mb-0">
                      {data[statusKey]} {addon}
                    </Title>
                    {data?.date && (
                      <Title level={5} className="mb-0 op-6">
                        {data?.date && moment(data?.date).format('Do MMMM YYYY')}
                      </Title>
                    )}
                    {data?.creation && (
                      <Title level={5} className="mb-0 op-6">
                        {data?.creation && moment(data?.creation).format('Do MMMM YYYY')}
                      </Title>
                    )}
                  </Space>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
    </Link>
  );
};
