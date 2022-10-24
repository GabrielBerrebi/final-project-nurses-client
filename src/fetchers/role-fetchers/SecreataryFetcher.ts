import UrlServerConstants from '../urls/UrlServerConstants';
import {StudentInternship} from '../../models/interfaces/StudentInternship';
import {SecretaryTutor} from '../../models/interfaces/secretary/SecretaryTutor';
import {SecretaryStudent} from '../../models/interfaces/secretary/SecretaryStudent';

export class SecretaryFetcher {
    async getAllRequests() {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.secretaryRequests);
            return {
                status: response.status,
                data: response?.data as SecretaryStudent[]
            }
        } catch (e) {
            throw e;
        }
    }

    async getAllStudents() {
        try {
            const response = await UrlServerConstants.axiosBase.get(UrlServerConstants.secretaryStudents);
            return {
                status: response.status,
                data: response?.data as SecretaryStudent[]
            }
        } catch (e) {
            throw e;
        }
    }

    async createStudent(newStudent: object) {
        try {
            const response = await UrlServerConstants.axiosBase
                .post(UrlServerConstants.secretaryStudents, newStudent);
            return {
                status: response.status,
                data: response?.data as string
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

    async createInternship(newInternship: object) {
        try {
            const response = await UrlServerConstants.axiosBase
                .post(UrlServerConstants.secretaryInternships, newInternship);
            return {
                status: response.status,
                data: response?.data as string
            }
        } catch (e) {
            throw e;
        }
    }

    async deleteInternship(internshipId: string) {
        try {
            const response = await UrlServerConstants.axiosBase
                .delete(UrlServerConstants.secretaryInternships + internshipId);
            return {
                status: response.status,
                data: response?.data as string
            }
        } catch (e) {
            throw e;
        }
    }

    async putInternship(investment: object) {
        try {
            const response = await UrlServerConstants.axiosBase
                .put(UrlServerConstants.secretaryInvestment, investment);
            return {
                status: response.status,
                data: response?.data as object
            }
        } catch (e) {
            throw e;
        }
    }
}
