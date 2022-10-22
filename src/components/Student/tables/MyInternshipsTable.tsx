import type {ColumnsType} from 'antd/es/table';
import {StudentInternship} from '../../../models/interfaces/StudentInternship';
import {Status} from '../../../models/enums/Status';
import {Alert, Space, Table, Tag} from 'antd';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import {getStatusCode} from '../../../core/helpers/get-status-code';
import {userStore} from '../../../stores';
import {studentInternshipFetcher} from '../../../fetchers';
import {useEffect, useState} from 'react';

const MyInternshipsTable = () => {
    const [data, setData] = useState<StudentInternship[] | undefined>(undefined);
    const id: string = userStore.getId();

    const getStudentInternships = async () => {
        if (id === '') return;
        const internships = await studentInternshipFetcher.getStudentInternship(id);
        setData(internships.data as unknown as StudentInternship[]);
    }

    useEffect(() => {
        getStudentInternships();
    }, []);

    const columns: ColumnsType<StudentInternship> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        render: (id: string) => <strong>#{id}</strong>
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Tutor',
        dataIndex: 'tutorName',
        key: 'tutorName',
    }, {
        title: 'Hospital',
        dataIndex: 'hospitalName',
        key: 'hospitalName',
    }, {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (status: Status) => getRenderedStatus(status),
        sorter: (a: StudentInternship, b: StudentInternship) => a.status.localeCompare(b.status)
    }];

    const getRenderedStatus = (status: Status) => {
        const color: string = getStatusCode(status);
        return <Tag color={color}>{status}</Tag>;
    }

    const getRenderedExpansion = (record: StudentInternship) => {
        return (
            <Space size='large' style={{display: 'flex', justifyContent: 'space-between'}}>
                <Space size='middle' direction='vertical' style={{margin: 0}}>
                    <strong>Description: </strong>
                    <p>{record.description}</p>
                </Space>
                {record.documents?.some((document: RequiredDocument) => !document.URL) &&
                    <Alert type='warning' showIcon={true}
                           description={'You must upload all required documents. ' +
                               'Click on Documents to update them.'}/>
                }
            </Space>
        );
    }

    return (
        <Table columns={columns} dataSource={data}
               expandRowByClick={true} expandable={{
            expandedRowRender: record => getRenderedExpansion(record),
            rowExpandable: record => !!record.description?.length,
        }}/>
    );
}

export default MyInternshipsTable;
