import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { List, Avatar } from 'antd';
import { connect } from 'react-redux';
import { getMessageRequest } from '../../redux/actions';
import { listUsers, onCreateUser as OnCreateUser } from '../../graphql';

class Users extends Component {
  componentDidMount() {
    const { subscribeToNewMessages } = this.props;
    subscribeToNewMessages();
  }

  handleClick = selectedName => {
    const { getMessage, username } = this.props;
    const members = [username, selectedName].sort();
    const title = members.join(' and ');
    getMessage({ otherUsername: selectedName, title });
  };

  render() {
    const { users } = this.props;
    return (
      <List
        itemLayout="horizontal"
        dataSource={users}
        renderItem={item => (
          <List.Item
            onClick={() => this.handleClick(item.username)}
            style={{ cursor: 'pointer' }}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
              }
              title={item.username}
            />
          </List.Item>
        )}
      />
    );
  }
}

const mapStateToProps = state => ({
  username: state.username,
});

const mapDispatchToProps = {
  getMessage: getMessageRequest,
};

const UsersWithData = compose(
  graphql(listUsers, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: props => {
      return {
        users: props.data.listUsers ? props.data.listUsers.items : [],
        subscribeToNewMessages: () => {
          props.data.subscribeToMore({
            document: OnCreateUser,
            updateQuery: (
              prev,
              {
                subscriptionData: {
                  data: { onCreateUser },
                },
              },
            ) => {
              let userArray = prev.listUsers.items.filter(
                item => item.id !== onCreateUser.id,
              );
              userArray = [...userArray, onCreateUser];

              return {
                ...prev,
                listUsers: {
                  ...prev.listUsers,
                  items: userArray,
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
)(Users);

export default UsersWithData;
