import {Status} from '../enums/Status';
import {RequiredDocument} from './RequiredDocument';

export interface StudentInternship {
    id: string;
    name: string;
    tutorName: string;
    tutorPhone: string;
    status: Status;
    description?: string;
    documents?: RequiredDocument[];
    hospitalName?: string;
}
