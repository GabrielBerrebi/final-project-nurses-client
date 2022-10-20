import {observer} from 'mobx-react';
import Layout from '../../wrappers/Layout/Layout';
import {Tabs} from 'antd';
import styles from './Student.module.less';
import {userStore} from '../../stores';
import {studentInternshipFetcher} from '../../fetchers';
import MyInternshipsTable from './tables/MyInternshipsTable';
import RegisterTable from './tables/RegisterTable';
import UploadDocumentsTable from './tables/UploadDocumentsTable';

const TableTabs = () => {
    return (
        <Tabs className={styles.tabsBackground} size='large' items={[
            {key: 'Internships', label: 'Internships', children: <InternshipTableTabs/>},
            {key: 'Documents', label: 'Documents', children: <UploadDocumentsTable/>},
            {key: 'Attendances', label: 'Attendances', children: '', disabled: true},
        ]}/>
    );
}

const InternshipTableTabs = () => {
    return (
        <Tabs className={styles.internshipTableTabs} tabPosition='left' size='small' items={[
            {key: 'My Stages', label: 'My Stages', children: <MyInternshipsTable/>},
            {key: 'Register', label: 'Register', children: <RegisterTable/>},
        ]}/>
    );
}

const Student = observer(() => {
    const id = userStore.getId();

    const getStudentInternships = async () => {
        if (id === '') return;
        const internships = await studentInternshipFetcher.getStudentInternship(id);
        console.log(internships.data);
    }

    getStudentInternships();

    return (
        <Layout>
            <div className={styles.student}>
                <TableTabs/>
            </div>
        </Layout>
    );
});

export default Student;
