import {Typography} from "antd";
import React from "react";
import {ThunderboltOutlined, MessageOutlined, EditOutlined} from "@ant-design/icons/lib";


const IconSideBar = () => {
    return (
        <div>
            <Typography style={{color: "white"}}>
                <div style={{marginLeft: '22px', marginTop: '50px', display: 'inline-flex'}}>
                    <ThunderboltOutlined style={{fontSize: '32px', color: '#08c',  marginTop: '10px'}}/>
                    <div style={{marginLeft: '10px', float: 'left', display: 'inline-block'}}>
                        <span style={{ fontSize: '22px'}}>极速</span><br/>
                        <span style={{fontSize: '14px'}}>
                           简历一键全投递
                       </span>
                    </div>
                </div>
                <div style={{marginLeft: '22px', marginTop: '100px', display: 'inline-flex'}}>
                    <MessageOutlined style={{fontSize: '32px', color: '#08c',  marginTop: '10px'}}/>
                    <div style={{marginLeft: '10px', float: 'left', display: 'inline-block'}}>
                        <span style={{ fontSize: '22px'}}>内推</span><br/>
                        <span style={{fontSize: '14px'}}>
                           沟通直达企业HR
                       </span>
                    </div>
                </div>
                <div style={{marginLeft: '22px', marginTop: '110px', display: 'inline-flex'}}>
                    <EditOutlined style={{fontSize: '32px', color: '#08c',  marginTop: '10px'}}/>
                    <div style={{marginLeft: '10px', float: 'left', display: 'inline-block'}}>
                        <span style={{ fontSize: '22px'}}>随心</span><br/>
                        <span style={{fontSize: '14px'}}>
                           海量岗位随心选
                       </span>
                    </div>
                </div>
            </Typography>
        </div>
    )
};

export default IconSideBar;