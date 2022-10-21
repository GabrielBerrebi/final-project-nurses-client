import {observer} from 'mobx-react';
import Layout from '../../wrappers/Layout/Layout';
import styles from './Secretary.module.less';

const Secretary = observer(() => {
    return <Layout>
        <div className={styles.secretary}>
            <h1>Secretary</h1>
        </div>
    </Layout>
});

export default Secretary
