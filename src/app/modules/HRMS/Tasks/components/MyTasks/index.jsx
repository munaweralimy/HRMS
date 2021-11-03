import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Tabs, Typography, Tag } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { getMyProjects, getMyTasks } from '../../ducks/actions';
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
    sorter: true,
  },
  {
    title: 'Project',
    dataIndex: 'project',
    key: 'project',
    elipsis: true,
    sorter: true,
  },
  {
      title: 'Hours',
      dataIndex: 'hours',
      key: 'hours',
      align: 'center',
      sorter: true,
  },
  {
      title: 'Task',
      dataIndex: 'tasks',
      key: 'tasks',
      ellipsis: true,
      sorter: true,
  },
  {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: true,
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
  const { iProps } = props;
  const dispatch = useDispatch();
  const [addVisible, setAddVisible] = useState(false)
  const myTaskData = useSelector(state => state.tasks.myTaskData);
  const myProjects = useSelector(state => state.tasks.myProject);
  const [rowDetails, setRowDetail] = useState(false);
  const [mode,setMode] = useState('');
  const [rowData, setRowData] = useState([]);
  const [selectedRecord, setRecord] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(10);
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const id = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0].name;

  useEffect(() => {
    dispatch(getMyTasks(id, page, limit, '', ''));
    dispatch(getMyProjects(id));
  }, []);

  const btnList = [
    {
      text: '+ Add New Timesheet',
      classes: 'green-btn',
      action: () => { setAddVisible(true); setActiveKey('1'); setMode('add')},
    },
  ];

  

  useEffect(() => {
    if(iProps?.activeAddTimeSheet) {
      setAddVisible(true);setActiveKey('1'); setMode('add');
    }
  }, [iProps?.activeAddTimeSheet])

  const updateApi = () => {
    setRecord(null);
    dispatch(getMyTasks(id, 1, limit, '', ''));
  }

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setRowDetail(true)
        setRecord(record);
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
            classi: record?.status =='Pending' ? 'c-pending' : record?.status == 'Approved' ? 'c-success' : 'c-error' 
          },
        ];
        setRowData(temp)
      },
    };
  }

  const onSearch = (val) => {
    console.log('---------', val);
  }

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getMyTasks(id, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
        dispatch(getMyTasks(id, pagination.current, pagination.pageSize, '', ''));
    }
  }

  const onEdit = () => {
    setAddVisible(true); setMode('edit')
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
              classes='clickRow'
              onRow={onClickRow}
              listClass='nospace-card'
              Search={SearchMyTask && SearchMyTask}
              onSearch={SearchMyTask && onSearch}
              ListCol={ListCol}
              ListData={myTaskData?.rows}
              onChange={onTableChange}
              pagination={{
                total: myTaskData?.count,
                current: page,
                pageSize: limit
              }}
              />}
              {addVisible && <AddNewTimeSheet id={id} updateApi={updateApi} mode={mode} data={selectedRecord} setAddVisible={setAddVisible} />}
              {rowDetails && (
                <DetailsComponent 
                  setRecord={setRecord}
                  setRowDetail={setRowDetail}
                  mainTitle='Timesheet Details'
                  backbtnTitle='My Timesheet'
                  data={rowData}
                  onAction3={onEdit}
                  btn3title={'Edit Timesheet'}
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
                    {myProjects && ( 
                      <>
                    {myProjects.rows?.map((e, index) => (
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