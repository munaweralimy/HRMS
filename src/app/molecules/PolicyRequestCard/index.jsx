import React, { Fragment } from 'react';
import { Card, Space, Typography, List, Avatar} from 'antd';
import FigureChips from '../../atoms/FigureChips';
import { Link } from 'react-router-dom';
import PolicyIcon from '../../../assets/img/policy-icon.svg';
import moment from 'moment';

const { Title, Text } = Typography;

export default (props) => {
    const {data, title, level, spacing} = props;

    return (
        <Card bordered={false} className="uni-card dashboard-card main-card-hover">
            <Space size={spacing ? spacing : 20} direction='vertical' className='w-100'>
                {title && <Title level={level ? level : 5} className='c-default mb-0' style={{textTransform:'capitalize'}}>{title}</Title>}
                <List
                    itemLayout="horizontal"
                    className={`icon-list`}
                    dataSource={data && data}
                    renderItem={item => (
                    <List.Item key={item.name} className='w-100'>
                        <Link
                        className='w-100'
                        to={item?.attachment && `http://cms2dev.limkokwing.net${item?.attachment}`}
                        >
                            <Space size={17} className='w-100'>
                                <Avatar size={40} src={PolicyIcon} />
                                <Space size={0} direction='vertical'>
                                    <Text className='titlename'>{item.policy_title}</Text>
                                    <Text className='c-gray'>{moment(item.date).format('LL')}</Text>
                                </Space>
                            </Space>
                        </Link>
                    </List.Item>
                    )}
                />
            </Space>
        </Card>
    )
}