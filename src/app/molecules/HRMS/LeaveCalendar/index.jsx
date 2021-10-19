import React, { useEffect } from 'react';
import { Card, Row, Col, Calendar, Badge, Typography, Divider, Button, ConfigProvider, Space } from 'antd';
import en_GB from 'antd/lib/locale-provider/en_GB';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getCalenderData } from '../../../modules/Application/ducks/actions';

const { Title } = Typography;

export default (props) => {
  const dispatch = useDispatch();
  //const {calenderData} = props;
  const calenderData = useSelector(state => state.global.calenderData);
  const companyName = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].company;
  let startOfMonth = moment().startOf('month').format('YYYY-MM-DD');
  let endOfMonth   = moment().endOf('month').format('YYYY-MM-DD');

  useEffect(() => {
    dispatch(getCalenderData(startOfMonth,endOfMonth,companyName));
  }, [])

  function getListData(array) {
    let listData;
    array?.map(resp => {
      if(resp?.compareDate) {
        console.log('array', resp?.compareDate, resp?.date)
        if(resp?.leave_type == 'Annual Leave'){
          listData = [
            { type: 'success', content: 'Annual Leave' },
          ];
        }
        if(resp?.leave_type == 'Medical Leave'){
          listData = [
            { type: 'error', content: 'Medical Leave' },
          ];
        }
      }
    })
    
    // switch (value.date()) {
    //   case 8:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event.' },
    //       { type: 'success', content: 'This is usual event.' },
    //     ];
    //     break;
    //   case 10:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event.' },
    //       { type: 'success', content: 'This is usual event.' },
    //       { type: 'error', content: 'This is error event.' },
    //     ];
    //     break;
    //   case 23:
    //     listData = [
    //       { type: 'warning', content: 'This is warning event' },
    //       { type: 'success', content: 'This is very long usual event。。....' },
    //       { type: 'error', content: 'This is error event 1.' },
    //       { type: 'error', content: 'This is error event 2.' },
    //       { type: 'purple', content: 'This is error event 3.' },
    //       { type: 'error', content: 'This is error event 4.' },
    //     ];
    //     break;
    //   default:
    // }
    return listData || [];
  }

  function dateCellRender(value) {
    let sDate = null;
    let eDate = null;
    let cDate = null;
    let vDate = null
    let array = []
    calenderData?.map(resp => {
      sDate = moment(resp?.start_date).format('YYYY-MM-DD');
      eDate = moment(resp?.end_date).format('YYYY-MM-DD');
      cDate = moment(value);
      vDate = cDate?.isBetween(sDate,eDate)
      array.push({
        compareDate: vDate,
        leave_type: resp?.leave_type,
        date: value.date()
      })
    })
    //console.log('value',array,vDate)
    
    const listData = getListData(array);
    const unique = [...new Map(listData.map(item => [item.type, item])).values()];
    return (
      <Space size={3} className='justify-cetner' wrap>
        {unique.map(item => (
          <Badge status={item.type} />
        ))}
      </Space>
    );
  }

  function onPanelChange(value, mode) {
    startOfMonth = moment(value).startOf('month').format('YYYY-MM-DD');
    endOfMonth   = moment(value).endOf('month').format('YYYY-MM-DD');
    dispatch(getCalenderData(startOfMonth,endOfMonth,companyName))
  }

  const customHeader = ({value, type, onChange, onTypeChange}) => {
    const nextMonth = () => {      
      let newValue = value.clone();
      let currentmonth = value.month();
      let currentyear = value.year();
      
      if (currentmonth > 11) {
        currentmonth = 0;
        currentyear + 1;
      } else {
        currentmonth = currentmonth + 1
      }
      newValue.month(parseInt(currentmonth, 10));
      onChange(newValue);
    }

    const prevMonth = () => {
      let newValue = value.clone();
      let currentmonth = value.month();
      let currentyear = value.year();
      if (currentmonth < 0) {
        currentmonth = 11;
        currentyear - 1;
      } else {
        currentmonth = currentmonth - 1
      }
      newValue.month(parseInt(currentmonth, 10));
      onChange(newValue);
    }

    const updateValue = (value) => {
      return moment(value).format('MMMM YYYY')
    }

    return (
      <Card bordered={false} className='mini-card mini-card10 b-dark-gray'>
        <Row gutter={20} justify='space-between'>
          <Col><Button onClick={prevMonth} type='link' className='c-gray-linkbtn p-0' htmlType='button' icon={<LeftOutlined />} /></Col>
          <Col><Title level={5} className='c-default mb-0'>{updateValue(value)}</Title></Col>
          <Col><Button onClick={nextMonth} type='link' className='c-gray-linkbtn p-0' htmlType='button' icon={<RightOutlined />} /></Col>
        </Row>
      </Card>
    );
  }

    return (
        <Card bordered={false} className='uni-card dashboard-card main-card-hover'>
            <Row gutter={20}>
                <Col span={24}>
                    <Title level={4} className='mb-10PX c-default'>Calendar</Title>
                </Col>
                <Col span={24}>
                    <ConfigProvider locale={en_GB}>
                        <Calendar 
                          className='custom-calendar' 
                          dateCellRender={dateCellRender} 
                          disabledDate = {
                              current => {
                              return  moment(current).day() === 0 || moment(current).day() === 6 
                            }
                          }
                          onPanelChange={onPanelChange}
                          headerRender={customHeader}
                        />
                    </ConfigProvider>
                </Col>
                <Col span={24}>
                    <Divider className='mt-0 mb-10PX' />
                    <Row gutter={20} justify='space-between'>
                        <Col>
                            <Badge className='bottom-badge' status="success" text='Annual' />
                        </Col>
                        <Col>
                            <Badge className='bottom-badge' status="error" text='Medical' />
                        </Col>
                        <Col>
                            <Badge className='bottom-badge' color="purple" text='Unpaid' />
                        </Col>
                        <Col>
                            <Badge className='bottom-badge' status="warning" text='Holiday' />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    )
}