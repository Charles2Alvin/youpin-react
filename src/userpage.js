import React from 'react';
import {Card, DatePicker, Descriptions, Divider, Form} from 'antd';
import 'antd/dist/antd.css';
import Input from "antd/es/input";
import Button from "antd/es/button";
import Row from "antd/es/grid/row";
import Col from "antd/es/grid/col";
import Select from "antd/es/select";
import docCookies from "./cookies";


const { Option } = Select;
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const buttonLayout = {
    wrapperCol: {offset: 19, span: 5}
};

const prefixSelector = (
    <Form.Item name="prefix" noStyle>
        <Select
            style={{
                width: 70,
            }}
        >
            <Option value="86">+86</Option>
            <Option value="87">+87</Option>
        </Select>
    </Form.Item>
);
class UserInfo extends React.Component {
    state = {
        editState: 'editing',
        userInfo: 'wow'
    };
    onFinish = (values) => {
        const birthday = values.birthday;
        const email = values.email;
        const gender = values.gender;
        const username = values.username;
        const wechat = values.wechat;
        const phone = values.phone;
        console.log(values);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        const urlencoded = new URLSearchParams();
        urlencoded.append("email", email);
        urlencoded.append("gender", gender);
        urlencoded.append("username", username);
        urlencoded.append("wechat", wechat);
        urlencoded.append("phone", phone);
        urlencoded.append("birthday", birthday);

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("localhost:5000/updateUserInfo", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        this.setState({editState: 'completed'})
    };
    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch("http://localhost:5000/getUserInfo?userID="+docCookies.getItem("userID"), requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("In fetch", result);
                const info = {
                    email: result.email,
                    username: result.username,
                    gender: result.gender,
                    wechat: result.wechat,
                    phone: result.phone,
                    birthday: result.birthday
                };
                this.setState({userInfo: info});
            })
            .catch(error => console.log('error', error));
    }

    render() {
        const info = this.state.userInfo;
        if (this.state.editState !== 'editing')
            return (
                <div>
                    <Card title="个人信息">
                        <Form style={{ width: 800 }}
                              {...layout}
                              size="middle"
                              name="basic"
                              initialValues={{
                                  remember: true,
                                  prefix: '86'
                              }}
                              onFinish={this.onFinish}
                        >
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="姓名"
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item label="性别" name="gender">
                                        <Select>
                                            <Option value="male">男</Option>
                                            <Option value="female">女</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item label="邮箱" name="email">
                                        <Input/>
                                    </Form.Item>
                                </Col>

                                <Col span={12}>
                                    <Form.Item label="生日" name="birthday">
                                        <DatePicker picker="month" style={{
                                            width: '100%',
                                        }}/>
                                    </Form.Item>
                                    <Form.Item label="微信号" name="wechat">
                                        <Input/>
                                    </Form.Item>

                                    <Form.Item label="电话" name="phone">
                                        <Input addonBefore={prefixSelector}/>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Form.Item {...buttonLayout}>
                                <Row>
                                    <Col>
                                        <Button htmlType="button" style={{marginRight: '39px'}}>
                                            取消
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button type="primary" htmlType="submit">
                                            完成
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Card>
                </div>
            );
        else return (
            <Card title="个人中心" style={{width: '960px', marginTop: '50px', marginLeft: '50px'}}>
                <a style={{marginRight: '40px', float: 'right'}}>编辑</a>
                    <Descriptions title="基本信息">
                        <Descriptions.Item label="用户名">{info.username}</Descriptions.Item>
                        <Descriptions.Item label="手机号">{info.phone}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{info.email}</Descriptions.Item>
                        <Descriptions.Item label="微信号">{info.wechat}</Descriptions.Item>
                        <Descriptions.Item label="生日">
                            {info.birthday}
                        </Descriptions.Item>
                    </Descriptions>

                <Divider/>
                <a style={{marginRight: '40px', float: 'right'}}>编辑</a>

                <Descriptions title="学历信息">
                        <Descriptions.Item label="本科">广州大学</Descriptions.Item>
                        <Descriptions.Item label="专业">新闻传播</Descriptions.Item>
                        <Descriptions.Item label="入学时间">2016年8月</Descriptions.Item>
                        <Descriptions.Item label="毕业时间">2020年6月</Descriptions.Item>
                    </Descriptions>
            </Card>
            )
    }
}

export default UserInfo;