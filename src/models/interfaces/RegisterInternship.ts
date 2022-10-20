import {RequiredDocument} from './RequiredDocument';

export interface RegisterInternship {
    id: string;
    name: string;
    tutorsNames: string[];
    hospitalsNames: string[];
    documents?: RequiredDocument[];
    description?: string;
}
