import React from 'react';
import SideNavigationBar from './SideNavigationBar';

const layoutStyle = {
    display: "flex",
    height:"100vh"
}
const contentContainerStyle = {
    padding: "16px"
}
const Layout = ({ children }) => {
    return (
        <div id="layout" style={layoutStyle}>
            <SideNavigationBar></SideNavigationBar>
            <div style={contentContainerStyle}>
                {children}
            </div>
        </div>
    );
};

export default Layout;