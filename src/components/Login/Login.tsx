import Layout from '../../wrappers/Layout/Layout';
import {Alert, Button, Card, Form, Input, Space} from 'antd';
import styles from './Login.module.less'
import {loginFetcher} from '../../fetchers';
import {User} from '../../models/interfaces/User';
import {userStore} from '../../stores';
import {UserFromLogin} from '../../models/interfaces/UserFromLogin';
import {useState} from 'react';
import {Navigate} from 'react-router-dom';

const Login = () => {
    const [showAlert, setShowAlert] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [form] = Form.useForm();

    const resetForm = () => {
        form.resetFields();
    }

    const submitForm = async (user: User) => {
        setIsLoading(true);
        const response = await loginFetcher.login(user);
        if (response.data) {
            const user: UserFromLogin = response.data;
            userStore.setUser(user);
            setIsAuth(true);
        } else {
            setShowAlert(true);
        }
        setIsLoading(false);
    }

    if (isAuth) {
        return <Navigate to='/student' replace/>;
    }

    return (
        <Layout>
            {showAlert &&
                <Alert message='It seems the login has failed. Please, try again.' type='error' closable showIcon/>}

            <div className={styles.login}>
                <Card title='Login' bordered={true} className={styles.card}>
                    <Form name='login' initialValues={{remember: true}} size='large' autoComplete='off'
                          onFinish={submitForm} className={styles.cardInputs} form={form}
                          labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        <Form.Item label='Username' name='email'
                                   rules={[{required: true, type: 'email'}]}>
                            <Input/>
                        </Form.Item>
                        <Space/>
                        <Form.Item label='Password' name='password'
                                   rules={[{required: true}]}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type='primary' htmlType='submit' style={{marginRight: 16}}
                                    loading={isLoading}>Submit</Button>
                            <Button htmlType='reset' onClick={resetForm}>Reset</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Layout>
    );
}

export default Login;
