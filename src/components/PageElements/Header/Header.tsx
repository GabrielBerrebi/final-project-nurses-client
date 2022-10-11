import {Button, PageHeader, Tag} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Header.module.less';
import {userStore} from '../../../stores';
import {observer} from 'mobx-react';
import {loginFetcher} from '../../../fetchers';
import {Role} from '../../../models/enums/Role';
import {useState} from 'react';

const Header = observer(() => {
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated: boolean = userStore.getIsAuthenticated();
    const role: Role = userStore.getRole();
    const navigate = useNavigate();

    const logout = async () => {
        setIsLoading(true);
        await loginFetcher.logout();
        userStore.removeUser();
        navigate('/');
    }

    const getLink = () => {
        return isAuthenticated
            ? <Button type='primary' size='large' onClick={logout} loading={isLoading}>Log out</Button>
            : [<Link to='/login' key='/login'><Button type='primary' size='large'>Sign
                In</Button></Link>];
    }

    return (
        <header className={styles.header}>
            <PageHeader title={<Link to='/'>Hospital Internship</Link>}
                        tags={role ? <Tag color='yellow'>{role}</Tag> : <span/>}
                        extra={getLink()}/>
        </header>
    );
});

export default Header;
