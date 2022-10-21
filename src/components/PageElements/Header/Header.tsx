import {Button, PageHeader, Space, Tag} from 'antd';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Header.module.less';
import {userStore} from '../../../stores';
import {observer} from 'mobx-react';
import {loginFetcher} from '../../../fetchers';
import {Role} from '../../../models/enums/Role';
import {useState} from 'react';
import {UrlClientConstants as urls} from '../../../fetchers/UrlClientConstants';
import {getRoleDashboard} from '../../../core/helpers/get-role-dashboard';

const Header = observer(() => {
    const [isLoading, setIsLoading] = useState(false);

    const isAuthenticated: boolean = userStore.getIsAuthenticated();
    const role: Role = userStore.getRole();
    const navigate = useNavigate();

    const logout = async () => {
        setIsLoading(true);
        await loginFetcher.logout();
        userStore.removeUser();
        navigate(urls.home);
    }

    const goToDashboard = () => {
        navigate(getRoleDashboard(role));
    }

    const getLink = () => {
        return isAuthenticated
            ? (<Space>
                <Button type='text' size='large' onClick={goToDashboard}>Dashboard</Button>
                <Button type='primary' size='large' onClick={logout} loading={isLoading}>Log out</Button>
            </Space>)
            : [<Link to='/login' key='/login'><Button type='primary' size='large'>Sign
                In</Button></Link>];
    }

    return (
        <header className={styles.header}>
            <PageHeader title={<Link to='/'>Hospital Internship</Link>}
                        tags={role !== Role.EMPTY ? <Tag color='geekblue'>{role}</Tag> : <span/>}
                        extra={getLink()}/>
        </header>
    );
});

export default Header;
