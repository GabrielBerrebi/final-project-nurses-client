import UrlServerConstants from '../urls/UrlServerConstants';
import {StudentInternship} from '../../models/interfaces/StudentInternship';
import {StudentPreferencesForm} from '../../models/interfaces/StudentPreferences';
import {RegisterInternship} from '../../models/interfaces/RegisterInternship';

export class StudentFetcher {
    async getStudentInternship(studentId: string) {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.studentInternships + studentId);
            return {
                status: response.status,
                data: response?.data as StudentInternship[]
            }
        } catch (e) {
            throw e;
        }
    }

    async getStudentInternshipRequests(studentId: string) {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.studentInternshipsRequests + studentId);
            return {
                status: response.status,
                data: response?.data as RegisterInternship[]
            }
        } catch (e) {
            throw e;
        }
    }

    async getStudentPreferences(id: string) {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.preferences + id);
            return {
                status: response.status,
                data: response?.data as StudentPreferencesForm
            }
        } catch (e) {
            throw e;
        }
    }

    async postStudentRegister(register: object) {
        try {
            const response = await UrlServerConstants
                .axiosBase.post(UrlServerConstants.studentPostInternshipsRequest, register);
            return {
                status: response.status,
                data: response?.data as string[]
            }
        } catch (e) {
            throw e;
        }
    }

    async putStudentPreferences(studentPreferences: StudentPreferencesForm) {
        try {
            const response = await UrlServerConstants.axiosBase.put(UrlServerConstants.preferences, studentPreferences);
            return {
                status: response.status,
                data: response?.data as string[]
            }
        } catch (e) {
            throw e;
        }
    }
}
