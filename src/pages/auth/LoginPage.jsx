import './LoginPage.less';
import React from 'react';
import { connect } from 'react-redux';
import * as authType from '../../actionTypes/authType';
import { Form, Layout, Icon, Input, Button } from 'antd';
const { Content } = Layout;
const FormItem = Form.Item;

class Login extends React.PureComponent {

  render() {

    const {getFieldDecorator} = this.props.form;
    const {currentUser: {loginStatus}} = this.props;

    return (
      <Layout className="Login">
        <Content className="wrap">
          <div className="logo-box">
            <h1>Login</h1>
            <div className="message">로그인 하세요</div>
          </div>

          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{required: true, message: '아이디를 입력해주세요.'}],
              })(
                <Input addonBefore={<Icon type="user"/>} placeholder="Username"/>,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{required: true, message: '비밀번호를 입력해주세요.'}],
              })(
                <Input addonBefore={<Icon type="lock"/>} type="password" placeholder="비밀번호"/>,
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                icon={`${loginStatus === 'REQUESTING' ? 'loading' : ''}`}
                className="login-form-button">Log in
              </Button>
            </FormItem>
          </Form>
        </Content>
      </Layout>
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        'password': fieldsValue['password'],
      };


      this.props.dispatch({type: authType.USER_LOGIN, payload: values, history: this.props.history});
    });
  };
}


function mapStateToProps(state) {

  return {
    currentUser: state.currentUser
  };
}

export default connect(mapStateToProps)(Form.create()(Login));
