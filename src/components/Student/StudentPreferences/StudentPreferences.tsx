import {Button, Card, Form, Select, Space, Switch} from 'antd';

const StudentPreferences = () => {
    const [form] = Form.useForm();

    const FamilyCard = () => {
        return (
            <Card title='Family'>
                {/*<Form form={form}*/}
                {/*      labelCol={{span: 8}} wrapperCol={{span: 16}}>*/}
                {/*    <Form.Item label='Name' name='name'*/}
                {/*               rules={[{required: true}]}>*/}
                {/*        <Input/>*/}
                {/*    </Form.Item>*/}
                {/*    <Space/>*/}
                {/*    <Form.Item label='Location' name='location'*/}
                {/*               rules={[{required: true}]}>*/}
                {/*        <Input/>*/}
                {/*    </Form.Item>*/}
                {/*</Form>*/}

                {/*<Space size='middle'>*/}
                {/*    <span>Are you married?</span>*/}
                {/*    <Switch/>*/}
                {/*</Space>*/}
                {/*<Divider/>*/}
                {/*<Space size='middle'>*/}
                {/*    <span>How many children have you?</span>*/}
                {/*    <Select>*/}
                {/*        {[0, 1, 2, 3, 4, 5].map((numChild: number) =>*/}
                {/*            <Select.Option key={numChild} value={numChild}>{numChild}</Select.Option>)}*/}
                {/*    </Select>*/}
                {/*</Space>*/}

                <Button onClick={() => form.submit}>Show</Button>
                <Form name='family' form={form} labelCol={{span: 20}} size='middle'
                      onFinish={(e) => console.log(e)}>
                    <Form.Item label='Are you married?' name='isMarried' valuePropName='checked'>
                        <Switch/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='How many children have you?' name='childrenNumber'>
                        <Select>
                            {[0, 1, 2, 3, 4, 5].map((numChild: number) =>
                                <Select.Option key={numChild} value={numChild}>{numChild}</Select.Option>)}
                        </Select>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Do you work?' name='isWorking' valuePropName='checked'>
                        <Switch/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Do you have a car?' name='haveACar' valuePropName='checked'>
                        <Switch/>
                    </Form.Item>
                    <Space/>
                    <Form.Item label='Do you have any disability?' name='haveDisability' valuePropName='checked'>
                        <Switch/>
                    </Form.Item>
                    <Space/>
                </Form>

            </Card>
        );
    }

    return (
        <Space>
            <FamilyCard/>
        </Space>
    );
}

export default StudentPreferences;
