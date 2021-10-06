import React from 'react';
import ListCard from '../../../../../../../../molecules/ListCard';
import moment from 'moment';
import { useHistory } from 'react-router';

const colName = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: text => text ? moment(text).format('Do MMMM YYYY') : ''
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
];

export default (props) => {

    const { data, id } = props;
    const history = useHistory();

    return (
          <ListCard
          scrolling={500}
          title="Show Cause Letter History"
          ListCol={colName}
          ListData={data?.showCause}
          pagination={false}
          extraBtn={'Request Show Cause'}
          extraAction={() => history.push(`/requests/${id}`)}
          btnClass='red-btn'
          listClass="nospace-card"
          />
    )
}