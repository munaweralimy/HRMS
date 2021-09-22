import React, { useState } from 'react';
import { Row, Col } from 'antd';
import WarningLetter from './WarningLetter';
import ContractList from './ContractList';

export default (props) => {

  const { mode, data, updateApi, id, setLoad } = props;

  const [visisble, setVisible] = useState({
    set1: true,
    set2: true,
    set3: true,
    set4: true,
  });

  return (
    <>
    <Row gutter={[20, 50]}>
      {visisble.set1 && <Col span={24}>
        <ContractList {...props} setVisible={setVisible} />
      </Col>}
      {/* {visisble.set2 && <Col span={24}>
        <Termination {...props} setVisible={setVisible} />
      </Col>}
      {visisble.set3 && <Col span={24}>
        <ShowCauseLetter {...props} setVisible={setVisible} />
      </Col>} */}
      {visisble.set4 && <Col span={24}>
        <WarningLetter {...props} setVisible={setVisible} />
      </Col>}
    </Row>
    {/* <Row gutter={[24, 30]} align="bottom">
      <Col span={24}>
        <Title level={4} className="mb-0">
          Contract Details
        </Title>
      </Col>
      {contractDetails.map((item, index) => (
        <Fragment key={index}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Employment Details
        </Title>
      </Col>
      {employmentDetails.map((item, index) => (
        <Fragment key={index}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
      <Col span={24}>
        <Title level={4} className="mb-0">
          Work Hours
        </Title>
      </Col>
      {workHours.map((item, index) => (
        <Fragment key={index}>
          {item?.subheader && (
            <Col span={24}>
              <Title level={5} className="mb-0 c-default">
                {item.subheader}
              </Title>
            </Col>
          )}
          {item.type == 'array' ? (
            <Col span={24}>
              {fields.map((elem, index) => {
                return (
                  <Row gutter={[20, 20]}>
                    {item.child.map((x, i) => (
                      <Fragment key={i}>
                        <FormGroup elem={elem} index={index} parent={item} item={x} control={control} errors={errors} />
                      </Fragment>
                    ))}
                  </Row>
                );
              })}
            </Col>
          ) : (
            ''
          )}
          <FormGroup item={item} control={control} errors={errors} />
        </Fragment>
      ))}
      {alternateSaturday.map((item, index) => (
        <Fragment key={index}>
          {item?.subheader ? (
            <Col span={24}>
              <Row gutter={24} justify="space-between">
                <Col span={12}>
                  <Title level={4} className="mb-0">
                    {item.subheader}
                  </Title>
                </Col>
                <Col span={3} offset={4}>
                  <FormGroup item={item} control={control} errors={errors} />
                </Col>
              </Row>
            </Col>
          ) : (
            <FormGroup item={item} control={control} errors={errors} />
          )}
        </Fragment>
      ))}
    </Row> */}
    </>
  );
};