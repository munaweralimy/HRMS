import React, {useState, useEffect, Fragment} from 'react';
import {Space, Button, Row, Col, Typography, Form, message, Spin } from 'antd';
import FormGroup from '../../../../molecules/FormGroup';
import { useForm } from 'react-hook-form';
import {getRolesList} from '../ducks/actions';
import { useDispatch, useSelector } from 'react-redux';
import { apiMethod } from '../../../../../configs/constants';
import axios from '../../../../../services/axiosInterceptor';
import { uniquiFileName, getSingleUpload } from '../../../../../features/utility';
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const antIcon = <LoadingOutlined spin />;


export default (props) => {
    
    const { control, errors, reset, handleSubmit } = useForm();
    const { title, onClose, onUpdate } = props;
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const rolesListData = useSelector((state) => state.policy.rolesListData);

    const formFields = [
        {
          name: 'policy_title',
          label: 'Title',
          req: true,
          placeholder: 'Please state',
          type: 'input',
          twocol: false,
          reqmessage: 'Please enter title',
        },
        {
          name: 'user_roles',
          label: 'User Role',
          req: true,
          placeholder: 'Please select',
          type: 'select',
          twocol: false,
          reqmessage: 'Please Select',
          multi: true,
          options: _.map(rolesListData, (e) => ({ label: e.name, value: e.name })),
        },
        {
          name: 'attachment',
          label: 'Attachment',
          req: true,
          placeholder: 'Upload',
          type: 'upload',
          twocol: false,
          reqmessage: 'Attachment required',
        },
    ];

    useEffect(() => {
        dispatch(getRolesList());
    }, []);

    const onFinish = async (val) => {
        console.log('hello', val);
        setLoad(true);
        let userRole = [{
            //parentfield: "policy_user_group",
            //parenttype: "HRMS Policy",
            user_roles: val?.user_roles.label,
            //doctype: "HRMS Policy User Group"
        }]
        // if(val?.user_roles.length > 0){
        //     val.user_roles.map(resp => {
        //         userRole.push({
        //             parentfield: "policy_user_group",
        //             parenttype: "HRMS Policy",
        //             user_roles: resp?.value,
        //             doctype: "HRMS Policy User Group"
        //         })
        //     })
        // }


       
        const json = {
            policy_list: [
                {
                    policy_title: val?.policy_title,
                }
            ]
        }
        console.log('json', json)

        let url = `${apiMethod}/hrms.policy_api.add_single_policy`;
        
        try {
            const resp = await axios.post(url, json);
            console.log('resp', resp)

            if (resp?.data?.status?.success == true) {
                const policyName = resp['data']?.message?.name;
                let policyAttatchment = [];
                if (val?.attachment) {
                    let modifiedName = uniquiFileName(val.attachment?.file?.originFileObj.name)
                    let res = await getSingleUpload(modifiedName, 'pdf',  val.attachment?.file?.originFileObj, 'HRMS Policy', policyName);
                    policyAttatchment = res?.file_url;
                }
                const payLoad = {
                    policy_list: [
                        {
                            policy_title: val?.policy_title,
                            name: policyName,
                            attachment: policyAttatchment,
                            policy_status: 'View',
                            policy_user_group: userRole
                        }
                    ]
                }

                let url2 = `${apiMethod}/hrms.policy_api.add_single_policy`;
                try {
                    await axios.put(url2, payLoad);
                    message.success('Policy Successfully Added');
                    setLoad(false);
                    setTimeout(() => {reset(); onClose(); onUpdate()}, 1000)
                } catch(e) {
                    setLoad(false);
                    const { response } = e;
                    message.error(response?.data?.message);
                }
            }

            
        } catch(e) {
            const { response } = e;
            message.error(response?.data?.message);
            setLoad(false);
        }
    };

    return (
        <Spin indicator={antIcon} size="large" spinning={load}>
        <Form scrollToFirstError layout="vertical" onFinish={handleSubmit(onFinish)}>

            <Row gutter={[20, 50]}>
                
                <Col span={24}>
                    <Space direction='vertical' size={20} className='w-100 text-center'>
                        <Title level={3} className='mb-0'>{title}</Title>
                        <Text>Please specify the details</Text>
                    </Space>
                </Col>

                <Col span={24}>
                    <Row gutter={[20, 30]}>                
                        {formFields.map((item, idx) => (
                            <Fragment key={idx}>
                                <FormGroup item={item} control={control} errors={errors} />
                            </Fragment>
                        ))}
                        <Col span={12}>
                            <Button size="large" type="primary" htmlType="button" className="black-btn w-100" onClick={onClose}>Close</Button>
                        </Col>
                        <Col span={12}>
                            <Button size="large" type="primary" htmlType="submit" className="green-btn w-100">Save</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Form>
        </Spin>
    )
}