import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiBookOpen, FiLogOut } from "react-icons/fi";

const SideNavigationBar = () => {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <Sidebar >
                <Menu>
                    <MenuItem component={<Link to="/" />}>QUẢN LÝ CÔNG VĂN</MenuItem>
                    {/* Trang chủ */}
                    <MenuItem icon={<FiHome />} component={<Link to="/" />}>Trang Chủ</MenuItem>

                    {/* Quản lý */}
                    <SubMenu icon={<FiCheckSquare />} label="Quản lý">
                        <MenuItem component={<Link to="/nhanvien" />}>Quản lý nhân viên</MenuItem>
                        <MenuItem component={<Link to="/phongban" />}>Quản lý phòng ban</MenuItem>
                        <MenuItem component={<Link to="/chudecvan" />}>Quản lý chủ đề công văn</MenuItem>
                    </SubMenu>

                    {/* Công văn*/}
                    <SubMenu icon={<FiBookOpen />} label="Công văn">
                        <MenuItem component={<Link to="/congvan" />}>Quản lý công văn</MenuItem>              
                    </SubMenu>

                    {/* Đăng xuất */}
                    <MenuItem icon={<FiLogOut />}> Đăng xuất </MenuItem>
                </Menu>
            </Sidebar>
        </div >
    );
};

export default SideNavigationBar;