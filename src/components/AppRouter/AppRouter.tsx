import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Student from '../Student/Student';
import ProtectedRoute from '../../wrappers/ProtectedRoute/ProtectedRoute';
import NotExistPage from '../NotExistPage/NotExistPage';
import {Role} from '../../models/enums/Role';
import {UrlClientConstants as urls}  from '../../fetchers/UrlClientConstants';

const AppRouter = () => {
    const [loginUrl, studentUrl] = [urls.login, urls.student];

    return <Router>
        <Routes>
            <Route key={loginUrl} path={loginUrl} element={<Login/>}/>
            <Route key={studentUrl} path={studentUrl} element={
                <ProtectedRoute role={Role.STUDENT}>
                    <Student/>
                </ProtectedRoute>}/>
            <Route key='/' path='/' element={<Home/>}/>
            <Route key='*' path='*' element={<NotExistPage />} />
        </Routes>
    </Router>
}

export default AppRouter;
