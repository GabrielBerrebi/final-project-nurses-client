import {useEffect, useState} from 'react';
import {SecretaryTutor} from '../../../models/interfaces/secretary/SecretaryTutor';
import {userStore} from '../../../stores';
import {ColumnsType} from 'antd/es/table';
import {Button, Form, Input, List, Modal, Popconfirm, Space, Table} from 'antd';
import {secretaryFetcher} from '../../../fetchers';
import {SecretaryInternship} from '../../../models/interfaces/secretary/SecretaryInternship';
import styles from './tables.module.less'

const SecretaryTutorsTable = () => {
    const [data, setData] = useState<SecretaryTutor[] | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const id: string = userStore.getId();

    const getAllTutors = async () => {
        if (id === '') return;
        const internships = await secretaryFetcher.getAllTutors();
        setData(internships.data as unknown as SecretaryTutor[]);
    }

    const onDeleteTutor = async (record: SecretaryTutor) => {
        await secretaryFetcher.deleteTutor(record.id);
        getAllTutors();
    }

    const onCreateTutor = async (newTutor: object) => {
        await secretaryFetcher.createTutor(newTutor);
        hideModal();
        form.resetFields();
        getAllTutors();
    }

    useEffect(() => {
        getAllTutors();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const columns: ColumnsType<SecretaryTutor> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: SecretaryTutor, b: SecretaryTutor) => a?.name.localeCompare(b?.name)
    }, {
        title: 'Internships',
        dataIndex: '',
        key: 'internship.name',
        render: (tutor: SecretaryTutor) => <List>
            {tutor.internships.map((internship: SecretaryInternship) =>
                <List.Item>{internship.name}</List.Item>
            )}
        </List>
    }, {
        title: 'Action',
        dataIndex: '',
        key: 'delete',
        render: (_, record: SecretaryTutor) =>
            <Popconfirm
                title="Are you sure to delete this tutor?"
                onConfirm={() => onDeleteTutor(record)}
                okText="Yes"
            > <Button type='default' danger>Delete</Button>
            </Popconfirm>

    }];

    return (
        <div className={styles.table}>
            <Button type='primary' className={styles.addButton} onClick={showModal}>Add</Button>
            <Modal title='Add a new Tutor' open={open} onCancel={hideModal} onOk={form.submit} okText='Create'>
                <Form form={form} onFinish={onCreateTutor}
                      labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item label='Name' name='name'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Email' name='email'
                               rules={[{required: true, type: 'email'}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Password' name='password'
                               rules={[{required: true}]}>
                        <Input.Password/>
                    </Form.Item>
                </Form>
            </Modal>
            <Table key='s-t-table' columns={columns} dataSource={data}/>
        </div>
    );
}

export default SecretaryTutorsTable;
