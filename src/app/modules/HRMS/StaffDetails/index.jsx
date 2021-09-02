import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Space, Button } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import UpdateSection from '../../../molecules/UpdateSection';
import { useHistory } from 'react-router-dom';
import { useTranslate } from 'Translate';
import { useDispatch, useSelector } from 'react-redux';
import { getComments, emptyComments } from '../../Application/ducks/actions';
import SideDetails from '../../../molecules/SideDetails';
import SideDetailResponsive from '../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../configs/constantData';
import { LeftOutlined } from '@ant-design/icons';
import ListCard from '../../../molecules/ListCard';
import { DownloadIcon } from '../../../atoms/CustomIcons';

const ListData = [
  {
    type: 'Letter of Appointment',
    description: '2018',
    applied: '16th January 2018',
    expiry: '16th January 2019',
  },
  {
    type: 'Letter of Appointment',
    description: '2018',
    applied: '16th January 2018',
    expiry: '16th January 2019',
  },
  {
    type: 'Letter of Appointment',
    description: '2018',
    applied: '16th January 2018',
    expiry: '16th January 2019',
  },
  {
    type: 'Letter of Appointment',
    description: '2018',
    applied: '16th January 2018',
    expiry: '16th January 2019',
  },
  {
    type: 'Letter of Appointment',
    description: '2018',
    applied: '16th January 2018',
    expiry: '16th January 2019',
  },
];

export default (props) => {
  const i18n = useTranslate();
  const { t } = i18n;
  const { section, id, data, onChangePos } = props;
  const [pos, setPos] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const commentsApi = useSelector((state) => state.global.comments);

  const ListCol = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      sorter: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
    },
    {
      title: 'Applied',
      dataIndex: 'applied',
      key: 'applied',
      sorter: true,
    },
    {
      title: 'Expiry',
      dataIndex: 'expiry',
      key: 'expiry',
      sorter: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: () => (
        <Button type="link" htmlType="button" className="p-0" icon={<DownloadIcon className="c-success" />} />
      ),
    },
  ];

  useEffect(() => {
    updateComment();
    return () => dispatch(emptyComments());
  }, []);

  const changePosition = (e) => {
    setPos(e.target.value);
  };

  useEffect(() => {
    if (data && data.position) {
      setPos(data.position[0]);
    }
  }, [data]);

  const sideData = [
    {
      type: 'image',
      url: `http://cms2dev.limkokwing.net${data?.image}`,
      size: 120,
      highlight: true,
    },
    {
      type: 'tag',
      title: 'Staff',
      noDivider: true,
      highlight: true,
    },
    {
      type: 'mainTitle',
      title: data?.employee_name,
      subtitle: data?.employee_id,
      highlight: true,
    },
    {
      type: 'single',
      title: data?.country,
      highlight: true,
      noLine: true,
    },
    {
      type: 'radios',
      title: 'Job Title',
      value: data?.position || '',
      current: pos,
      onChange: changePosition,
    },
    {
      type: 'titleValue',
      title: 'Company',
      value: data?.company || '',
    },
    {
      type: 'titleValue',
      title: 'Team',
      value: data?.team_name,
      //   noDivider: true,
    },
  ];

  const bottomList = [
    {
      title: 'Issue Warning Letter',
      type: 'button',
      class: 'black-btn',
      action: () => history.push('/task'),
    },
  ];

  const uploadDocs = () => {
    console.log('----');
  };

  const updateComment = () => {
    dispatch(getComments(section, id));
  };

  return (
    <Row gutter={[20, 30]}>
      <Col span={24}>
        <Space direction="vertical" size={20}>
          <Button type="link" className="c-gray-linkbtn p-0 mt-1" onClick={() => history.goBack()} htmlType="button">
            <LeftOutlined /> Back
          </Button>
          <HeadingChip title="Staff Details" />
        </Space>
      </Col>
      <Col span={24}>
        <div className="twocol-3070">
          <div className="side-detail">
            {isHDScreen ? (
              <SideDetails data={sideData} type="button" bottom={bottomList} />
            ) : (
              <SideDetailResponsive data={sideData} type="button" bottom={bottomList} />
            )}
          </div>
          <div className="side-form">
            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
              <Row gutter={[20, 20]}>
                <Col span={24}>{props.children}</Col>
                <Col span={24}>
                  <ListCard
                    scrolling={500}
                    title="Documents"
                    ListCol={ListCol}
                    ListData={ListData}
                    pagination={false}
                    extraBtn={'+ Upload Documents'}
                    extraAction={uploadDocs}
                  />
                </Col>
                <Col span={24}>
                  <UpdateSection data={commentsApi} code={id} module={'HRMS'} updateComment={updateComment} />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Col>
    </Row>
  );
};
