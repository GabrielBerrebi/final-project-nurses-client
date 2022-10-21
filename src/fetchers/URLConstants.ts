import axios from 'axios';

class URLConstants {
    private static readonly _baseURL: string = 'https://backend-app-nurse.herokuapp.com/api/';

    static readonly loginURL: string = 'auth/login/';
    static readonly logoutURL: string = 'auth/logout/';
    static readonly studentInternships = 'student/internshipsOfStudent/';
    static readonly uploadStudentDocument = 'files/';

    static axiosBase = axios.create({
        baseURL: this._baseURL,
    })
}

export default URLConstants;


