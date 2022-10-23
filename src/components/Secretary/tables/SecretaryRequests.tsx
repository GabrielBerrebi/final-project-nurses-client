import React, {useEffect, useState} from 'react';
import {Button, Divider, Table, Tag} from 'antd';
import {userStore} from '../../../stores';
import {secretaryFetcher} from '../../../fetchers';
import {ColumnsType} from 'antd/es/table';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import styles from './tables.module.less';
import {SecretaryRequest} from '../../../models/interfaces/secretary/SecretaryRequest';

const SecretaryRequests = () => {
    const [data, setData] = useState<SecretaryRequest[] | undefined>(undefined);
    const [requestsIds, setRequestsIds] = useState<string[]>([]);
    const id: string = userStore.getId();

    const getAllRequests = async () => {
        if (id === '') return;
        const requests = await secretaryFetcher.getAllRequests();
        setData(requests.data as unknown as SecretaryRequest[]);
    }

    useEffect(() => {
        getAllRequests();
    }, []);

    const columns: ColumnsType<SecretaryRequest> = [{
        title: 'Student',
        dataIndex: ['student', 'name'],
        key: 'studentName',
        sorter: (a: SecretaryRequest, b: SecretaryRequest) => a?.student.name.localeCompare(b?.student.name)
    }, {
        title: 'Documents',
        dataIndex: '',
        key: 'documents',
        render: (student: SecretaryRequest) => student.documents?.map((rDocument: RequiredDocument) =>
            rDocument.URL
                ? <span>
                    <a href={rDocument.URL} target='_blank' rel="noreferrer">{rDocument.type}</a>
                    <Divider type='vertical'/>
                </span>
                : <Tag color='volcano'>{rDocument.type}</Tag>
        )
    }, {
        title: 'Internships',
        dataIndex: ['internship', 'name'],
        key: 'internship',
    }];

    const getRowKey = (_: any, index: any) => {
        return index;
    }

    const onRowSelected = (selectedRowKeys: React.Key[], selectedRows: SecretaryRequest[]) => {
        const requestsIds: string[] = selectedRows.map((row: SecretaryRequest) => row.internship.id);
        setRequestsIds(requestsIds);
    }

    const onValidateRequests = () => {
        console.log(requestsIds);
    }

    return (
        <div className={styles.table}>
            <Button type='primary' style={{alignSelf: 'end'}}
                    disabled={!requestsIds.length} onClick={onValidateRequests}>Validate Requests</Button>
            <Table key='s-r-table' columns={columns} dataSource={data}
                   rowKey={getRowKey} expandRowByClick
                   rowSelection={{
                       type: 'checkbox',
                       onChange: (selectedRowKeys: React.Key[], selectedRows: SecretaryRequest[]) =>
                           onRowSelected(selectedRowKeys, selectedRows)
                   }}/>
        </div>
    );
}

export default SecretaryRequests;
