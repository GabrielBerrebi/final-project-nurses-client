import {Button, Result} from "antd"
import {useNavigate} from 'react-router-dom';
import Layout from '../../wrappers/Layout/Layout';

const NotExistPage = () => {
    const navigate = useNavigate();

    return (
        <Layout>
            <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist."
                    extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}/>
        </Layout>
    );
}
export default NotExistPage
