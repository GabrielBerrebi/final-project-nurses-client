import {useEffect, useState} from 'react';
import {userStore} from '../../../stores';
import {secretaryFetcher} from '../../../fetchers';
import {ColumnsType} from 'antd/es/table';
import {Button, Form, Input, List, Modal, Popconfirm, Space, Table} from 'antd';
import {SecretaryInternship} from '../../../models/interfaces/secretary/SecretaryInternship';
import styles from './tables.module.less';
import {SecretaryHospital} from '../../../models/interfaces/secretary/SecretaryHospital';

const SecretaryHospitalsTable = () => {
    const [data, setData] = useState<SecretaryHospital[] | undefined>(undefined);
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm();
    const id: string = userStore.getId();

    const getAllHospitals = async () => {
        if (id === '') return;
        const internships = await secretaryFetcher.getAllHospitals();
        setData(internships.data as unknown as SecretaryHospital[]);
    }

    const onDeleteHospital = async (record: SecretaryHospital) => {
        await secretaryFetcher.deleteHospital(record.id);
        getAllHospitals();
    }

    const onCreateHospital = async (newHospital: object) => {
        await secretaryFetcher.createHospital(newHospital);
        hideModal();
        form.resetFields();
        getAllHospitals();
    }

    useEffect(() => {
        getAllHospitals();
    }, []);

    const showModal = () => {
        setOpen(true);
    };

    const hideModal = () => {
        setOpen(false);
    };

    const columns: ColumnsType<SecretaryHospital> = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    }, {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: SecretaryHospital, b: SecretaryHospital) => a?.name.localeCompare(b?.name)
    }, {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
        sorter: (a: SecretaryHospital, b: SecretaryHospital) => a?.location.localeCompare(b?.location)
    }, {
        title: 'Internships',
        dataIndex: '',
        key: 'internship.name',
        render: (hospital: SecretaryHospital) => <List>
            {hospital.internships?.map((internship: SecretaryInternship) =>
                <List.Item>{internship.name}</List.Item>
            )}
        </List>
    }, {
        title: 'Action',
        dataIndex: '',
        key: 'delete',
        render: (_, record: SecretaryHospital) =>
            <Popconfirm
                title="Are you sure to delete this hospital?"
                onConfirm={() => onDeleteHospital(record)}
                okText="Yes"
            > <Button type='default' danger>Delete</Button>
            </Popconfirm>
    }];

    return (
        <div className={styles.table}>
            <Button type='primary' className={styles.addButton} onClick={showModal}>Add</Button>
            <Modal title='Add a new Hospital' open={open} onCancel={hideModal}
                   onOk={form.submit} okText='Create'>
                <Form form={form} onFinish={onCreateHospital}
                      labelCol={{span: 8}} wrapperCol={{span: 16}}>
                    <Form.Item label='Name' name='name'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Location' name='location'
                               rules={[{required: true}]}>
                        <Input/>
                    </Form.Item>
                </Form>
            </Modal>
            <Table sticky key='s-t-table' columns={columns} dataSource={data}/>
        </div>
    );
}

export default SecretaryHospitalsTable;
