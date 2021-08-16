import React from 'react';
import { PageHeader, Typography, Button } from 'antd';

const { Title } = Typography;

export default (props) => {

    const { routes, title, subTitle, btnList } = props;

    return (
        <PageHeader
            className="site-page-header"
            title={<Title level={3} className='mb-0'>{title}</Title>}
            breadcrumb={routes ? routes : null }
            subTitle={subTitle ? subTitle : null}
            extra={btnList && btnList.map((item, index) => <React.Fragment key={index}><Button size='large' type="primary" icon={item?.icon ? item?.icon : null} onClick={item.action}>{item.text}</Button></React.Fragment>)}
        />
    )
} 