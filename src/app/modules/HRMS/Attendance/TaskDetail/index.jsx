import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Typography, message } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import UpdateSection from '../../../../molecules/UpdateSection';
import { useHistory, useLocation } from 'react-router-dom';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import { apiMethod, apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import DeletePopup from '../../../../molecules/DeletePopup';
import { Popup } from '../../../../atoms/Popup';
import { getComments, emptyComments } from '../../../Application/ducks/actions';
import { DownloadIcon } from '../../../../atoms/CustomIcons';
import SideDetails from '../../../../molecules/SideDetails';
import ListCard from '../../../../molecules/ListCard';
import { useParams } from 'react-router-dom';
import TaskDetailTabs from './components/TaskDetailTabs';
import {getSingleTaskDetail} from '../ducks/actions';

const { Title, Text } = Typography;


const ListCol = [
  {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      sorter: (a, b) => a.Type.length - b.Type.length,
  },
  {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
      sorter: (a, b) => a.Description.length - b.Description.length,
  },
  {
      title: 'Applied',
      dataIndex: 'Applied',
      key: 'Applied',
      sorter: (a, b) => a.Applied - b.Applied,
  },
  {
      title: 'Expiry',
      dataIndex: 'Expiry',
      key: 'Expiry',
      sorter: (a, b) => a.Expiry - b.Expiry,
  },
  {
    title: 'Action',
    dataIndex: 'Action',
    key: 'Action',
    align: 'center',
    render: (text) => {
      return <DownloadIcon />;
    },
  },
]

const ListData = [
  {
    Type: 'Letter of Appointment',
    Description: '2018',
    Applied: '16th January 2018',
    Expiry: '16th January 2019',
    Action: 'Download'
  },
  {
    Type: 'Letter of Appointment',
    Description: '2018',
    Applied: '16th January 2018',
    Expiry: '16th January 2019',
    Action: 'Download'
  },
  {
    Type: 'Letter of Appointment',
    Description: '2018',
    Applied: '16th January 2018',
    Expiry: '16th January 2019',
    Action: 'Download'
  },
  {
    Type: 'Letter of Appointment',
    Description: '2018',
    Applied: '16th January 2018',
    Expiry: '16th January 2019',
    Action: 'Download'
  },
  {
    Type: 'Letter of Appointment',
    Description: '2018',
    Applied: '16th January 2018',
    Expiry: '16th January 2019',
    Action: 'Download'
  },
];

export default (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const programApi = useSelector((state) => state.programme.program);
  const commentsApi = useSelector((state) => state.global.comments);
  const singleTaskDetail = useSelector((state) => state.tasks.singleTaskData);

  const i18n = useTranslate();
  const { t } = i18n;

  useEffect(() => {
    dispatch(getSingleTaskDetail(id));
  }, []);

  const sideData = [
    {
      type: 'code',
      text: programApi[0]?.licenses[0]?.faculty,
      subtitle: programApi[0]?.licenses[0]?.faculty_name,
      level2: 4,
    },
    {
      type: 'mainTitle',
      title: programApi[0]?.licenses[0]?.program_name,
      subtitle: programApi[0]?.licenses[0]?.program_code,
      level: 4,
    },
    {
      type: 'single',
      title: 'Version',
      level: 4,
    },
    {
      type: 'titleValue',
      title: 'Credits',
      space: 10,
      level: 4,
      value: `${
        programApi[0]?.left_card_array[0]?.total_credits
          ? programApi[0]?.left_card_array[0]?.total_credits + ' Credits'
          : ''
      }`,
    },
    {
      type: 'titleValue',
      level: 4,
      space: 10,
      title: 'Semester Fee',
      value: programApi[0]?.left_card_array[0]?.total_semester_fees,
    },
    {
      type: 'titleValue',
      title: 'Resource Fee',
      level: 4,
      space: 10,
      value: programApi[0]?.left_card_array[0]?.total_resource_fees,
      noDivider: true,
    },
  ];

  const bottomList = [
    {
      title: 'Delete Programme',
      type: 'button',
      class: 'black-btn',
      action: () => setVisible(true),
    },
  ];

  const popup = {
    closable: false,
    visibility: visible,
    class: 'black-modal',
    content: <DeletePopup title="Programme" onClose={() => setVisible(false)} onDelete={() => onDelete()} />,
    width: 536,
    onCancel: () => setVisible(false),
  };

  const onDelete = async () => {
    let url = `${apiMethod}/aqa.api.delete_add_program?program_code=${programApi[0].licenses[0]?.program_code}`;
    try {
      await axios.post(url);
      message.success('Programme Successfully Deleted');
      setVisible(false);
      setTimeout(() => history.push('/aqa/programme'), 1000);
    } catch (e) {
      const { response } = e;
      message.error(response.data.result);
    }
  };

  const updateComment = () => {
    dispatch(getComments('Program Licensing', `PL-${id}`));
  };

  return (
    <>
      <Row gutter={[20, 30]}>
        <Col span={24}>
          <HeadingChip title="Staff Details" />
        </Col>
        <Col span={8}>
          <SideDetails data={sideData} type="button" bottom={bottomList} />
        </Col>
        <Col span={16}>
          <Card bordered={false} className="scrolling-card">
            <Row gutter={[20, 20]}>
              <Col span={24}>
                <TaskDetailTabs data={singleTaskDetail} t={t} />
              </Col>
              <Col span={24}>
                <ListCard title="Documents" ListCol={ListCol} ListData={ListData} pagination={false} />
              </Col>
              <Col span={24}>
                <UpdateSection
                  data={commentsApi}
                  code={programApi[0]?.licenses[0]?.name}
                  module={'HRMS'}
                  updateComment={updateComment}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Popup {...popup} />
    </>
  );
};
