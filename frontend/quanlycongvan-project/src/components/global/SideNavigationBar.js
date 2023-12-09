import React from 'react';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import { FiHome, FiCheckSquare, FiBookOpen, FiLogOut } from "react-icons/fi";
import { isUserAllow } from '../../utils/utils';

const SideNavigationBar = () => {

    const isSignInPage = window.location.href === 'http://localhost:3000/';

    const handleSignOut = () => {
        localStorage.clear();
        window.location.href = '/';
    }



    return (
        <div style={{ display: isSignInPage ? 'none' : 'flex', height: '100vh' }}>
            <Sidebar >
                <Menu>
                    <MenuItem component={<Link to="/" />}>QUẢN LÝ CÔNG VĂN</MenuItem>
                    {/* Trang chủ */}
                    <MenuItem icon={<FiHome />} component={<Link to="/trangchu" />}>Trang Chủ</MenuItem>
                    <SubMenu style={{ display: isUserAllow() ? "" : "none" }} icon={<FiBookOpen />} label="Công văn gửi tới">
                        <MenuItem component={<Link to="/canhan" />}>Công văn gửi tới</MenuItem>
                    </SubMenu>
                    {/* Quản lý */}
                    <SubMenu icon={<FiCheckSquare />} label="Quản lý">
                        <MenuItem component={<Link to="/nhanvien" />}>Quản lý nhân viên</MenuItem>
                        <MenuItem component={<Link to="/phongban" />}>Quản lý phòng ban</MenuItem>
                        <MenuItem component={<Link to="/linhvuc" />}>Quản lý lĩnh vực</MenuItem>
                        <MenuItem component={<Link to="/loaicvan" />}>Quản lý loại công văn</MenuItem>
                        <MenuItem style={{ display: isUserAllow() ? "none" : "" }} component={<Link to="/user" />}>Quản lý người dùng</MenuItem>
                    </SubMenu>

                    {/* Công văn*/}
                    <SubMenu icon={<FiBookOpen />} label="Công văn">
                        <MenuItem component={<Link to="/congvan" />}>Quản lý công văn</MenuItem>
                    </SubMenu>

                    {/* Đăng xuất */}
                    <MenuItem onClick={handleSignOut} icon={<FiLogOut />}> Đăng xuất </MenuItem>
                </Menu>
            </Sidebar>
        </div >
    );
};

export default SideNavigationBar;