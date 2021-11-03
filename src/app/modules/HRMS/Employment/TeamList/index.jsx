import React, {useState, useEffect} from 'react';
import { Row, Col, Typography } from 'antd';
import ListComponent from '../../../../molecules/HRMS/ListComponent';
import Search from '../components/Search';
import { useHistory } from 'react-router-dom';
import { getTeams } from '../ducks/action';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

const { Title } = Typography;
const colName = [
  {
    title: 'Team',
    dataIndex: 'team_name',
    key: 'team_name ',
    sorter: true,
  },
  {
    title: 'Company',
    dataIndex: 'company',
    key: 'company',
    sorter: true,
  },
  {
    title: 'Team Member',
    dataIndex: 'members',
    key: 'members',
    sorter: true,
    align: 'center',
  },
  {
    title: 'Crated',
    dataIndex: 'creation',
    key: 'creation',
    sorter: true,
    render: (text) => text ? moment(text).format('Do MMMM YYYY') : text
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
  },
];

export default (props) => {

  const history = useHistory();
  const dispatch = useDispatch();
  const data = useSelector(state => state.employment.teamList);

  useEffect(() => {
    dispatch(getTeams(1, 5, '', ''))
  }, []);

  const onSearch = () => {};

  const updateList = (page, limit, sort, sortby) => {
    dispatch(getTeams(page, limit, sort, sortby));
  }

    
  return (
    <Row gutter={[20,30]}>
      <Col span={24}>
        <Title level={3} className='mb-0'>Team List</Title>
      </Col>
      <Col span={24}>
        <ListComponent
          link='/employment/team/'
          linkKey='team_code'
          Search={Search}
          onSearch={onSearch}
          data={data}
          ListCol= {colName}
          defaultLimit={5}
          updateList={updateList}
        />
      </Col>
  </Row>
  )
};