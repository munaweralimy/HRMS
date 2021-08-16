import React from 'react';
import { Card, Typography} from 'antd';
const { Title } = Typography;
import moment from 'moment';
export default (props) => {
    const {outStanding} = props;
    return (
        <>
            {outStanding && (
                <Card bordered={false} className="figures-card b-error">
                    <Title level={4} className='mb-0'>{`${outStanding[0]?.total_students} Students`}</Title>
                    <Title level={2} className='mb-0 mt-0'>{`RM ${outStanding[0]?.total_amount}`}</Title>
                    <Title level={4} className='mb-0  mt-0'>{`Due: ${moment(outStanding[0]?.due_date).format('LL')}`}</Title>
                </Card>
            )}
        </>
    )
}