import React, { useState, useEffect, Fragment } from 'react';
import ListCard from '../../ListCard';
import { Radio, Space, Typography, Row, Col, Pagination, Button } from 'antd';
import { useHistory } from 'react-router';
import { AppstoreFilled, DatabaseFilled } from '@ant-design/icons';
import MainStatusCard from '../../../atoms/HRMS/MainStatusCard';

const _ = require('lodash');
const { Title } = Typography;

export default (props) => {
    const { iProps } = props;
    const history = useHistory();
    const { link, listCol, listdata, updateApi, filters, Search, listcount, carddata, cardcount, searchDropdowns, addon, statusKey, addonkey, listLink, topbtn } = iProps;
    const [filterVal, setFilterVal] = useState(filters && filters[0]?.value);
    const [page, setPage] = useState(1);
    const [limit,setLimit] = useState(6);
    const [view, setView] = useState('card');
    const [sorting, setSorting] = useState('');
    const [searchVal, setSearchVal] = useState(null);

  useEffect(() => {
    updateApi(filterVal, page, limit, '', '', view, null);
  }, []);

  // Card Pagination
  const onPageChange = (pg) => {
    setPage(pg);
    updateApi(filterVal, pg, 6, sorting, '', view, null);
  };

  const onSorting = () => {
    if (sorting == 'ASC') {
      setSorting('DESC');
      updateApi(filterVal, page, limit, 'DESC', '', view, null);
    } else {
      setSorting('ASC');
      updateApi(filterVal, page, limit, 'ASC', '', view, null);
    }
  };

  // Switching Views

  const onViewChange = (e) => {
    setView(e.target.value);
    setPage(1);
    if (e.target.value == 'list') {
      setLimit(10);
      updateApi(filterVal, 1, 10, '', '', e.target.value, null);
    } else {
      setLimit(6);
      updateApi(filterVal, 1, 6, '', '', e.target.value, null);
    }
  };

  const SwitchView = () => {
    return (
      <Space size={30} className="optionsTabs">
        {view == 'card' && (
          <Space>
            <Title level={5} className="mb-0 c-default">
              Sort by:
            </Title>
            <Button type="button" className="gray-btn" onClick={onSorting}>
              {sorting == 'ASC' ? 'Oldest' : 'Latest'}
            </Button>
          </Space>
        )}
        <Space>
          <Title level={5} className="mb-0 c-default">
            View:
          </Title>
          <Radio.Group onChange={onViewChange} value={view} buttonStyle="solid">
            <Radio.Button value={'list'}>
              <DatabaseFilled />
            </Radio.Button>
            <Radio.Button value={'card'}>
              <AppstoreFilled />
            </Radio.Button>
          </Radio.Group>
        </Space>
        {topbtn && 
        <Button type="primary" size='large' className="green-btn" onClick={topbtn.topAction}>
            {topbtn.title}
        </Button>}
      </Space>
    );
  };

  // List/ Table Function

  const onFilter = (e) => {
    setFilterVal(e.target.value);
    updateApi(e.target.value, 1, 10, '', '', view, null);
  };

  const onSearch = (val) => {
    setSearchVal(val);
    setPage(1);
    updateApi(e.target.value, 1, 10, '', '', view, val);
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        history.push(`${listLink || link}${record?.employee_id}`);
      },
    };
  };

  const onTableChange = (pagination, filters, sorter) => {
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      updateApi(filterVal, pagination.current, pagination.pageSize, sorter.order, sorter.columnKey, view, searchVal);
    } else {
      updateApi(filterVal, pagination.current, pagination.pageSize, '', '', view, searchVal);
    }
  };

  return (
    <>
      <SwitchView />
      {view == 'list' ? (
        <ListCard
          classes='clickRow'
          onRow={onClickRow}
          filters={filters && filters}
          Search={Search && Search}
          onSearch={Search && onSearch}
          filterValue={filterVal}
          onFilter={onFilter}
          ListCol={listCol}
          ListData={listdata}
          onChange={onTableChange}
          {...searchDropdowns}
          pagination={{
            total: listcount,
            current: page,
            pageSize: limit,
          }}
        />
      ) : (
        <>
          <div className="flexibleRow">
            {carddata.map((item, index) => (
                <Fragment key={index}>
                <div className='requestPanel'>
                    <MainStatusCard data={item} link={link} addon={addon || item[addonkey]} statusKey={statusKey} />
                </div>
              </Fragment>
            ))}
          </div>
          <div className="w-100 text-right mt-2">
            <Pagination pageSize={6} current={page} hideOnSinglePage={true} onChange={onPageChange} total={cardcount} />
          </div>
        </>
      )}
    </>
  );
};
