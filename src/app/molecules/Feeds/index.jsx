import React, { useState, useEffect } from 'react';
import { List, Comment, Tabs, Card, Button } from 'antd';
import {getTeamUpdates, getForYouUpdates } from './ducks/actions';
import moment from 'moment';
import { useHistory } from "react-router";
import {useSelector, useDispatch} from 'react-redux';
const defaultImage =
  "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";

    const { TabPane } = Tabs;

  export default (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const feed = useSelector(state => state.feeds.teamMarketingList)
    const feedForYou = useSelector(state => state.feeds.forYouList)
    
    const [teamUpdates, setTeamUpdates] = React.useState([]);
    const [teamUpdates1, setTeamUpdates1] = React.useState([]);
    const [detailLink, setDetailLink] = useState();

    const rolesList = JSON.parse(localStorage.getItem('userdetails')).role_list;
    
    
    const rolesParams = {
        data: [
            "HR Manager",
            "HR User",
            "Employee"
        ]
    }
    
    useEffect(() => {
        dispatch(getTeamUpdates(rolesParams))
        dispatch(getForYouUpdates())
    }, [])


    const generateLink = (doctype, docname, pageLink) => {
        switch(doctype) {
            case 'Application':
              return pageLink = `/marketing/incomplete-applications/${docname}`;
              break;
              
            default:
              // code block
        }
    }
 
    useEffect(() => {
        if (feed) {
            let arr = [];
            feed.map((res) => {
                let obj = null;
                const datetime = res.time ? moment(new Date(res.time)).fromNow() : '';
                const ava = res?.comment_modified_data || res?.version_modified_data;
                const doctype = res?.doctype;
                const docname = res?.docname;
                const action = res?.comment ? [res?.comment] : '';
                //const content = res?.comment ? `Commented in ${res?.docname} ${res.doctype}` : `Updated in ${res?.docname} ${res.doctype}`;
                const content = res?.result_message;
                const author = ava?.length ? ava[0].full_name : ''
                const avatar = ava?.length ? ava[0].user_image ? `http://cms2dev.limkokwing.net${ava[0].user_image}` : defaultImage : defaultImage;
                const link = res?.link;
                const stage = res?.application_status;
                let stageLink = ''
                let pageLink = '';

                switch(stage) {
                    case 'Incomplete document':
                        stageLink = `incomplete-documents`;
                        break;

                    case 'Eligibility assessment':
                        stageLink = `eligibility-assessments`;
                        break;
                            
                    case 'Incomplete registration visa':
                        stageLink = `pending-registration-visa`;
                        break;

                    case 'Pending accomodation':
                        stageLink = `pending-accommodations`;
                        break;

                    case 'Pending enrollment':
                        stageLink = `pending-enrolment`;
                        break;

                    default:
                        stageLink = `incomplete-documents`;
                }

                switch(doctype) {
                    case 'Application':
                      pageLink = `/marketing/applications/${stageLink}/${docname}`;
                      break;
                    
                    case 'AQA Form Request':
                      pageLink = `/aqa/requests/${docname}`;
                      break;

                    case 'AQA Form Request':
                        pageLink = `/aqa/requests/${docname}`;
                        break;

                    default:
                }
                obj ={
                    action: action,
                    author: author,
                    avatar: avatar,
                    content: content,
                    datetime: datetime,
                    link: link,
                    pageLink: pageLink
                }
                if (obj) {
                    arr.push(obj);
                }
            });
            setTeamUpdates(arr);
        }
    }, [feed])

    useEffect(() => {
        if (feedForYou) {
            let arr = [];
            feedForYou.map((res) => {
                let obj = null;
                const datetime = res.time ? moment(new Date(res.time)).fromNow() : '';
                const ava = res?.comment_modified_data || res?.version_modified_data;
                const doctype = res?.doctype;
                const docname = res?.docname;
                const action = res?.comment ? [res?.comment] : '';
                const content = res?.comment ? `Commented in ${res?.docname} ${res.doctype}` : `Updated in ${res?.docname} ${res.doctype}`;
                const author = ava?.length ? ava[0].full_name : ''
                const avatar = ava?.length ? ava[0].user_image ? `http://cms2dev.limkokwing.net${ava[0].user_image}` : defaultImage : defaultImage;
                const link = res?.link;
                const stage = res?.application_status;
                let stageLink = ''
                let pageLink = '';

                switch(stage) {
                    case 'Incomplete document':
                        stageLink = `incomplete-documents`;
                        break;

                    case 'Eligibility assessment':
                        stageLink = `eligibility-assessments`;
                        break;
                            
                    case 'Incomplete registration visa':
                        stageLink = `pending-registration-visa`;
                        break;

                    case 'Pending accomodation':
                        stageLink = `pending-accommodations`;
                        break;

                    case 'Pending enrollment':
                        stageLink = `pending-enrolment`;
                        break;

                    default:
                        stageLink = `incomplete-documents`;
                }

                switch(doctype) {
                    case 'Application':
                      pageLink = `/marketing/applications/${stageLink}/${docname}`;
                      break;
                    
                    case 'AQA Form Request':
                      pageLink = `/aqa/requests/${docname}`;
                      break;

                    case 'AQA Form Request':
                        pageLink = `/aqa/requests/${docname}`;
                        break;

                    default:
                }
                obj ={
                    action: action,
                    author: author,
                    avatar: avatar,
                    content: content,
                    datetime: datetime,
                    link: link,
                    pageLink: pageLink
                }
                if (obj) {
                    arr.push(obj);
                }
            });
        setTeamUpdates1(arr);
        }
    }, [feedForYou])

    return (
        <Tabs defaultActiveKey="1" type="card" className='custom-tabs'>
            <TabPane tab="Updates" key="1" forceRender={true}>
                <Card bordered={false} className='transparent-card' style={{height: 'calc(100vh - 220px)', }}>
                    <List
                        className="sider-comment-list"
                        itemLayout="horizontal"
                        dataSource={teamUpdates}
                        renderItem={(item) => {
                            //console.log('item', item)
                            return <li>
                            <Comment
                                actions={item.action}
                                author={item.author}
                                avatar={item.avatar}
                                content={item.link ? <a type="link" className="linkSidebar" href={item?.pageLink}>{item.content}</a> : item.content}
                                datetime={item.datetime}
                            />
                            </li>
                        }}
                    />
                </Card>
            </TabPane>
            <TabPane tab={`For You ${teamUpdates1.length}`} key="2" forceRender={true}>
                <Card bordered={false} className='transparent-card' style={{height: 'calc(100vh - 220px)', }}>
                    <List
                    className="sider-comment-list"
                    itemLayout="horizontal"
                    dataSource={teamUpdates1}
                    renderItem={(item) => {
                        return <li>
                        <Comment
                            actions={item.action}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.link ? <a type="link" className="linkSidebar" href={item?.pageLink}>{item.content}</a> : item.content}
                            datetime={item.datetime}
                        />
                        </li>
                    }}
                    />
                </Card>    
            </TabPane>
        </Tabs>
        
    )
}
