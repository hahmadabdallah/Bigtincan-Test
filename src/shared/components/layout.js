import React from 'react';
import Header from './header';
const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Header></Header>
            <main>{children}</main>
        </React.Fragment>
    )
}

export default Layout;