import UrlServerConstants from '../urls/UrlServerConstants';
import {StudentInternship} from '../../models/interfaces/StudentInternship';
import {StudentPreferencesForm} from '../../models/interfaces/StudentPreferences';

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

    async getStudentPreferences(id: string) {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.preferences + id);
            return {
                status: response.status,
                data: response?.data as StudentPreferencesForm[]
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
