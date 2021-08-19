import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tabs, Typography, Tag } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { getMyTasks } from '../../ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import SearchMyTask from '../SearchMyTask';
import ListCard from '../../../../../molecules/ListCard';
import AddNewTimeSheet from './Component/AddNewTimeSheet';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../configs/constantData';
import DetailsComponent from '../../../../../molecules/HRMS/DetailsComponent';
import moment from 'moment';

const { TabPane } = Tabs;
const { Title } = Typography;

const ListCol = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    elipsis: true
  },
  {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      align: 'center',
  },
  {
      title: 'Task',
      dataIndex: 'tasks',
      key: 'tasks',
      ellipsis: true,
  },
  {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'right',
      render: (text) => {
        let clname = '';
        if (text == 'Approved') {
          clname = 'c-success';
        } else if (text == 'Rejected' || text == 'Missed') {
          clname = 'c-error';
        } else if (text == 'Pending') {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
  },
]

export default (props) => {

  const dispatch = useDispatch();
  const [addVisible, setAddVisible] = useState(false)
  const myTaskData = useSelector(state => state.tasks.myTaskData);
  const [rowDetails, setRowDetail] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

  useEffect(() => {
    dispatch(getMyTasks('HR-EMP-00002'));
  }, []);

  const btnList = [
    {
      text: '+ Add New Timesheet',
      classes: 'green-btn',
      action: () => { setAddVisible(true); setActiveKey('1')},
    },
  ];

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowDetail(true)
        let temp = [
          {
            label: 'Timesheet Date',
            value: record?.date ? moment(record.date).format('Do MMMM YYYY') : ''
          },
          {
            label: 'Project Name',
            value: record?.project
          },
          {
            label: 'Total Hours',
            value: record?.hours
          },
          {
            label: 'Task',
            value: record?.tasks
          },
          {
            label: 'Status',
            value: record?.status,
            classi: record?.status =='Rejected' ? 'c-error' : record?.status == 'Approve' ? 'c-success' : 'c-pending' 
          },
        ];
        setRowData(temp)
      },
    };
  }

  const onSearch = (val) => {
    console.log('---------', val);
  }

  return (
    <>
      {!addVisible && <HeadingChip btnList={btnList} classes={`${isHDScreen ? 'optionsTabs' : 'mb-1-5'}`} />}
      <Card bordered={false} className='uni-card'>
          <Tabs activeKey={activeKey} type="card" className='custom-tabs' onChange={(e) => setActiveKey(e)}>
            <TabPane key={'1'} tab='Timesheet'>
              {!rowDetails && !addVisible &&
              <ListCard 
              title='My Timesheet'
              onRow={onClickRow}
              Search={SearchMyTask} 
              onSearch={onSearch} 
              ListCol={ListCol} 
              ListData={myTaskData?.timesheet} 
              pagination={true}
              classes='clickRow'
              />}
              {addVisible && <AddNewTimeSheet setAddVisible={setAddVisible} />}
              {rowDetails && (
                <DetailsComponent 
                  setRowDetail={setRowDetail} 
                  mainTitle='Timesheet Details'
                  backbtnTitle='My Timesheet'
                  data={rowData}
                  />
              )}
            </TabPane>

            <TabPane key={'2'} tab='Projects'>
              <Row gutter={[20,30]}>
                <Col span={24}>
                  <Title level={4} className='c-default mb-0'>My Projects</Title>
                </Col>
                <Col span={24}>
                  <Row gutter={[20,20]}>
                    {myTaskData && ( 
                      <>
                      {myTaskData?.projects?.map((e, index) => (
                    <Col span={24} key={index}>
                      <Tag className="program-list">
                        <span className="p-name">{e.project}</span>
                      </Tag>
                    </Col>))}
                    </>)}
                  </Row>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
      </Card>
    </>
  );
};