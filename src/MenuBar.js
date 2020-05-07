import {Avatar, Dropdown, Menu} from "antd";
import GithubOutlined from "@ant-design/icons/lib/icons/GithubOutlined";
import {UserOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import { withRouter } from 'react-router';
import {Button} from "antd/es";
import './index.css'
import {useHistory} from "react-router";
import docCookies from "./cookies";



const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href={"/user"}>
                个人中心
            </a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href={"/"}>
                消息通知
            </a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
            退出登录
        </Menu.Item>
    </Menu>
);

const MenuBar = ({userID, loggedIn, loginAction, logoutAction}) => {
    const [name, setName] = useState('用户');
    useEffect(() => {
        if (docCookies.hasItem("userID") && docCookies.hasItem("token")) {
            const userIDCookie = docCookies.getItem("userID");
            const token = docCookies.getItem("token");
            const request = require('request');
            const options = {
                'method': 'POST',
                'url': 'http://localhost:5000/checkLogin',
                'headers': {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                form: {
                    userID: userIDCookie, token
                }
            };
            request(options, function (error, response) {
                if (error) {
                    console.log(error);
                    alert("Some error happens on the page");
                    return;
                }
                const body = JSON.parse(response.body);
                if (response.statusCode === 200) {
                    setName(body.username);
                    loginAction(userIDCookie);
                } else {
                    console.log(body.msg);
                }
            });
        }
    });

    const history = useHistory();
    const toSignIn = () => history.push('/login');
    const toSignUp = () => history.push('/register');
    const toHomePage = () => history.push('/');

    return (
        <Menu theme="dark" mode="horizontal" style={{ backgroundColor: 'black'}}>
            <Menu.Item key="app" className="customclass" onClick={toHomePage}>
                <GithubOutlined />优聘
            </Menu.Item>
            <Menu.Item key="company" className="customclass" onClick={toHomePage}>
                首页
            </Menu.Item>
            <Menu.Item key="jobs" className="customclass">
                职位
            </Menu.Item>
            <Menu.Item key="campus" className="customclass">
                校园
            </Menu.Item>
            {loggedIn ?
                <Menu.Item className="customclass" style={{float:'right'}}>
                    <span style={{marginRight: '30px'}}>{name}</span>
                    <Dropdown overlay={menu} style={{marginRight: '30px'}}>
                        <Avatar size={32} icon={<UserOutlined />} style={{}}/>
                    </Dropdown>
                </Menu.Item>

                :
                <Menu.Item style={{float:'right'}} className="customclass">
                    <Button ghost style={{marginRight: '20px'}} shape="round" onClick={toSignUp}>注册</Button>
                    <Button ghost style={{marginRight: '5px'}} shape="round" onClick={toSignIn}>登陆</Button>
                </Menu.Item>
            }
        </Menu>
        )
};

export default withRouter(MenuBar);