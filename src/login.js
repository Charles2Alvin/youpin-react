import React from "react";
import {Form, Input, Button, Checkbox, Layout, Tabs} from 'antd';

import { UserOutlined, QqCircleFilled, WeiboCircleFilled,
    LockOutlined, WechatOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import './index.css';
import {IconSideBar} from "./components";
import {useHistory} from "react-router";
import docCookies from "./cookies";
const request = require('request');
const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const selectAfter = (
    <span onClick={() => alert("wow")}>发送验证码</span>
);

const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRe = /^1[3-9]\d{9}$/;
const userNameRe = /^[a-zA-Z0-9_-]{4,16}$/;

const userNameValidator = (rule, value, callback) => {
    const username = String(value).toLowerCase();
    if (emailRe.test(username) || phoneRe.test(username) || userNameRe.test(username)) {
        callback();
    }
    else callback("请正确填写用户名");
};

const phoneValidator = (rule, value, callback) => {
    const username = String(value).toLowerCase();
    if (phoneRe.test(username)) {
        callback();
    }
    else callback("请正确填写手机号");
};

const LoginPage = ({loginAction}) => {
    const history = useHistory();
    const onFinish = (values) => {
        const loginName = values.username === undefined ? values.phone : values.username;
        const password = values.password;
        const options = {
            'method': 'POST',
            'url': 'http://localhost:5000/login',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'loginName': loginName,
                'password': password
            }
        };
        request(options, function (error, response) {
            if (error) {
                alert("Some error happens on the server");
                return;
            }
            const body = JSON.parse(response.body);
            if (response.statusCode === 200) {
                docCookies.setItem("userID", body.userID,2 * 60 * 60);
                docCookies.setItem("token", body.token,2 * 60 * 60);
                loginAction(body.userID);
                history.push('/');
            } else {
                alert(body.msg);
            }
        });

        console.log('Received values of form: ', values);
    };

    return (
        <div>
            <Layout className="login-form-layout" style={{borderRadius: '25px'}}>
                <Sider style={{borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px', width: '300px'}} className="Sider">
                    <IconSideBar/>
                </Sider>
                <Content style={{borderRadius: '30px'}}>
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onFinish}
                        style={{margin: 'auto', marginTop: '60px'}}
                        size="large"
                    >
                        <Tabs defaultActiveKey="1" size="large">
                            <TabPane tab="密码登陆" key="1">
                                <Form.Item
                                    hasFeedback
                                    name="username"
                                    rules={[
                                        {
                                            required: true,
                                            validator: userNameValidator
                                        },
                                    ]}
                                >
                                    <Input
                                        style={{borderRadius: '6px'}}
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="请输入手机号码/邮箱/用户昵称" />
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码长度至少6位',
                                            min: 6,
                                        },
                                    ]}
                                    style={{marginBottom: "3px"}}
                                >
                                    <Input
                                        style={{borderRadius: '6px'}}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="请输入密码"
                                    />
                                </Form.Item>
                            </TabPane>

                            <TabPane tab="验证码登陆" key="2">
                                <Form.Item
                                    hasFeedback
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            message: '请正确输入手机号',
                                            validator: phoneValidator
                                        },
                                    ]}
                                >
                                    <Input style={{borderRadius: '6px'}}
                                           prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="请输入11位手机号码"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '验证码不能为空',
                                        },
                                    ]}
                                    style={{marginBottom: "3px"}}
                                >
                                    <Input
                                        style={{borderRadius: '6px'}}
                                        prefix={<MailOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="请输入验证码"
                                        addonAfter={selectAfter}
                                    />
                                </Form.Item>
                            </TabPane>
                        </Tabs>

                        <Form.Item style={{marginBottom: "3px"}}>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>自动登录</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href={"/"}>
                                忘记密码？
                            </a>
                        </Form.Item>

                        <Form.Item style={{marginBottom: "20px"}}>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                            <div style={{float: 'right', marginTop: '5px'}}><a href={"/register"}>免费注册</a></div>
                        </Form.Item>

                        <Form.Item>
                            <p style={{textAlign: 'center'}}>其他登陆方式</p>
                            <WechatOutlined style={{fontSize: '32px', color: '#1AAD19', marginLeft: '104px'}}/>
                            <QqCircleFilled style={{fontSize: '32px', color: '#08c',  marginLeft: '50px'}}/>
                            <WeiboCircleFilled style={{fontSize: '32px', color: '#E6162D',  marginLeft: '50px'}}/>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>

        </div>
    );
};


export default LoginPage;