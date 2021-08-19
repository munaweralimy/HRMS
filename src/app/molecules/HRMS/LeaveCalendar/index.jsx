import React from 'react';
import { Card, Row, Col, Calendar, Badge, Typography, LocaleProvider } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import moment from 'moment';

const { Title } = Typography;

export default (props) => {

    function getListData(value) {
        let listData;
        switch (value.date()) {
          case 8:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
            ];
            break;
          case 10:
            listData = [
              { type: 'warning', content: 'This is warning event.' },
              { type: 'success', content: 'This is usual event.' },
              { type: 'error', content: 'This is error event.' },
            ];
            break;
          case 15:
            listData = [
              { type: 'warning', content: 'This is warning event' },
              { type: 'success', content: 'This is very long usual event。。....' },
              { type: 'error', content: 'This is error event 1.' },
              { type: 'error', content: 'This is error event 2.' },
              { type: 'error', content: 'This is error event 3.' },
              { type: 'error', content: 'This is error event 4.' },
            ];
            break;
          default:
        }
        return listData || [];
      }

    function dateCellRender(value) {
        const listData = getListData(value);
        return (
          <ul className="events">
            {listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} />
              </li>
            ))}
          </ul>
        );
      }

    return (
        <Card bordered={false} className='uni-card dashboard-card main-card-hover'>
            <Row gutter={[20,30]}>
                <Col span={24}>
                    <Title level={4} className='mb-0 c-default'>Calendar</Title>
                </Col>
                <Col span={24}>
                    <LocaleProvider locale={en_GB}>
                        <Calendar 
                        className='custom-calendar' 
                        dateCellRender={dateCellRender} 
                        disabledDate = {
                            current => {
                            return  moment(current).day() === 0 || moment(current).day() === 6 
                            }
                        }
                        />
                    </LocaleProvider>
                </Col>
            </Row>
        </Card>
    )
}