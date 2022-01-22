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
import { allowed } from '../../../../routing/config/utils';
import Roles from '../../../../routing/config/Roles';
import { baseUrl } from '../../../../configs/constants';

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
  const { section, id, onChangePos } = props;
  const [pos, setPos] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });
  const commentsApi = useSelector((state) => state.global.comments);
  const data = useSelector((state) => state.advancement.advData);

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
      url: `${baseUrl}${data?.image}`,
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
      action: () =>
        history.push({
          pathname: `/employment/${id}`,
          state: { tab: '2', param: 'warn' },
        }),
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
        <Space direction="vertical" size={18}>
          <Button type="link" className="c-gray-linkbtn p-0" onClick={() => history.goBack()} htmlType="button">
            <LeftOutlined /> Back
          </Button>
          <HeadingChip title="Staff Details" />
        </Space>
      </Col>
      <Col span={24}>
        <div className="twocol-3070">
          <div className="side-detail">
            {isHDScreen ? (
              <SideDetails
                data={sideData}
                type="button"
                bottom={allowed([Roles.EMPLOYMENT], 'write') ? bottomList : null}
              />
            ) : (
              <SideDetailResponsive
                data={sideData}
                type="button"
                bottom={allowed([Roles.EMPLOYMENT], 'write') ? bottomList : null}
              />
            )}
          </div>
          <div className="side-form">
            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
              <Row gutter={[20, 20]}>
                <Col span={24}>
                  <Space direction="vertical" className="w-100"></Space>
                  {props.children}
                </Col>
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
                  <UpdateSection data={commentsApi} code={id} module={section} updateComment={updateComment} />
                </Col>
              </Row>
            </Card>
          </div>
        </div>
      </Col>
    </Row>
  );
};
