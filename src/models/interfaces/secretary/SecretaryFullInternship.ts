import {RequiredDocumentType} from '../../enums/RequiredDocumentType';

export interface SecretaryFullInternship {
    id: string;
    name: string;
    tutors: string[];
    documents: RequiredDocumentType[];
    description: string;
}
