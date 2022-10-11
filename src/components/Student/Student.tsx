import {observer} from 'mobx-react';
import Layout from '../../wrappers/Layout/Layout';
import {Tabs} from 'antd';
import styles from './Student.module.less';

const TableTabs = () => {
    return (
        <Tabs className={styles.tabsBackground} size='large' items={[
            {key: 'Internships', label: 'Internships', children: <InternshipTableTabs />},
            {key: 'Attendances', label: 'Attendances', children: ''},
        ]}/>
    );
}

const InternshipTableTabs = () => {
    return (
        <Tabs className={styles.internshipTableTabs} tabPosition='left' size='small' items={[
            {key: 'Internships', label: 'Internships', children: 'Internships'},
            {key: 'Attendances', label: 'Attendances', children: 'Attendances'},
        ]}/>
    );
}

const Student = observer(() => {
    return (
        <Layout>
            <div className={styles.student}>
                <TableTabs/>
            </div>
        </Layout>
    );
});

export default Student;
