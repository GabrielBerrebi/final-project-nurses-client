import UrlServerConstants from '../urls/UrlServerConstants';
import {StudentInternship} from '../../models/interfaces/StudentInternship';
import {SecretaryTutor} from '../../models/interfaces/secretary/SecretaryTutor';

export class SecretaryFetcher {
    async getAllStudents() {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.secretaryStudents);
            return {
                status: response.status,
                data: response?.data as StudentInternship[]
            }
        } catch (e) {
            throw e;
        }
    }

    async getAllTutors() {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.secretaryTutors);
            return {
                status: response.status,
                data: response?.data as SecretaryTutor[]
            }
        } catch (e) {
            throw e;
        }
    }

    async createTutor(newTutor: object) {
        try {
            const response = await UrlServerConstants.axiosBase
                .post(UrlServerConstants.secretaryTutors, newTutor);
            return {
                status: response.status,
                data: response?.data as string
            }
        } catch (e) {
            throw e;
        }
    }

    async deleteTutor(tutorId: string) {
        try {
            const response = await UrlServerConstants.axiosBase
                .delete(UrlServerConstants.secretaryTutors + tutorId);
            return {
                status: response.status,
                data: response?.data as string
            }
        } catch (e) {
            throw e;
        }
    }

    async getAllHospitals() {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.secretaryHospitals);
            return {
                status: response.status,
                data: response?.data as StudentInternship[]
            }
        } catch (e) {
            throw e;
        }
    }

    async createHospital(newHospital: object) {
        try {
            const response = await UrlServerConstants.axiosBase
                .post(UrlServerConstants.secretaryHospitals, newHospital);
            return {
                status: response.status,
                data: response?.data as string
            }
        } catch (e) {
            throw e;
        }
    }

    async deleteHospital(hospitalId: string) {
        try {
            const response = await UrlServerConstants.axiosBase
                .delete(UrlServerConstants.secretaryHospitals + hospitalId);
            return {
                status: response.status,
                data: response?.data as string
            }
        } catch (e) {
            throw e;
        }
    }

    async getAllInternships() {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.secretaryInternships);
            return {
                status: response.status,
                data: response?.data as StudentInternship[]
            }
        } catch (e) {
            throw e;
        }
    }
}