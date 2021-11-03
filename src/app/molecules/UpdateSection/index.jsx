import React, {useState, useEffect} from 'react';
import {Row, Col, Card, Typography, Form, Button, List, Avatar } from 'antd';
import { useTranslate } from 'Translate';
import { useForm } from 'react-hook-form';
import { InputField } from '../../atoms/FormElement';
import { ChatUpdateIcon } from '../../atoms/CustomIcons';
import axios from '../../../services/axiosInterceptor';
import { apiresource } from '../../../configs/constants';
import moment from 'moment';

const {Title, Text} = Typography;
const defaultImage =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";


export default (props) => {

    const { control, errors, handleSubmit } = useForm();
    const [feed, setFeed] = useState([])
    const i18n = useTranslate();
    const { t } = i18n;
    

    const onFinish = async (val) => {
    
        let body = {
            comment_type: "Comment",
            comment_email: JSON.parse(localStorage.getItem('userdetails')).email,
            reference_doctype: props.module,
            reference_name: props.code,
            content: `<div>${val.comment}</div>`,
        }
        let url = `${apiresource}/Comment`
        try {
            await axios.post(url, body);
            props.updateComment();
        } catch(e) {
            const { response } = e;
            console.log(e);
        }
    }

    useEffect(() => {
        if (props.data) {
            let arr = [];
            props.data.map((res) => {
          let obj = null;
          let action = '';
          let author = '';
          let avatar = '';
          let content = '';
          let datetime = res.time ? moment(new Date(res.time)).fromNow() : '';
          
          if (res.type === "comment") {
              
            let ava = res.data?.comment_modified_data;
            action = res.data?.comment;
            content = `Commented on ${res.reference_name} ${res.doctype}`;
            author = res.data?.comment_modified_data[0]?.full_name || res.data?.comment_modified_data[0]?.email || '';
            avatar = ava.length ? ava[0].user_image ? `http://cms2dev.limkokwing.net${ava[0].user_image}` : defaultImage : defaultImage;
            } else {
                action = ``;
                content = `Updated in ${res.doc_name} ${res.doctype}`;
                author = res.by || '';
                avatar = defaultImage;
            }

            obj ={
                action: action,
                author: author,
                avatar: avatar,
                content: content,
                datetime: datetime
            }
            if (obj) {
                arr.push(obj);
            }
        });
        setFeed(arr);
        }
    }, [props.data])

 
return (
        <Form 
        layout="vertical" 
        scrollToFirstError={true}
        onFinish={handleSubmit(onFinish)}
        >
            <Row gutter={20}>
                <Col span={24}>
                    <Card bordered={false} className='uni-card h-auto'>
                        <Row gutter={[20, 30]}>
                            <Col span={24}>
                                <Title level={4} className='mb-0'>Updates</Title>
                            </Col>
                            <Col span={24}>
                                <Row gutter={10} align='middle'>
                                    <Col flex='auto'>
                                        <InputField 
                                        class='mb-0'
                                        fieldname='comment'
                                        label=''
                                        control={control}
                                        iProps={{size: 'large', placeholder: 'Write your comments..'}}
                                        initValue=''
                                        rules={{ required: 'Please Type'}}
                                        validate={errors.comment && 'error'}
                                        />
                                    </Col>
                                    <Col flex='30px'><Button htmlType='submit' type='link' icon={<ChatUpdateIcon />} /></Col>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <List
                                className="updation-list"
                                // loading={initLoading}
                                itemLayout="horizontal"
                                // loadMore={loadMore}
                                dataSource={feed}
                                renderItem={item => (
                                    <List.Item>
                                        {/* <Skeleton avatar title={false} loading={item.loading} active> */}
                                        <List.Item.Meta
                                            avatar={<Avatar size='large' src={item.avatar} />}
                                            title={item.content}
                                            description={item.author}
                                        />
                                        <Row gutter={20} wrap={false} className='w-100' align='middle' justify='end'>
                                             <Col flex='0 1 100%'>
                                             {item.action && <Title level={5} className='w-100 reply-box'>{item.action}</Title>}
                                            </Col>
                                            <Col  flex='100px'>
                                                <Text className='comment-date'>{item.datetime}</Text>
                                            </Col>
                                        </Row>
                                        {/* </Skeleton> */ }
                                    </List.Item>
                                )}
                                />
                            </Col>
                            <Col span={24} className='text-center'>
                                <Button type='link' htmlType='button' className='white-link'>View more</Button>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Form>
    )
}