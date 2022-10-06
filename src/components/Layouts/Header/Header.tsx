import {Button, PageHeader} from 'antd';
import styles from './Header.module.less';

const Header = () => {
    return <header className={styles.header}>
        <PageHeader title='Hospital Internships'
                    extra={[<Button key='1' type='primary' size='large'>Sign In</Button>]}/>
    </header>;
}

export default Header;
