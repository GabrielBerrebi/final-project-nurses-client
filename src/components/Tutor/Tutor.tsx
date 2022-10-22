import {observer} from 'mobx-react';
import Layout from '../../wrappers/Layout/Layout';
import styles from './Tutor.module.less';
import {useEffect, useState} from 'react';
import {userStore} from '../../stores';
import {tutorInternshipFetcher} from '../../fetchers';
import {TutorInternship} from '../../models/interfaces/TutorInternship';
import {Table} from 'antd';
import {ColumnsType} from 'antd/es/table';

const TutorList = () => {
    const [data, setData] = useState<TutorInternship[] | undefined>(undefined);
    const id: string = userStore.getId();

    const getStudentInternships = async () => {
        if (id === '') return;
        const internships = await tutorInternshipFetcher.getTutorInternship(id);
        setData(internships.data as unknown as TutorInternship[]);
    }

    useEffect(() => {
        getStudentInternships();
    }, []);

    const columns: ColumnsType<TutorInternship> = [{
        title: 'Internship Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a: TutorInternship, b: TutorInternship) => a?.name.localeCompare(b?.name)
    }, {
        title: 'Student Name',
        dataIndex: 'studentName',
        key: 'studentName',
        sorter: (a: TutorInternship, b: TutorInternship) => a?.studentName.localeCompare(b?.studentName)
    }, {
        title: 'Hospital Name',
        dataIndex: 'hospitalName',
        key: 'hospitalName',
        sorter: (a: TutorInternship, b: TutorInternship) => a?.hospitalName.localeCompare(b?.hospitalName)
    }];

    return (
        <Table columns={columns} dataSource={data}/>
    );
}

const Tutor = observer(() => {
    return <Layout>
        <div className={styles.tutor}>
            <TutorList/>
        </div>
    </Layout>
});

export default Tutor
