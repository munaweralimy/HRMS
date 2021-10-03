import React from 'react';
import { Col, Typography, Space, Avatar, Divider, Tag, Radio, Tooltip } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../configs/constantData';
import { baseUrl } from '../../../configs/constants';

const { Title, Text } = Typography;

export default (props) => {

    const { item } = props;
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    return (
        <>
        {item.type == 'image' && (
            <Col span={24} align='center'>
              <Avatar size={isHDScreen ? item.size : 85} src={item.url} className="mb-10PX" />
            </Col>
          )}
          {item.type == 'simpletext' && 
            <Col span={24} align='center'>
              <Text className='c-gray'>{item.title}</Text>
            </Col>
          }

          {item.type == 'users' && (
            <Col span={24}>
              <Avatar.Group
                size={isHDScreen ? item.size : 50}
                className='member-icon'
                maxCount={item?.count}
                maxStyle={{ color: '#BEBEBE', backgroundColor: '#0E0E0E' }}
              >
                {item?.value.map((x,i) => (
                  <Avatar size={isHDScreen ? item.size : 50} src={x.image ? `${baseUrl}${x.image}` : ''} />
                ))}
              </Avatar.Group>
            </Col>
          )}

          {item.type == 'code' && (
            <>
              <Col span={24} className="text-center">
                <Space size={20} direction="vertical" align="center" className="w-100">
                  <Tag className={`tag-code ${!isHDScreen ? 'b-gray': ''}`}>{item.text}</Tag>
                  {item.title && (
                    <Title level={isHDScreen ? 3 : 4} className="mb-0 c-default">
                      {item.title}
                    </Title>
                  )}
                  {item.subtitle && (
                    <Title level={item.level2 ? item.level2 : 5} className={`c-gray mb-0`}>
                      {item.subtitle}
                    </Title>
                  )}
                </Space>
              </Col>
              {!item?.noDivider && (
                <>
                {isHDScreen ? 
                <Col span={24}>
                  <Divider className="m-0" />
                </Col>
                :
                !item.noLine ? 
                  <Col span={24}>
                    <Divider className="m-0" />
                  </Col>
                  :
                  ''} 
                </>
              )}
            </>
          )}

          {item.type == 'tag' && (
            <>
              <Col span={24} className="text-center">
                <Space size={30} direction="vertical" align="center" className="w-100">
                  <Text className="module-tag c-gray w-auto">{item.title}</Text>
                  {item.subChild && (
                    <Space direction="vertical" size={10}>
                      {item.subChildText && <Text className="c-gray">{item.subChildText}</Text>}
                      {item.subChildTitle && (
                        <Title level={isHDScreen ? 3 : 4} className="mb-0 c-default">
                          {item.subChildTitle}
                        </Title>
                      )}
                    </Space>
                  )}
                </Space>
              </Col>
              {!item?.noDivider && (
                <>
                {isHDScreen ? 
                <Col span={24}>
                  <Divider className="m-0" />
                </Col>
                :
                !item.noLine ? 
                  <Col span={24}>
                    <Divider className="m-0" />
                  </Col>
                  :
                  ''} 
                </>
              )}
            </>
          )}

          {item.type == 'mainTitle' && (
            <>
              <Col span={24}>
                <Space size={0} direction="vertical" align="center" className="w-100">
                  <Title level={isHDScreen ? 3 : 4} className="mb-0 c-default">
                    {item.title}
                  </Title>
                  <Title level={item.level ? item.level : 5} className={`c-gray mb-0 ${!isHDScreen ? 'smallFont12' : ''}`}>
                    {item.subtitle}
                  </Title>
                </Space>
              </Col>
              {!item?.noDivider && (
                <>
                {isHDScreen ? 
                <Col span={24}>
                  <Divider className="m-0" />
                </Col>
                :
                !item.noLine ? 
                  <Col span={24}>
                    <Divider className="m-0" />
                  </Col>
                  :
                  ''} 
                </>
              )}
            </>
          )}

          {item.type == 'single' && (
            <>
              <Col span={24}>
                <Title level={item.level ? item.level : 5} className={`${item.highlight ? 'text-center' : ''} c-default mb-0`}>{`${item.title}${
                  item.value ? ` ${item.value}` : ''
                }`}</Title>
              </Col>
              {!item?.noDivider && (
                <>
                {isHDScreen ? 
                <Col span={24}>
                  <Divider className="m-0" />
                </Col>
                :
                !item.noLine ? 
                  <Col span={24}>
                    <Divider className="m-0" />
                  </Col>
                  :
                  ''} 
                </>
              )}
            </>
          )}

          {item.type == 'titleValue' && (
            <>
              <Col span={24}>
                <Space
                  size={item.space ? item.space : 0}
                  direction="vertical"
                  align={isHDScreen ? 'center' : item.highlight ? 'center' : 'start'}
                  className="w-100"
                >
                  <Text className={`c-gray ${!isHDScreen ? 'smallFont12' : ''}`}>{item.title}</Text>
                  <Title level={item.level ? item.level : 5} className={`mb-0 c-default ${isHDScreen ? 'font-500' : ''}`}>
                    {Array.isArray(item.value) ? (item.value).join(', ') : item.value}
                  </Title>
                </Space>
              </Col>
              {!item?.noDivider && (
                <>
                {isHDScreen ? 
                <Col span={24}>
                  <Divider className="m-0" />
                </Col>
                :
                !item.noLine ? 
                  <Col span={24}>
                    <Divider className="m-0" />
                  </Col>
                  :
                  ''} 
                </>
              )}
            </>
          )}
          {item.type == 'reversetitleValue' && (
            <>
              <Col span={24}>
                <Space
                  size={item.space ? item.space : 0}
                  direction="vertical"
                  align={isHDScreen ? 'center' : item.highlight ? 'center' : 'start'}
                  className="w-100"
                >
                  <Title level={item.level1 ? item.level1 : 5} className="c-default mb-0">
                    {item.value}
                  </Title>
                  <Title level={item.level2 ? item.level2 : 5} className={`${isHDScreen ? 'font-500' : '' }mb-0 c-default `}>
                    {item.title}
                  </Title>
                </Space>
              </Col>
              {!item?.noDivider && (
                <>
                {isHDScreen ? 
                <Col span={24}>
                  <Divider className="m-0" />
                </Col>
                :
                !item.noLine ? 
                  <Col span={24}>
                    <Divider className="m-0" />
                  </Col>
                  :
                  ''} 
                </>
              )}
            </>
          )}
          {item.type == 'radios' && (
          <>
          <Col span={24}>
            <Radio.Group
              size="large"
              className="radio-options"
              buttonStyle="solid"
              options={item?.value && item?.value.map(x => ({label: x, value: x}))}
              onChange={item.onChange}
              value={item.current}
              optionType="button"
            />
            </Col>
            {!item?.noDivider && (
                <>
                {isHDScreen ? 
                <Col span={24}>
                  <Divider className="m-0" />
                </Col>
                :
                !item.noLine ? 
                  <Col span={24}>
                    <Divider className="m-0" />
                  </Col>
                  :
                  ''} 
                </>
              )}
          </>)}
        </>
    )
}