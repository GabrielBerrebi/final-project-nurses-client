import {observer} from 'mobx-react';
import {userStore} from '../../stores';
import Layout from '../../layouts/Layout/Layout';
import {Navigate} from 'react-router-dom';

const Student = observer(() => {
    const isAuthenticated: boolean = userStore.getIsAuthenticated();

    if (!isAuthenticated) {
        alert('You are not authenticated!');
        return <Navigate to='/' replace/>;
    }

    return (
        <Layout>
            <h1>Student - Very secret page</h1>
        </Layout>
    );
});

export default Student;
