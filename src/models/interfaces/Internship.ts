import {RequiredDocumentType} from '../enums/RequiredDocumentType';

export interface Internship {
    name: string;
    documents: RequiredDocumentType[];
    hospitalsNames: string[];
    tutorsNames: string[];
}
