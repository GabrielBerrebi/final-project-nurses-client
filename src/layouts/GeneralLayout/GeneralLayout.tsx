import Header from '../../components/Layouts/Header/Header';
import Footer from '../../components/Layouts/Footer/Footer';
import React from 'react';
import styles from './GeneralLayout.module.less'

const GeneralLayout = ({children}: React.PropsWithChildren<{}>) => {
    return (
        <div className={styles.generalLayout}>
            <Header/>
            <div className={styles.children}>{children}</div>
            <Footer/>
        </div>
    );
}

export default GeneralLayout;
