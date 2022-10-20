import type {ColumnsType} from 'antd/es/table';
import {StudentInternship} from '../../../models/interfaces/StudentInternship';
import {Status} from '../../../models/enums/Status';
import {Alert, Space, Table, Tag} from 'antd';
import {RequiredDocumentType} from '../../../models/enums/RequiredDocumentType';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';

const MyInternshipsTable = () => {
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
        let color: string = 'blue';
        (status === Status.PENDING) && (color = 'orange');
        (status === Status.STARTED) && (color = 'blue');
        (status === Status.DONE) && (color = 'green');
        return <Tag color={color}>{status}</Tag>;
    }

    // Mock Starts Here
    const data: StudentInternship[] = [{
        id: '1',
        name: 'Conifère',
        tutorName: 'Maxime',
        hospitalName: 'Paris - 10ème',
        status: Status.PENDING,
        description: 'Chalom Rav Leohavé Toratéha Veyn Lamo Michol',
        documents: [{
            type: RequiredDocumentType.GRADES_SHEET
        }]
    }, {
        id: '2',
        name: 'Atelier de coupe - Pin',
        tutorName: 'Julien',
        hospitalName: 'Paris - 10ème',
        status: Status.STARTED
    }, {
        id: '3',
        name: 'Fabrication de meuble ancien',
        tutorName: 'Paul',
        hospitalName: 'Paris - 10ème',
        status: Status.DONE
    }];

    const getRenderedExpansion = (record: StudentInternship) => {
        return (
            <Space size='large' style={{display: 'flex', justifyContent: 'space-between'}}>
                <Space size='middle' direction='vertical' style={{margin: 0}}>
                    <strong>Description: </strong>
                    <p>{record.description}</p>
                </Space>
                {record.documents?.some((document: RequiredDocument) => document.type === RequiredDocumentType.GRADES_SHEET) &&
                    <Alert type='warning' showIcon={true}
                           description={'You must upload all required documents. Click on Documents to update them.'}/>
                }
            </Space>
        );
    }

    return (
        <Table columns={columns} dataSource={data} expandRowByClick={true}
               expandable={{
                   expandedRowRender: record => getRenderedExpansion(record),
                   rowExpandable: record => !!record.description?.length,
               }}/>
    );
}

export default MyInternshipsTable;
