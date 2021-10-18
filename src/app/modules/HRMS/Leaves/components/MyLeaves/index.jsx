import React, { useState, useEffect } from 'react';
import { Card, Tabs, Spin, message } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { getMyLeaves, getMyAvailableLeaves  } from '../../ducks/actions';
import { useSelector, useDispatch } from 'react-redux';
import ListCard from '../../../../../molecules/ListCard';
import ApplyLeave from './Component/ApplyLeave';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../../configs/constantData';
import { apiMethod } from '../../../../../../configs/constants';
import LeaveApplication from '../LeaveApplication';
import { LoadingOutlined } from '@ant-design/icons';
import axios from '../../../../../../services/axiosInterceptor';

const { TabPane } = Tabs;
const antIcon = <LoadingOutlined spin />;

const ListCol = [
  {
    title: 'Leave Type',
    dataIndex: 'leave_type',
    key: 'leave_type',
    sorter: true, 
  },
  {
    title: 'Carried Forward',
    dataIndex: 'carry_forwarded_leaves',
    key: 'carry_forwarded_leaves',
    align: 'center',
    sorter: true,
    render: (text) => {
      return <>{text} Days</>
    }
  },
  {
    title: 'Entitlement',
    dataIndex: 'till_date',
    key: 'till_date',
    sorter: true,
    align: 'center',
    render: (text) => {
      return <>{text} Days</>
    }
  },
  {
    title: 'Taken',
    dataIndex: 'taken_leaves',
    key: 'taken_leaves',
    sorter: true,
    align: 'center',
    render: (text) => {
      return <>{text} Days</>
    }
  },
  {
    title: 'Available',
    dataIndex: 'available_leaves',
    key: 'available_leaves',
    align: 'center',
    sorter: true,
    render: (text) => {
      return <span className="c-success">{text} Days</span>;
    },
  },
]

export default (props) => {
  const dispatch = useDispatch();
  const [addVisible, setAddVisible] = useState(false)
  const myTaskData = useSelector(state => state.leaves.myTaskData);
  const myAvailableLeaves = useSelector(state => state.leaves.myAvailableLeaves);
  const [rowDetails, setRowDetail] = useState(false);
  const [mode, setMode] = useState('');
  const [selectedRecord, setRecord] = useState([]);
  const [activeKey, setActiveKey] = useState('1');
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const [load, setLoad] = useState(false);
  
  const userdetail = JSON.parse(localStorage.getItem('userdetails')).user_employee_detail[0];
  

  useEffect(() => {
    dispatch(getMyLeaves(userdetail?.name,'Pending', 1, 10, '', ''));
    dispatch(getMyAvailableLeaves(userdetail?.name));
  }, []);


  const updateTimesheet = (status, page, limit, sort, sortby) => {
    dispatch(getMyLeaves(userdetail?.name, status, page, limit, sort, sortby));
  }

  const btnList = [
    {
      text: '+ Apply Leave',
      classes: 'green-btn',
      action: () => { setAddVisible(true); setActiveKey('1'); setMode('add') },
    },
  ];

  const updateApi = () => {
    setRecord(null);
    dispatch(getMyLeaves(userdetail.name,'Pending', 1, 10, '', ''));
  }

  const carryForward = async () => {
    setLoad(true)
    let url = `${apiMethod}/hrms.leaves_api.change_carry_forwarded_leaves?employee_id=${userdetail.name}`
    try {
        const res = await axios.get(url);
        if (res.data.message.success ==  false) {
          message.error(res.data.message.message);
        } else {
          message.success('Leaves Successfully Carry Forwarded');
          setTimeout(() => updateApi('Pending', 1, 10, '', ''), 2000);
        }

        setLoad(false)
        
        
    } catch(e) {
        const { response } = e;
        message.error('Something went wrong');
        setLoad(false)
    }
  }
  return (
    <>
      {!addVisible && <HeadingChip btnList={btnList} classes={`${isHDScreen ? 'optionsTabs' : 'mb-1-5'}`} />}
      <Card bordered={false} className='uni-card'>
        <Tabs activeKey={activeKey} type="card" className='custom-tabs' onChange={(e) => setActiveKey(e)}>
          <TabPane key={'1'} tab='Leave Application'>
            {!rowDetails && !addVisible &&
              <LeaveApplication id={userdetail.name} updateApi={updateTimesheet} ListData={myAvailableLeaves?.availibility} data={myTaskData} />
            }
            {addVisible && <ApplyLeave id={userdetail.name} fullName={userdetail.fullName} company={userdetail.company} updateApi={updateApi} mode={mode} data={selectedRecord} setAddVisible={setAddVisible} />}
          </TabPane>

          <TabPane key={'2'} tab='Availability'>
              <Spin indicator={antIcon} size="large" spinning={load}>
                <ListCard 
                  title='Leave Availability' 
                  ListCol={ListCol} 
                  ListData={myAvailableLeaves?.availibility} 
                  pagination={false}
                  extraBtn={'Carry Forward Extension (60 Days)'}
                  extraAction={carryForward}
                  btnClass='green-btn'
                />
              </Spin>
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};