import React, {useEffect, useState} from 'react';
import {Button, Divider, Form, Input, Modal, Select, Space, Table, Tag} from 'antd';
import {userStore} from '../../../stores';
import {secretaryFetcher} from '../../../fetchers';
import {ColumnsType} from 'antd/es/table';
import {RequiredDocument} from '../../../models/interfaces/RequiredDocument';
import styles from './tables.module.less';
import {SecretaryRequest} from '../../../models/interfaces/secretary/SecretaryRequest';
import {SecretaryFullInternship} from '../../../models/interfaces/secretary/SecretaryFullInternship';
import {SecretaryTutor} from '../../../models/interfaces/secretary/SecretaryTutor';
import {SecretaryHospital} from '../../../models/interfaces/secretary/SecretaryHospital';

const SecretaryRequests = () => {
    const [data, setData] = useState<SecretaryRequest[] | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [internships, setInternships] = useState<SecretaryFullInternship[] | undefined>(undefined);
    const [tutors, setTutors] = useState<SecretaryTutor[] | undefined>(undefined);
    const [hospitals, setHospitals] = useState<SecretaryHospital[] | undefined>(undefined);
    const [selectedRequest, setSelectedRequest] = useState<SecretaryRequest>();
    const [selectedRequests, setSelectedRequests] = useState<SecretaryRequest[]>([]);
    const [isValidateRequestLoading, setIsValidateRequestLoading] = useState<boolean>(false);
    const [form] = Form.useForm();
    const id: string = userStore.getId();

    const getAllRequests = async () => {
        if (id === '') return;
        const requests = await secretaryFetcher.getAllRequests();
        setData(requests.data as unknown as SecretaryRequest[]);
    }

    const getAllInternships = async () => {
        if (id === '') return;
        const internships = await secretaryFetcher.getAllInternships();
        setInternships(internships.data as unknown as SecretaryFullInternship[]);
    }

    const getAllHospitals = async () => {
        if (id === '') return;
        const internships = await secretaryFetcher.getAllHospitals();
        setHospitals(internships.data as unknown as SecretaryHospital[]);
    }

    const getAllTutors = async () => {
        if (id === '') return;
        const internships = await secretaryFetcher.getAllTutors();
        setTutors(internships.data as unknown as SecretaryTutor[]);
    }

    useEffect(() => {
        getAllRequests();
        getAllInternships();
        getAllHospitals();
        getAllTutors();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

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
    }, {
        title: 'Actions',
        dataIndex: '',
        key: 'selfInvestment',
        render: (request: SecretaryRequest) => <Button onClick={() => {
            setSelectedRequest(request);
            form.setFieldValue('id_internship', request.internship.id);
            form.setFieldValue('id_student', request.student.id);
            showModal();
        }}>Invest</Button>
    }];

    const getRowKey = (_: any, index: any) => {
        return index;
    }

    const onRowSelected = (selectedRowKeys: React.Key[], selectedRows: SecretaryRequest[]) => {
        setSelectedRequests(selectedRows);
    }

    const onValidateRequests = async () => {
        setIsValidateRequestLoading(true);
        const requestsToSend: object[] = [];
        selectedRequests.forEach((request: SecretaryRequest) => {
            requestsToSend.push({'id_student': request.student.id, 'id_internship': request.internship.id});
        })

        await secretaryFetcher.runAlgoRequestInternship({'studentInternship': requestsToSend});
        setIsValidateRequestLoading(false);
        getAllRequests();
    }

    const onFinishManualInvestment = async () => {
        const investment = form.getFieldsValue();
        const result = await secretaryFetcher.putInternship(investment);
        console.warn(result);
        getAllRequests();
    }

    return (
        <div className={styles.table}>
            <Button type='primary' style={{alignSelf: 'end'}} loading={isValidateRequestLoading}
                    disabled={!selectedRequests.length} onClick={onValidateRequests}>Validate Requests</Button>
            <Modal open={open} title='Manual Investment' onCancel={hideModal} onOk={form.submit}>
                <Form form={form} onFinish={onFinishManualInvestment}
                      labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item name='id_internship' hidden>
                        <Input defaultValue={selectedRequest?.internship.id} disabled/>
                    </Form.Item>
                    <Form.Item name='id_student' hidden>
                        <Input defaultValue={selectedRequest?.student.id} disabled/>
                    </Form.Item>

                    <Form.Item label='Student'
                               rules={[{required: true}]}>
                        <Input defaultValue={selectedRequest?.student.name} disabled/>
                    </Form.Item>
                    <Form.Item label='Internship'
                               rules={[{required: true}]}>
                        <Input defaultValue={selectedRequest?.internship.name} disabled/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Tutors' name='tutorId' rules={[{required: true}]}>
                        <Select
                            placeholder="Select the tutors that instruct this internship"
                            optionLabelProp="label"
                        > {tutors?.map((tutor: SecretaryTutor) =>
                            <Select.Option key={tutor.id} value={tutor.id}
                                           label={tutor.name}>{tutor.name}</Select.Option>
                        )}
                        </Select>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Hospitals' name='id_hospital' rules={[{required: true}]}>
                        <Select
                            placeholder="Select the hospitals that host this internship"
                            optionLabelProp="label"
                        > {hospitals?.map((hospital: SecretaryHospital) =>
                            <Select.Option key={hospital.id} value={hospital.id}
                                           label={hospital.name}>{hospital.name}</Select.Option>
                        )}
                        </Select>
                    </Form.Item>
                    <Space/>
                </Form>
            </Modal>
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
