import React, { Fragment, useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import HeadingChip from '../../../molecules/HeadingChip';
import { useDispatch } from 'react-redux';
import { getEmployeeList } from './ducks/actions';
import {
  Teams,
  LeaveTypes,
  LeaveEntitlements,
  UserRoles,
  WorkingHours,
  JobPositions,
  EducationFields,
  Institutions,
  Nationalities,
  Holidays,
  Religions,
  Races,
  Projects,
  WarningLetter,
  LetterTemplate,
  Approvers,
  Assets,
  RequestForms,
  Departments,
} from './Components';

export default (props) => {
  const [activeID, setActiveID] = useState(null);
  const [tabComp, setTabComp] = useState(null);
  const dispatch = useDispatch();
  dispatch(getEmployeeList('Limkokwing University Creative Technology'));
  const data = [
    {
      tabTitle: 'Teams',
      comp: <Teams />,
      permission: true,
    },
    {
      tabTitle: 'Leave Types',
      comp: <LeaveTypes />,
      permission: true,
    },
    {
      tabTitle: 'Leave Entitlements',
      comp: <LeaveEntitlements />,
      permission: true,
    },
    {
      tabTitle: 'User Roles',
      comp: <UserRoles />,
      permission: true,
    },
    {
      tabTitle: 'Working Hours',
      comp: <WorkingHours />,
      permission: true,
    },
    {
      tabTitle: 'Job Positions',
      comp: <JobPositions />,
      permission: true,
    },
    {
      tabTitle: 'Education Fields',
      comp: <EducationFields />,
      permission: true,
    },
    {
      tabTitle: 'Institutions',
      comp: <Institutions />,
      permission: true,
    },
    {
      tabTitle: 'Nationalities',
      comp: <Nationalities />,
      permission: true,
    },
    {
      tabTitle: 'Holidays',
      comp: <Holidays />,
      permission: true,
    },
    {
      tabTitle: 'Religions',
      comp: <Religions />,
      permission: true,
    },
    {
      tabTitle: 'Races',
      comp: <Races />,
      permission: true,
    },
    {
      tabTitle: 'Projects',
      comp: <Projects />,
      permission: true,
    },
    {
      tabTitle: 'Warning Letter',
      comp: <WarningLetter />,
      permission: true,
    },
    {
      tabTitle: 'Letter Template',
      comp: <LetterTemplate />,
      permission: true,
    },
    {
      tabTitle: 'Approvers',
      comp: <Approvers />,
      permission: true,
    },
    {
      tabTitle: 'Assets',
      comp: <Assets />,
      permission: true,
    },
    {
      tabTitle: 'Request Forms',
      comp: <RequestForms setLoading={props.setLoading} />,
      permission: true,
    },
    {
      tabTitle: 'Departments',
      comp: <Departments />,
      permission: true,
    },
  ];

  const loadComp = (data, id) => {
    setTabComp(data?.comp);
    setActiveID(id);
  };

  return (
    <>
      <Row gutter={[20, 50]}>
        <Col span={24}>
          <Row gutter={[20, 30]}>
            <Col span={24}>
              <HeadingChip title="Setup" />
            </Col>
            {data && (
              <>
                {data?.map((resp, i) => (
                  <Fragment key={i}>
                    <Col span={6}>
                      <Card
                        className={activeID === i ? 'uni-card-small-active' : 'uni-card-small'}
                        bordered={false}
                        onClick={() => loadComp(resp, i)}
                      >
                        {resp?.tabTitle}
                      </Card>
                    </Col>
                  </Fragment>
                ))}
              </>
            )}
          </Row>
        </Col>
        <Col span={24}>{tabComp}</Col>
      </Row>
    </>
  );
};
