import React, {useState, useEffect} from 'react';
import { Row, Col, Tabs, Typography, Breadcrumb } from 'antd';
import StudentStepCard from '../../../../atoms/StudentStepCard';
import { studentsStatus } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';

const { TabPane } = Tabs;
const { Title, Text } = Typography;

export default (props) => {
    const dispatch = useDispatch()
    const callback = (e) => {}
    const pendingList = useSelector(state => state.students.pendingList);
    const [requests, setRequests] = useState([])
    

    useEffect(() => {
        dispatch(studentsStatus())
    }, [])

    useEffect(() => {
        if(pendingList.length > 0) {
            if (pendingList[0]?.pending_offer_letter && pendingList[0]?.pending_offer_letter.length > 0) {
                setRequests(pendingList[0].pending_offer_letter[0].visa_students[0]);
            }
        }
    }, [pendingList]);

    return (
        <>
            <Breadcrumb separator=">" className='mb-1'>
                    <Breadcrumb.Item href="/registry/students">Students</Breadcrumb.Item>
                    <Breadcrumb.Item>Pending Offer Letter Release</Breadcrumb.Item>
            </Breadcrumb>
            <Tabs defaultActiveKey="1" type='card' className='tab-bold' onChange={callback}>
                <TabPane tab="Pending Offer Letter Release" key="1" forceRender={true}>
                    <div className='flexibleRow'>
                        {requests?.map((item, index) => (
                            <div className='requestPanel' key={index}>
                                <StudentStepCard data={item} stage={2} link={`/registry/offerletter/${item.name}`} type='app' />
                            </div>
                        ))}
                    </div>
                </TabPane>
                <TabPane tab="Archives" key="2" forceRender={true}>
                    <div className='flexibleRow'>
                        {requests.map((item, index) => (
                            <div className='requestPanel' key={index}>
                                <StudentStepCard data={item} stage={2} link={`/registry/offerletter/${item.name}`} type='app' />
                            </div>
                        ))}
                    </div>
                </TabPane>
            </Tabs>
        </>
    )   
}