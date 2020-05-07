import React from "react";
import {Form, Input, Button, Checkbox, Layout, Tabs} from 'antd';

import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import './index.css';
import { IconSideBar } from "./components";
import {useHistory} from "react-router";
import docCookies from "./cookies";

const { Content, Sider } = Layout;
const { TabPane } = Tabs;

const selectAfter = (
    <span onClick={() => alert("wow")}>发送验证码</span>
);
const emailRe = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRe = /^1[3-9]\d{9}$/;

const emailValidator = (rule: any, value: any, callback: any) => {
    const username = String(value).toLowerCase();
    if (emailRe.test(username)) {
        callback();
    }
    else callback("请正确填写邮箱");
};
const phoneValidator = (rule: any, value: any, callback: any) => {
    const phone = String(value).toLowerCase();
    if (phoneRe.test(phone)) {
        callback();
    }
    else callback("请正确填写手机号");
};


const RegisterPage = ({loginAction} : any) => {
    console.log(loginAction);
    const history = useHistory();
    const [form] = Form.useForm();
    const passValidator = (rule: any, value: any, callback: any) => {
        const password = form.getFieldValue("password");
        const password2 = form.getFieldValue("passwordRetyped");
        if (password !== password2) callback("两次输入的密码不一样");
        else callback();
    };
    const onFinish = (values: any) => {
        const agree = values.agree;
        if (!agree) {
            alert("请阅读并同意YouPin用户协议，方可注册");
            return;
        }
        let loginName: string, type: string;
        if (values.phone === undefined) {
            loginName = values.email;
            type = 'email';
        } else {
            loginName = values.phone;
            type = 'phone';
        }
        const password = values.password;

        const request = require('request');
        const options = {
            'method': 'POST',
            'url': 'http://localhost:5000/register',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'loginName': loginName,
                'password': password,
                'type': type
            }
        };
        request(options, function (error: string, response: any) {
            if (error) {
                console.log(error);
                alert("Some error happens on the page");
                return;
            }
            const body = JSON.parse(response.body);
            if (response.statusCode === 200) {
                docCookies.setItem("userID", body.userID,60 * 60 * 2);
                docCookies.setItem("token", body.token,60 * 60 * 2);
                loginAction(body.userID);
                history.push('/');
            } else {
                alert(body.msg);
            }
        });

    };
    return (
        <div>
            <Layout className="login-form-layout" style={{borderRadius: '25px'}}>
                <Sider style={{borderTopLeftRadius: '25px', borderBottomLeftRadius: '25px', width: '300px'}}>
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
                        form={form}
                    >
                        <Tabs defaultActiveKey="1" size="large">
                            <TabPane tab="邮箱注册" key="1">
                                <Form.Item
                                    hasFeedback
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            validator: emailValidator
                                        },
                                    ]}
                                    style={{marginBottom: "30px"}}
                                >
                                    <Input style={{borderRadius: '6px'}} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                                </Form.Item>
                                <Form.Item
                                    hasFeedback
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            min: 6,
                                            message: '密码长度不能小于6位'
                                        },
                                    ]}
                                    style={{marginBottom: "30px"}}
                                >
                                    <Input
                                        style={{borderRadius: '6px'}}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="请输入6位以上密码"
                                    />
                                </Form.Item>
                                <Form.Item
                                    hasFeedback
                                    name="passwordRetyped"
                                    rules={[
                                        {
                                            required: true,
                                            validator: passValidator
                                        },
                                    ]}
                                    style={{marginBottom: "30px"}}
                                >
                                    <Input
                                        style={{borderRadius: '6px'}}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="请输入和上面相同的密码"
                                    />
                                </Form.Item>
                            </TabPane>

                            <TabPane tab="手机号注册" key="2">
                                <Form.Item
                                    hasFeedback
                                    name="phone"
                                    rules={[
                                        {
                                            required: true,
                                            validator: phoneValidator
                                        },
                                    ]}
                                    style={{marginBottom: "16px"}}
                                >
                                    <Input style={{borderRadius: '6px'}}
                                           prefix={<MobileOutlined className="site-form-item-icon" />} placeholder="请输入11位手机号码"/>
                                </Form.Item>
                                <Form.Item
                                    hasFeedback
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: '密码长度不能小于6位',
                                            min: 6
                                        },
                                    ]}
                                    style={{marginBottom: "16px"}}
                                >
                                    <Input
                                        style={{borderRadius: '6px'}}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="请输入6位以上密码"
                                    />
                                </Form.Item>
                                <Form.Item
                                    hasFeedback
                                    name="passwordRetyped"
                                    rules={[
                                        {
                                            required: true, validator: passValidator
                                        },]}
                                    style={{marginBottom: "16px"}}
                                >
                                    <Input
                                        style={{borderRadius: '6px'}}
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="请输入和上面相同的密码"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="authCode"
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
                                        placeholder="请输入验证码"
                                        addonAfter={selectAfter}
                                    />
                                </Form.Item>
                            </TabPane>
                        </Tabs>

                        <Form.Item style={{marginBottom: "3px"}}>
                            <Form.Item name="agree" valuePropName="checked" noStyle>
                                <Checkbox>我已同意用户协议及隐私政策</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href={"/login"}>
                                直接登录
                            </a>
                        </Form.Item>

                        <Form.Item style={{marginBottom: "20px"}}>
                            <Button type="primary" htmlType="submit" className="login-form-button" style={{borderRadius: '6px'}}>
                                注册
                            </Button>
                        </Form.Item>
                    </Form>
                </Content>
            </Layout>

        </div>
    );
};


export default RegisterPage;