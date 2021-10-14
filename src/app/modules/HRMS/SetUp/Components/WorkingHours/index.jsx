import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, message, Pagination, Button } from 'antd';
import HeadingChip from '../../../../../molecules/HeadingChip';
import { Popup } from '../../../../../atoms/Popup';
import ListCard from '../../../../../molecules/ListCard';
import AddEditWorkingHour from './Components/AddEditWorkingHour';
import Search from './Components/Search';
import { CloseCircleFilled } from '@ant-design/icons';
import { getWorkingHoursList } from '../../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../../configs/constants';
import axios from '../../../../../../services/axiosInterceptor';
import ListformComp from '../';
const custom = [
  {
    day: 'Monday',
    work_hour_type: 'Full Day',
    time_hour: 1,
    time_min: 0,
    time_type: '',
    work_hours: 8,
  },
  {
    day: 'Tuesday',
    work_hour_type: 'Full Day',
    time_hour: 1,
    time_min: 0,
    time_type: '',
    work_hours: 8,
  },
  {
    day: 'Wednesday',
    work_hour_type: 'Full Day',
    time_hour: 1,
    time_min: 0,
    time_type: '',
    work_hours: 8,
  },
  {
    day: 'Thursday',
    work_hour_type: 'Full Day',
    time_hour: 1,
    time_min: 0,
    time_type: '',
    work_hours: 8,
  },
  {
    day: 'Friday',
    work_hour_type: 'Full Day',
    time_hour: 1,
    time_min: 0,
    time_type: '',
    work_hours: 8,
  },
  {
    day: 'Saturday',
    work_hour_type: 'Half Day',
    time_hour: 1,
    time_min: 0,
    time_type: '',
    work_hours: 4,
  },
  {
    day: 'Sunday',
    work_hour_type: 'Rest Day',
    time_hour: 1,
    time_min: 0,
    time_type: '',
    work_hours: 0,
  },
];

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [workingHourFields, setWorkingHourFields] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const workingHoursListData = useSelector((state) => state.setup.workingHoursListData);

  useEffect(() => {
    if (!visible) {
      dispatch(getWorkingHoursList(page, limit, '', ''));
    }
  }, [visible]);

  const ListCol = [
    {
      title: 'Template Name',
      dataIndex: 'template_name',
      key: 'template_name',
      sorter: true,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      sorter: true,
    },
    {
      title: 'Users',
      dataIndex: 'users',
      key: 'users',
      sorter: true,
    },

    {
      title: 'Action',
      dataIndex: 'Action',
      key: 'Action',
      align: 'center',
      render: (text, record) => (
        <Button type="link" className="list-links" onClick={() => deleteRecord(record)}>
          <CloseCircleFilled />
        </Button>
      ),
    },
  ];

  const workig_fields = [
    {
      subheader: 'Work Hours',
      type: 'select',
      name: 'work_hour_template',
      label: 'Template',
      placeholder: 'Please Select',
      twocol: false,
      colWidth: '1 0 100%',
      options: templateList,
      req: true,
      reqmessage: 'Please select',
      onChange: onWHChnage,
    },
    {
      type: 'array',
      name: 'work_hour_template_detail',
      twocol: false,
      colWidth: '1 0 100%',
      field: fields,
      gap: [10, 10],
      single: false,
      noCard: true,
      child: [
        {
          type: 'input',
          name: 'day',
          label: '',
          static: true,
          req: false,
          twocol: false,
          colWidth: '1 0 100px',
        },
        {
          type: 'select',
          name: 'work_hour_type',
          label: '',
          placeholder: 'Please Select',
          options: workType,
          req: true,
          twocol: false,
          colWidth: '1 0 100px',
        },
        {
          type: 'input',
          name: 'time_hour',
          label: '',
          req: true,
          number: true,
          min: 1,
          max: 12,
          arrow: false,
          twocol: false,
          colWidth: '0 1 70px',
        },
        {
          type: 'input',
          name: 'time_min',
          label: '',
          number: true,
          arrow: false,
          req: true,
          min: 0,
          max: 59,
          twocol: false,
          colWidth: '0 1 70px',
        },
        {
          type: 'select',
          name: 'time_type',
          label: '',
          placeholder: 'Select',
          options: timelap,
          req: true,
          twocol: false,
          colWidth: '0 1 100px',
        },
        {
          type: 'input',
          name: 'work_hours',
          label: '',
          req: true,
          number: true,
          arrow: false,
          min: 0,
          max: 24,
          placeholder: 'Please state',
          twocol: false,
          colWidth: '1 0 70px',
        },
      ],
    },
  ];
  const btnList = [
    {
      text: '+ New Working Hours',
      classes: 'green-btn',
      action: () => {
        setWorkingHourFields({ name: '', template_name: '' });
        setVisible(true);
      },
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    content: (
      <AddEditWorkingHour
        workingHourTemp={workingHourFields}
        title="Add New Working Hours"
        onClose={() => setVisible(false)}
      />
    ),
    width: 1199,
    onCancel: () => setVisible(false),
  };

  const onClickRow = (record) => {
    return {
      onClick: () => {
        setWorkingHourFields(record);
        setVisible(true);
      },
    };
  };
  const onSearch = (value) => {
    console.log('check values', value);
  };

  const onTableChange = (pagination, filters, sorter) => {
    console.log('heloo', pagination);
    setPage(pagination.current);
    setLimit(pagination.pageSize);
    if (sorter.order) {
      dispatch(getWorkingHoursList(pagination.current, pagination.pageSize, sorter.order, sorter.columnKey));
    } else {
      dispatch(getWorkingHoursList(pagination.current, pagination.pageSize, '', ''));
    }
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Working Hours" btnList={btnList} />
        </Col>
        <Col span={24}>
          <ListCard
            onRow={onClickRow}
            Search={Search}
            onSearch={onSearch}
            ListCol={ListCol}
            ListData={workingHoursListData?.rows}
            pagination={{
              total: workingHoursListData?.count,
              current: page,
              pageSize: limit,
            }}
            onChange={onTableChange}
          />
        </Col>
      </Row>
      <Popup {...popup} />
    </>
  );
};
