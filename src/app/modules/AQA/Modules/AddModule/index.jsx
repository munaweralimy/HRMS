import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Form, message, Breadcrumb } from 'antd';
import HeadingChip from '../../../../molecules/HeadingChip';
import { useHistory } from 'react-router';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import PlaceHolderImage from '../../../../../assets/img/empty_module.png';
import Information from './Information';
import { getInstitution } from '../../Faculty/ducks/actions';
import { useDispatch } from 'react-redux';
import { apiresource } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import SideDetails from '../../../../molecules/SideDetails';
import SideDetailResponsive from '../../../../molecules/SideDetailResponsive';
import { useMediaQuery } from 'react-responsive';
import { BreakingPoint } from '../../../../../configs/constantData';

export default (props) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const { control, errors, handleSubmit, reset } = useForm();
    const [ tags, setTags ] = useState([])
    const [status, setStatus] = useState('Draft');
    const isHDScreen = useMediaQuery({ query: BreakingPoint.HDPLUS });

    const i18n = useTranslate();
    const { t } = i18n;

    const sideData = {
        image: PlaceHolderImage,
        text: "Please fill up the details on the right. Once finished, click 'Save Draft' or 'Add Module' to proceed."
    }

    const bottomList = [
        {
            title: 'Save Draft',
            type: 'submit',
            class: 'black-btn',
        },
        {
            title: 'Add Module',
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
            module_code: val.code,
            module_name: val.name,
            type: val.type.label,
            credit: val.credit.label,
            hours: val.hours.label,
            fee_currency: val.currency.label,
            module_fee: val.fee,
            status: status,
            programmes: tags
        }

        const url = `${apiresource}/AQA Module`;
        try {
            await axios.post(url, body);
            props.setLoading(false);
            message.success('Module Successfully Created');
            reset();
            setTags(Object.assign([]));
            setTimeout(() => history.push('/aqa/modules'), 1000);
        } catch (e) {
            const {response} = e;
            message.error('Something went wrong');
            props.setLoading(false);
        }
    }

    return (
        <Form 
        layout="vertical" 
        scrollToFirstError={true}
        onFinish={handleSubmit(onFinish)}
        >
            <Breadcrumb separator=">" className='mb-1'>
                <Breadcrumb.Item href="/aqa/modules">Module</Breadcrumb.Item>
                <Breadcrumb.Item>Add New Modules</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={[20, 30]}>
                <Col span={24}>
                    <HeadingChip title={t('AQA.Module.title2')}  />
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