import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Typography, Collapse, Button, Descriptions, Space, Card } from 'antd';
import { useFieldArray } from 'react-hook-form';
import { CheckCircleFilled } from '@ant-design/icons';
import { TextAreaField } from '../../../../../../../atoms/FormElement';

const { Panel } = Collapse;
const { Title } = Typography;
const _ = require('lodash');

const initQ = {
  department: 'Faculty Department121212',
  structure_name: 'Year 1 - Semester 1',
};

export default (props) => {
  const { control, t } = props;
  const [panelActive, setPanelActive] = useState(['1']);
  const [rejection, setRejection] = useState(false);
  const { fields, append } = useFieldArray({
    control,
    name: 'archive_request',
  });

  useEffect(() => {
    append(initQ);
  }, []);

  const callback = (key) => {
    setPanelActive(key);
  };

  const semesterHeader = (department, heading, index) => (
    <Row gutter={20}>
      <Col flex="auto">
        <Space>
          asasas
          <Row>
            <Col span={24} className="c-default">
              {department}
            </Col>
            {heading}
          </Row>
        </Space>
      </Col>
      <Col flex="180px">
        <Button type="link" className="c-white">
          View Details
        </Button>
      </Col>
    </Row>
  );

  return (
    <Row gutter={[20, 30]} align="bottom">
      <Col span={24}>
        <Collapse
          activeKey={panelActive}
          accordion={true}
          onChange={callback}
          className="black-card"
          expandIconPosition="right"
          bordered={false}
        >
          {fields.map((item, index) => (
            <Fragment key={item.id}>
              <Panel forceRender={true} header={semesterHeader(item.department, item.structure_name, index)}>
                <Row align="bottom" className="delayedApplication">
                  <Descriptions>
                    <Descriptions.Item span={24} label="Department">
                      Faculty (FABE)
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Date">
                      2nd March 2021
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Student">
                      Janice Matthews
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Student ID">
                      0019224
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Requester">
                      Prof. Justin Pearson
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Programme">
                      Bachelor of Arts (Hons) in Industrial Design
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Intake">
                      April 2014
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Term">
                      2015-07
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Module">
                      FIT3024 Mathematics II
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Reason">
                      Lack of semester's credit
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Faculty">
                      <Space>
                        Applied <CheckCircleFilled style={{ fontSize: '20px' }} />
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item span={24} label="Registry">
                      <Space>
                        Verified <CheckCircleFilled style={{ fontSize: '20px' }} />
                      </Space>
                    </Descriptions.Item>
                  </Descriptions>
                </Row>
                <Row gutter={20}>
                  <Col span={12}>
                    <Button size="large" type="primary" htmlType="submit" className="w-100 green-btn">
                      Approve
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      onClick={() => setRejection(true)}
                      className="w-100 red-btn"
                    >
                      Reject
                    </Button>
                  </Col>
                </Row>
              </Panel>
            </Fragment>
          ))}
        </Collapse>
      </Col>
    </Row>
  );
};
