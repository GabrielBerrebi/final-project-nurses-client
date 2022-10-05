import {Button, PageHeader} from 'antd';
import {Link} from 'react-router-dom';
import styles from './Header.module.less';

const Header = () => {
    return <header className={styles.header}>
        <PageHeader title={<Link to='/'><h4>Hospital Internship</h4></Link>}
                    extra={[<Link to='/login' key='/login'><Button type='primary' size='large'>Sign
                        In</Button></Link>]}/>
    </header>;
}

export default Header;
