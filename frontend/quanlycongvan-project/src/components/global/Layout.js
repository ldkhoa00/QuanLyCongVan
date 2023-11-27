import React from 'react';
import SideNavigationBar from './SideNavigationBar';

//Style
const layoutStyle = {
    display: "flex",
    height: "100%",
}
const contentContainerStyle = {
    padding: "16px",
    margin: "0",
    height: 'fit-cotent',
    width: "83%"
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