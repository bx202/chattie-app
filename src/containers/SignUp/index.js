import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { Form, Input, Button, notification } from 'antd';
import { createUser } from '../../graphql';
import './style.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      confirmationCode: '',
      signedUp: false,
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { history } = this.props;
    const {
      signedUp,
      username,
      password,
      email,
      confirmationCode,
    } = this.state;

    if (!signedUp) {
      Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      })
        .then(() => {
          API.graphql(graphqlOperation(createUser, { username }))
            .then(() => {
              this.setState({
                signedUp: true,
              });
              notification.open({
                key: 'alert',
                message: 'Success',
              });
            })
            .catch(err => {
              notification.open({
                key: 'alert',
                message: 'Error',
                description: err.message,
              });
            });
        })
        .catch(err => {
          notification.open({
            key: 'alert',
            message: 'Error',
            description: err.message,
          });
        });
    } else {
      Auth.confirmSignUp(username, confirmationCode)
        .then(() => {
          history.push('/signin');
        })
        .catch(err =>
          notification.open({
            key: 'alert',
            message: 'Confirmation Error',
            description: err.message,
          }),
        );
    }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { signedUp } = this.state;

    if (signedUp) {
      return (
        <div className="register-panel">
          <h1>Chat App</h1>
          <div className="login-panel">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label="Username">
                <Input required name="username" onChange={this.handleChange} />
              </Form.Item>
              <Form.Item label="Confirmation Code">
                <Input
                  required
                  name="confirmationCode"
                  onChange={this.handleChange}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      );
    }
    return (
      <div className="register-panel">
        <h1>Chat App</h1>
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
            <Form.Item label="Email">
              <Input required name="email" onChange={this.handleChange} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Register
              </Button>
            </Form.Item>
            <Link to="/signin">
              <Form.Item>
                <Button type="primary" className="login-form-button">
                  Sign In
                </Button>
              </Form.Item>
            </Link>
          </Form>
        </div>
      </div>
    );
  }
}

export default SignUp;
