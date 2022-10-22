import axios from 'axios';

class UrlServerConstants {
    private static readonly _baseURL: string = 'https://backend-app-nurse.herokuapp.com/api/';

    static readonly loginURL: string = 'auth/login/';
    static readonly logoutURL: string = 'auth/logout/';
    static readonly studentInternships = 'student/internships/';
    static readonly tutorInternships = 'tutor/internships/';


    static axiosBase = axios.create({
        baseURL: this._baseURL,
    })
}

export default UrlServerConstants;


