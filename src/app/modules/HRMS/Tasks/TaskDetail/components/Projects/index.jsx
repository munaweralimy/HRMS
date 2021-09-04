import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Tag, Card, Typography } from 'antd';
import { SelectField } from '../../../../../../atoms/FormElement';
import { CloseCircleFilled } from '@ant-design/icons';
import { useFieldArray } from 'react-hook-form';

const { Title } = Typography;

const initQ = {
  project: '',
}

export default (props) => {

  const { tags, setTags, deleted, setDeleted, control, errors, data, title, btnTitle } = props;
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: `form_projects`,
  });

  const onAdd = () => {
    append(initQ)
  }

  // const onAdd = () => {
  //   if (selected) {
  //     let temp = [];
  //     temp = [...options];
  //     const newtags = [...tags];
  //     let check = newtags.findIndex((z) => z.name == selected.value);
  //     if (check == -1) {
  //       let a = options.findIndex((y) => y.value == selected.value);
  //       if (a) {
  //         setOptions(temp);
  //       }

  //       let obj = {};
  //       obj['project'] = selected.value;
  //       obj['name'] = selected.label;
  //       newtags.push(obj);
  //       setSelected('');
  //       setTags(newtags);
  //     } else {
  //       message.error('Already Exist');
  //     }
  //   }
  // };

  const onRemove = (e) => {
    let delProg = [];
    delProg = [...deleted];
    delProg.push({
      name: e.name,
    });
    setDeleted(delProg);
    const current = tags.filter((tag) => tag.project !== e.project);
    if (current) {
      setTags(current);
    }
  };


  return (
    <Row gutter={[20, 30]}>
      {title && <Col span={24}><Title level={4} className='mb-0 c-default'>{title}</Title></Col>}
      <Col span={24}>
        <Row gutter={[20,20]}>
          <Col span={24}>
            <Row gutter={[20,20]}>
            {tags.map((tag, index) => (
              <Col span={24} key={index}>
                <Tag
                  closable
                  closeIcon={<CloseCircleFilled />}
                  className="program-list"
                  key={tag.name}
                  onClose={() => onRemove(tag)}
                >
                  <Card bordered={false} className="transparent-card">
                    <Row gutter={20} align="middle">
                      <Col flex="auto">
                        <span className="p-name w-100">
                          <span className="p-detail">{tag.project}</span>
                        </span>
                      </Col>
                    </Row>
                  </Card>
                </Tag>
              </Col>
              ))}
            </Row>
          </Col>
          {fields.map((item,index) => (
          <Col span={24} key={item.id}>
            <Row gutter={20} wrap={false}>
              <Col flex="auto">
                <SelectField
                fieldname={`form_projects[${index}.project`}
                label=''
                class='mb-0'
                initValue={''}
                control={control}
                selectOption={data}
                />
              </Col>
              <Col flex="40px">
                  <Button type='link' size="large" className='cross-iconbtn' htmlType='button' icon={<CloseCircleFilled />} onClick={() => remove(index)} />
              </Col>
            </Row>
          </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
          <Button htmlType='button'type="dashed" size='large' className='w-100' onClick={onAdd}>{btnTitle}</Button>
      </Col>
      <Col span={24}>
        <Row gutter={20} justify="end">
          <Col>
            <Button size="large" type="primary" htmlType="submit" className="green-btn">
              Save Changes
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};
