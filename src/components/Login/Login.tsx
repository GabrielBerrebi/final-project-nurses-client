import Layout from '../../layouts/Layout/Layout';
import {Button, Card, Form, Input, Space} from 'antd';
import styles from './Login.module.less'

const Login = () => {
    const [form] = Form.useForm();

    const resetForm = () => {
        form.resetFields();
    }

    const submitForm = (values: any) => {
        console.log(values);
    }

    return (
        <Layout>
            <div className={styles.login}>
                <Card title='Login' bordered={true} className={styles.card}>
                    <Form name='login' initialValues={{remember: true}} size='large' autoComplete='off'
                          onFinish={submitForm} className={styles.cardInputs} form={form}
                          labelCol={{span: 8}} wrapperCol={{span: 16}}>
                        <Form.Item label='Username' name='username'
                                   rules={[{required: true, type: 'email'}]}>
                            <Input/>
                        </Form.Item>
                        <Space/>
                        <Form.Item label='Password' name='password'
                                   rules={[{required: true}]}>
                            <Input.Password/>
                        </Form.Item>
                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type='primary' htmlType='submit' style={{marginRight: 16}}>Submit</Button>
                            <Button htmlType='reset' onClick={resetForm}>Reset</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </Layout>
    );
}

export default Login;
