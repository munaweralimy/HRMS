import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useTranslate } from 'Translate';
import ListCard from '../../../../molecules/ListCard';
import { useHistory } from 'react-router-dom';
import { getModules } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';

const filters = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Draft',
    value: 'draft',
  },
  {
    label: 'Archive',
    value: 'archive',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

export default (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const modulesApi = useSelector((state) => state.modules.moduleList);
  const [modules, setModules] = useState([]);
  const [filterVal, setFilterVal] = useState(filters[0].value);
  const i18n = useTranslate();
  const { t } = i18n;

  const addNew = () => history.push('modules/addnew');

  const btnList = [
    {
      text: '+ New Module',
      action: () => addNew(),
    },
  ];

  useEffect(() => {
    if (modulesApi.length > 0) {
      let data = [];
      modulesApi.map((item) => {
        data.push({
          code: item.module_code,
          module: item.module_name,
          expired: item.expired,
          expiring: item.expiring,
          status: item.status,
        });
      });
      setModules(data);
    } else {
      setModules(Object.assign([]));
    }
  }, [modulesApi]);

  const ListCol = [
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      sorter: (a, b) => a.code.length - b.code.length,
      width: 90,
    },
    {
      title: 'Module Name',
      dataIndex: 'module',
      key: 'module',
      sorter: (a, b) => a.module.length - b.module.length,
      ellipsis: true,
      width: 280,
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => history.push(`/aqa/modules/edit/${record.code}`)}>
          {text}
        </Button>
      ),
    },
    {
      title: 'Expiring Programmes',
      dataIndex: 'expiring',
      key: 'expiring',
      sorter: (a, b) => a.expiring - b.expiring,
      align: 'center',
      render: (text) => (Number(text) > 0 ? <span className="c-pending">{text}</span> : text),
    },
    {
      title: 'Expired Programmes',
      dataIndex: 'expired',
      key: 'expired',
      align: 'center',
      sorter: (a, b) => a.expired - b.expired,
      render: (text) => (Number(text) > 0 ? <span className="c-error">{text}</span> : text),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text) => {
        let clname = '';
        if (text == 'Active') {
          clname = 'c-success';
        } else if (text == 'Inactive') {
          clname = 'c-error';
        } else if (text == 'Draft') {
          clname = 'c-pending';
        }
        return <span className={`SentanceCase ${clname}`}>{text}</span>;
      },
    },
  ];

  const onSearch = (value) => {
    console.log('check values', value);
  };

  useEffect(() => {
    dispatch(getModules(filterVal));
  }, [filterVal]);

  const onFilter = (e) => {
    setFilterVal(e.target.value);
  };

  return (
    <Row gutter={[30, 24]}>
      <Col span={24}>
        <HeadingChip title={t('AQA.Module.title1')} btnList={btnList} />
      </Col>
      <Col span={24}>
        <ListCard
          Search={Search}
          onSearch={onSearch}
          filters={filters}
          filterValue={filterVal}
          onFilter={onFilter}
          ListCol={ListCol}
          ListData={modules}
          pagination={true}
        />
      </Col>
    </Row>
  );
};
