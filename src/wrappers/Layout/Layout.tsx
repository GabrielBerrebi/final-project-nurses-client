import Header from '../../components/PageElements/Header/Header';
import Footer from '../../components/PageElements/Footer/Footer';
import React from 'react';
import styles from './Layout.module.less'

const Layout = ({children}: React.PropsWithChildren<{}>) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <div className={styles.children}>{children}</div>
            <Footer/>
        </div>
    );
}

export default Layout;
