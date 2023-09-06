import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiBookOpen, FiLogOut } from "react-icons/fi";

const SideNavigationBar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar >
                <Menu
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#red',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >
                    {/* Trang chủ */}
                    <MenuItem icon={<FiHome />} component={<Link to="/" />}>Trang Chủ</MenuItem>

                    {/* Quản lý */}
                    <SubMenu icon={<FiCheckSquare />} label="Quản lý">
                        <MenuItem component={<Link to="/quanly" />}>Quản lý nhân viên</MenuItem>
                        <MenuItem>Quản lý phòng ban</MenuItem>
                        <MenuItem>Quản lý chủ đề</MenuItem>
                    </SubMenu>

                    {/* Công văn*/}
                    <SubMenu icon={<FiBookOpen />} label="Công văn">
                        <MenuItem>Công văn đến</MenuItem>
                        <MenuItem>Công văn đi</MenuItem>
                        <MenuItem>Công văn nội bộ</MenuItem>
                    </SubMenu>

                    {/* Đăng xuất */}
                    <MenuItem icon={<FiLogOut />}> Đăng xuất </MenuItem>
                </Menu>
            </Sidebar>
        </div >
    );
};

export default SideNavigationBar;