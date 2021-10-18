import React, { Fragment } from 'react';
import { Card, Space, Typography, List, Avatar} from 'antd';
import FigureChips from '../../atoms/FigureChips';
import { Link } from 'react-router-dom';


const { Title, Text } = Typography;

export default (props) => {

    const {data, title, count, link, label, status, innerlink, level, spacing, reverse} = props;
    const countStatus = {
        value: count,
        title: <span style={{textTransform:'capitalize'}}>{label + ' Issues'}</span>,
        status: status
    }

    // console.log('data', data)


    return (
        <Card bordered={false} className={`uni-card dashboard-card main-card-hover ${status ? '' : 'no-listspace'}`}>
            <Space size={spacing ? spacing : 20} direction='vertical' className='w-100'>
                {title && <Title level={level ? level : 5} className='c-default mb-0' style={{textTransform:'capitalize'}}>{title}</Title>}
                {label && <FigureChips data={countStatus} link={link} />}
                <List
                    itemLayout="horizontal"
                    className={`icon-list ${!label ? 'withoutFigure' : ''}`}
                    dataSource={data && data}
                    renderItem={item => (
                    <List.Item key={item.employee_id} className='w-100'>
                        <Link
                        className='w-100'
                        to={innerlink != '' && '/' + innerlink + '/' + item.employee_id}
                        >
                            <Space size={17} className='w-100'>
                                <Avatar size={40} src={item?.image && `http://cms2dev.limkokwing.net${item?.image}`} />
                                <Space size={0} direction='vertical'>
                                    {reverse ? 
                                    <>
                                    <Text className='titlename'>{item.employee_id}</Text>
                                    <Text className='c-gray'>{item.employee_name}</Text>
                                    </>
                                    :
                                    <>
                                        <Text className='c-gray'>{item.employee_id}</Text>
                                        <Text className='titlename'>{item.employee_name}</Text>
                                    </>
                                    }
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