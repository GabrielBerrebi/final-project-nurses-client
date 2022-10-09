import {Button, PageHeader, Tag} from 'antd';
import {Link} from 'react-router-dom';
import styles from './Header.module.less';
import {userStore} from '../../../stores';
import {observer} from 'mobx-react';
import {loginFetcher} from '../../../fetchers';
import {Role} from '../../../models/enums/Role';

const Header = observer(() => {
    const isAuthenticated: boolean = userStore.getIsAuthenticated();
    const role: Role = userStore.getRole();

    const logout = async () => {
        await loginFetcher.logout();
        userStore.removeUser();
    }

    const getLink = () => {
        return isAuthenticated
            ? <Button type='primary' size='large' onClick={logout}>Log out</Button>
            : [<Link to='/login' key='/login'><Button type='primary' size='large'>Sign
                In</Button></Link>];
    }

    return (<header className={styles.header}>
        <PageHeader title={<Link to='/'>Hospital Internship</Link>}
                    tags={role ? <Tag color='gold'>{role}</Tag> : <span/>}
                    extra={getLink()}/>
    </header>);
});


export default Header;
