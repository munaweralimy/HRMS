import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import PlaceHolderImage from '../../../../../assets/img/faculty.png';
import Information from './Information';
import { getInstitution } from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const inst_code = useSelector(state => state.faculty.institutions);
    const { control, errors, handleSubmit, reset } = useForm();
    const [ tags, setTags ] = useState([])
    const [status, setStatus] = useState('Draft');
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const i18n = useTranslate();
    const { t } = i18n;

    const sideData = {
        image: PlaceHolderImage,
        text: "Please fill up the details on the right. Once finished, click 'Save Draft' or 'Add Faculty' to proceed."
    }

    const bottomList = [
        {
            title: 'Save Draft',
            type: 'submit',
            class: 'black-btn',
        },
        {
            title: 'Add Faculty',
            type: 'submit',
            class: 'green-btn',
        }
    ]

    useEffect(() => {
        dispatch(getInstitution())
    }, []);

    const onFinish = async (val) => {

        props.setLoading(true);
        let body = {
            name: val.code,
            institution_code: inst_code[0].name,
            faculty_name: val.name,
            faculty_code: val.code,
            status: status,
            doctype: "Institution Faculty",
            programms: tags
        }

        const url = `${apiresource}/Institution Faculty`;
        try {
            await axios.post(url, body);
            message.success('Faculty Successfully Created');
            props.setLoading(false);
            reset();
            setTags(Object.assign([]));
            setTimeout(() => history.push('/aqa/faculty'), 1000);
        } catch (e) {
            const {response} = e;
            props.setLoading(false);
            message.error('Something went wrong'); 
        }
    }

    return (
        <Form 
        layout="vertical" 
        scrollToFirstError={true}
        onFinish={handleSubmit(onFinish)}
        >
            <Breadcrumb separator=">" className='mb-1'>
                <Breadcrumb.Item href="/aqa/faculty">Faculty</Breadcrumb.Item>
                <Breadcrumb.Item>Faculty Details</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[20, 30]}>
                <Col span={24}>
                    <HeadingChip title={t('AQA.Faculty.title2')}  />
                </Col>
                <Col span={24}>
                    <div className='twocol-3070'>
                        <div className='side-detail'>
                            {isHDScreen ?
                            <SideDetails data={sideData} cardType='empty' type="button" bottom={bottomList} />
                            :
                            <SideDetailResponsive data={sideData} cardType='empty' type='button' bottom={bottomList} />
                            }
                        </div>
                        <div className='side-form'>
                            <Card bordered={false} className={`transparent-card ${isHDScreen ? 'scrolling-card' : ''}`}>
                            <Information 
                            control={control} 
                            errors={errors}
                            tags={tags}
                            setTags={setTags}
                            mode='add'
                            t={t}
                            />
                            </Card>
                        </div>
                    </div>
                </Col>
            </Row>
        </Form>
        
    )
    
}