import Table, {ColumnsType} from 'antd/es/table';
import {Button, Divider, Space, Tag} from 'antd';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import {RegisterInternship} from '../../../models/interfaces/RegisterInternship';
import React, {useEffect, useState} from 'react';
import {userStore} from '../../../stores';
import {studentInternshipFetcher} from '../../../fetchers';

const RegisterTable = () => {
    const [registerInternships, setRegisterInternships] =
        useState<RegisterInternship[] | undefined>(undefined);
    const id: string = userStore.getId();

    const getRegisterInternships = async () => {
        if (id === '') return;
        const internships = await studentInternshipFetcher.getStudentInternshipRequests(id);
        setRegisterInternships(internships.data as unknown as RegisterInternship[]);
    }

    useEffect(() => {
        getRegisterInternships();
    }, []);

    const columns: ColumnsType<RegisterInternship> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <strong>{id}</strong>
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Tutors',
        dataIndex: '',
        key: 'tutorsNames',
        render: (request: RegisterInternship) => request.tutorsNames?.join(' · ')
    }, {
        title: 'Hospitals',
        dataIndex: '',
        key: 'hospitalsNames',
        render: (request) => request.hospitalsNames?.join(' · ')
    }, {
        title: 'Action',
        dataIndex: '',
        key: 'action',
        render: (request: RegisterInternship) => <Button onClick={(e) => onRegisterClick(e, request)}
                                                         type='primary'>Register</Button>
    },];

    const onRegisterClick = async (e: React.MouseEvent<HTMLElement>, request: RegisterInternship) => {
        e.stopPropagation();
        const requestToSend = {
            'id_student': id,
            'id_internship': request.id
        }
        await studentInternshipFetcher.postStudentRegister(requestToSend);
        getRegisterInternships();
    }

    const getRenderedDescription = (description: string) => {
        return (
            <Space size='middle' direction='vertical'>
                <strong>Description: </strong>
                <span>{description}</span>
            </Space>
        );
    }

    const getRenderedDocuments = (documents: RequiredDocument[]) => {
        return (
            <Space size='middle' direction='vertical'>
                <strong>Required Documents: </strong>
                <p>{documents.map((document: RequiredDocument, index: number) =>
                    <Tag key={index} color='blue'>{document.type}</Tag>)}
                </p>
            </Space>
        );
    }

    const getRenderedExpansion = (record: RegisterInternship) => {
        return (
            <Space size='large'>
                {record.description && getRenderedDescription(record.description)}
                <Divider type='vertical'/>
                {record.documents?.length && getRenderedDocuments(record.documents)}
            </Space>
        );
    }

    const getRowKey = (_: any, index: any) => {
        return index;
    }

    return (
        <Table columns={columns} dataSource={registerInternships} expandRowByClick sticky rowKey={getRowKey}
               expandable={{
                   expandedRowRender: record => getRenderedExpansion(record),
                   rowExpandable: record => !!record.description?.length ||
                       !!record.documents?.length,
               }}
        />
    );
}

export default RegisterTable;
