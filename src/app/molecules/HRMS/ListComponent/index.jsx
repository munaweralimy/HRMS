import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router';
import ListCard from '../../ListCard';

export default (props) => {

    const history = useHistory();
    const {link, linkKey, data, ListCol, defaultLimit,updateList, parentUpdate, setParentUpdate, Search, onSearch, listProps} = props;
    const [page, setPage]= useState(1);
    const [limit, setLimit]= useState(defaultLimit);

    useEffect(() => {
        console.log('run check')
        if (parentUpdate == true) {
            setPage(1);
            setParentUpdate(false);
        }
    }, [parentUpdate]);

    const onClickRow = (record) => {
        return {
            onClick: () => {
            history.push(`${link}${record[linkKey]}`)
            },
        };
    };
    
      const onTableChange = (pagination, filters, sorter) => {
        setPage(pagination.current);
        setLimit(pagination.pageSize);
        if (sorter.order) {
          updateList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey);
        } else {
            updateList(pagination.current, pagination.pageSize, '', '');
        }
      }

    return (
        <ListCard 
          {...listProps}
          classes='clickRow'
          onRow={onClickRow}
          Search={Search}
          onSearch={onSearch}
          ListData={data?.rows}
          ListCol={ListCol}
          onChange={onTableChange}
          pagination={{
            total: data?.count,
            current: page,
            pageSize: limit
          }}
        />
    )
}