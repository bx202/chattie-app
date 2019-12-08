import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import { Form, Input, Button, notification } from 'antd';
import { loginReqeust } from '../../redux/actions';
import './style.css';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      signedIn: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { login } = this.props;
    const { username, password } = this.state;

    Auth.signIn({
      username,
      password,
    })
      .then(() => {
        login(username);
        this.setState({
          signedIn: true,
        });
      })
      .catch(err =>
        notification.open({
          key: 'alert',
          message: 'Error',
          description: err.message,
        }),
      );
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { history } = this.props;
    const { signedIn } = this.state;

    if (signedIn) {
      history.push('/chat');
    }

    return (
      <div className="login-wrapper">
        <h1 style={{ textAlign: 'center' }}>Chat App</h1>
        <div className="login-panel">
          <Form onSubmit={this.handleSubmit} className="login-form-wrapper">
            <Form.Item label="Username">
              <Input required name="username" onChange={this.handleChange} />
            </Form.Item>
            <Form.Item label="Password">
              <Input.Password
                required
                name="password"
                onChange={this.handleChange}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign In
              </Button>
            </Form.Item>
            <Link to="/signup">
              <Form.Item>
                <Button type="primary" className="login-form-button">
                  Register
                </Button>
              </Form.Item>
            </Link>
          </Form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login: loginReqeust,
};

export default connect(
  null,
  mapDispatchToProps,
)(withRouter(SignIn));
