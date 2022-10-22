import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Student from '../Student/Student';
import ProtectedRoute from '../../wrappers/ProtectedRoute/ProtectedRoute';
import NotExistPage from '../NotExistPage/NotExistPage';
import {Role} from '../../models/enums/Role';
import {UrlClientConstants as urls} from '../../fetchers/urls/UrlClientConstants';
import Tutor from '../Tutor/Tutor';
import Secretary from '../Secretary/Secretary';

const AppRouter = () => {
    const [loginUrl, studentUrl, tutorUrl, secretaryUrl] =
        [urls.login, urls.student, urls.tutor, urls.secretary];

    return <Router>
        <Routes>
            <Route key={loginUrl} path={loginUrl} element={<Login/>}/>
            <Route key={studentUrl} path={studentUrl} element={
                <ProtectedRoute role={Role.STUDENT}>
                    <Student/>
                </ProtectedRoute>}/>
            <Route key={tutorUrl} path={tutorUrl} element={
                <ProtectedRoute role={Role.TUTOR}>
                    <Tutor/>
                </ProtectedRoute>}/>
            <Route key={secretaryUrl} path={secretaryUrl} element={
                <ProtectedRoute role={Role.SECRETARY}>
                    <Secretary/>
                </ProtectedRoute>}/>
            <Route key='/' path='/' element={<Home/>}/>
            <Route key='*' path='*' element={<NotExistPage/>}/>
        </Routes>
    </Router>
}

export default AppRouter;
