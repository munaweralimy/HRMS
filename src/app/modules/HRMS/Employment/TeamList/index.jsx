import React, {useState, useEffect} from 'react';
import { Row, Col, Typography } from 'antd';
import ListComponent from '../../../../molecules/HRMS/ListComponent';
import { useHistory } from 'react-router-dom';
import { getTeams } from '../ducks/action';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import SearchTeam from '../components/SearchTeam';

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
  const [searching, setSearching] = useState(null);
  const data = useSelector(state => state.employment.teamList);
  const company = useSelector(state => state.global.companies);
  const [allCompany, setAllCompany] = useState([]);

  useEffect(() => {
    dispatch(getTeams(1, 5, '', ''))
  }, []);
  
  useEffect(() => {
    if (Object.keys(company).length > 0) {
      let temp = []
      company.map((x, i) => {
        if (i == 0) {
          temp.push({label: 'All', value: ''})
          temp.push({label: x.name, value: x.name})
        } else {
          temp.push({label: x.name, value: x.name})
        }
      });
      setAllCompany(temp);
    }
  }, [company]);

  const onSearch = (val) => {
    if (val.company) {
      setSearching(val.company);
      dispatch(getTeams(page, limit, sort, sortby, val.company));
    } else {
      setSearching(null);
      dispatch(getTeams(page, limit, sort, sortby, null));
    }
  };

  const updateList = (page, limit, sort, sortby) => {
    dispatch(getTeams(page, limit, sort, sortby, searching));
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
          Search={SearchTeam}
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