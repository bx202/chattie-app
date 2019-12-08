import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import { API, graphqlOperation } from 'aws-amplify';
import { Input, Button, Card, Avatar, notification } from 'antd';
import uuid from 'uuid/v4';
import Users from '../../components/Users';
import {
  createMessage,
  listMessages,
  onCreateMessage as OnCreateMessage,
} from '../../graphql';
import { getMessageRequest } from '../../redux/actions';
import './style.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    const { subscribeToNewMessages } = this.props;
    subscribeToNewMessages();
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createMessage = () => {
    const { username, title } = this.props;
    const { content } = this.state;

    API.graphql(
      graphqlOperation(createMessage, {
        id: uuid(),
        title,
        author: username,
        content,
        createdAt: Date.now(),
      }),
    )
      .then(() => {
        this.setState({
          content: '',
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

  render() {
    const { username, otherUsername, messages, title } = this.props;
    const myMessage = messages.filter(message => message.title === title);
    const orderedMsg = myMessage.sort((a, b) => a.createdAt - b.createdAt);

    return (
      <>
        <div className="nav">
          <h1 className="heading">Chat App</h1>
        </div>
        <div className="container">
          <div className="user-list">
            <Users />
          </div>
          <div className="message">
            <div className="selected-user">
              <Card.Meta
                style={{ display: 'flex' }}
                avatar={
                  <Avatar
                    size={50}
                    style={{ backgroundColor: '#87d068' }}
                    icon="user"
                  />
                }
                title={otherUsername}
                description="Online"
              />
            </div>
            <div className="message-list">
              {orderedMsg.map((item, index) => {
                return (
                  <div
                    key={`${index.toString(10) + item.content}`}
                    className="message-item"
                    style={{
                      backgroundColor:
                        item.author === username
                          ? 'rgb(30, 80, 180)'
                          : 'rgb(180, 180, 180)',
                      color: item.author === username ? 'white' : 'black',
                      float: item.author === username ? 'right' : 'left',
                    }}
                  >
                    <span>{item.content}</span>
                  </div>
                );
              })}
            </div>
            <div className="message-input">
              <Input
                className="inputChat"
                name="content"
                onChange={this.handleChange}
                placeholder="Enter message"
              />
              <Button className="btnSend" onClick={this.createMessage}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
  otherUsername: state.otherUsername,
  title: state.title,
});

const mapDispatchToProps = {
  getMessage: getMessageRequest,
};

const ChatWithData = compose(
  graphql(listMessages, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => {
      return {
        messages: props.data.listMessages ? props.data.listMessages.items : [],
        subscribeToNewMessages: () => {
          props.data.subscribeToMore({
            document: OnCreateMessage,
            updateQuery: (
              prev,
              {
                subscriptionData: {
                  data: { onCreateMessage },
                },
              },
            ) => {
              let messageArray = prev.listMessages.items.filter(
                item => item.id !== onCreateMessage.id,
              );
              messageArray = [...messageArray, onCreateMessage];

              return {
                ...prev,
                listMessages: {
                  ...prev.listMessages,
                  items: messageArray,
                },
              };
            },
          });
        },
      };
    },
  }),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Chat);

export default ChatWithData;
