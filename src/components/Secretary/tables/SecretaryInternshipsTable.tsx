import {useEffect, useState} from 'react';
import {Button, Form, Input, Modal, Popconfirm, Select, Space, Table, Tag} from 'antd';
import {userStore} from '../../../stores';
import {secretaryFetcher} from '../../../fetchers';
import {ColumnsType} from 'antd/es/table';
import styles from './tables.module.less';
import {SecretaryFullInternship} from '../../../models/interfaces/secretary/SecretaryFullInternship';
import {RequiredDocumentType} from '../../../models/enums/RequiredDocumentType';
import {formatToPascalCase} from '../../../core/helpers/format-to-pascal-case';
import {SecretaryTutor} from '../../../models/interfaces/secretary/SecretaryTutor';
import {SecretaryHospital} from '../../../models/interfaces/secretary/SecretaryHospital';

const SecretaryInternshipsTable = () => {
    const [data, setData] = useState<SecretaryFullInternship[] | undefined>(undefined);
    const [tutors, setTutors] = useState<SecretaryTutor[] | undefined>(undefined);
    const [hospitals, setHospitals] = useState<SecretaryHospital[] | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const id: string = userStore.getId();

    const getAllInternships = async () => {
        if (id === '') return;
        const internships = await secretaryFetcher.getAllInternships();
        setData(internships.data as unknown as SecretaryFullInternship[]);
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

    const onDeleteInternship = async (record: SecretaryFullInternship) => {
        await secretaryFetcher.deleteInternship(record.id);
        getAllInternships();
    }

    const onCreateInternship = async (newInternship: object) => {
        await secretaryFetcher.createInternship(newInternship);
        hideModal();
        form.resetFields();
        getAllInternships();
    }

    useEffect(() => {
        getAllInternships();
        getAllTutors();
        getAllHospitals();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const columns: ColumnsType<SecretaryFullInternship> = [{
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
        render: (internship: SecretaryFullInternship) => <span>{internship?.tutors?.join(', ')}</span>
    }, {
        title: 'Documents',
        dataIndex: '',
        key: 'documents',
        render: (internship: SecretaryFullInternship) => internship.documents?.map((rDocument) =>
            <Tag color='blue'>{rDocument}</Tag>)
    }, {
        title: 'Action',
        dataIndex: '',
        key: 'delete',
        render: (_, record: SecretaryFullInternship) =>
            <Popconfirm
                title="Are you sure to delete this internship?"
                onConfirm={() => onDeleteInternship(record)}
                okText="Yes"
            > <Button type='default' danger>Delete</Button>
            </Popconfirm>
    }];

    const getRenderedExpansion = (record: SecretaryFullInternship) => {
        return (
            <Space size='middle' direction='vertical' style={{margin: 0}}>
                <strong>Description: </strong>
                <p>{record.description}</p>
            </Space>
        );
    }

    const getRowKey = (_: any, index: any) => {
        return index;
    }

    return (
        <div className={styles.table}>
            <Button type='primary' className={styles.addButton} onClick={showModal}>Add</Button>
            <Modal title='Add a new internship' open={open} onCancel={hideModal}
                   onOk={form.submit} okText='Create'>
                <Form form={form} onFinish={onCreateInternship}
                      labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item label='Name' name='name'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Tutors' name='tutors' rules={[{required: true}]}>
                        <Select
                            mode="multiple"
                            placeholder="Select the tutors that instruct this internship"
                            optionLabelProp="label"
                        > {tutors?.map((tutor: SecretaryTutor) =>
                            <Select.Option key={tutor.id} value={tutor.id}
                                           label={tutor.name}>{tutor.name}</Select.Option>
                        )}
                        </Select>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Hospitals' name='hospitals' rules={[{required: true}]}>
                        <Select
                            mode="multiple"
                            placeholder="Select the hospitals that host this internship"
                            optionLabelProp="label"
                        > {hospitals?.map((hospital: SecretaryHospital) =>
                            <Select.Option key={hospital.id} value={hospital.id}
                                           label={hospital.name}>{hospital.name}</Select.Option>
                        )}
                        </Select>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Required Documents' name='documents' rules={[{required: true}]}>
                        <Select
                            mode="multiple"
                            placeholder="Select the required documents"
                            optionLabelProp="label"
                        > {Object.values(RequiredDocumentType).map((doc: string) =>
                            <Select.Option key={doc} value={doc}
                                           label={formatToPascalCase(doc)}>{formatToPascalCase(doc)}</Select.Option>
                        )}
                        </Select>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Description' name='description'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            <Table key='s-i-table' columns={columns} dataSource={data} rowKey={getRowKey} sticky
                   expandable={{
                       expandedRowRender: record => getRenderedExpansion(record),
                       rowExpandable: record => !!record.description?.length,
                   }} expandRowByClick
            />
        </div>
    );
}

export default SecretaryInternshipsTable;
