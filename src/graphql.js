import graphql from 'graphql-tag';
import gql from 'graphql-tag';

const getUser = graphql`
  query getUser($id: ID!) {
    getUser(id: $id) {
      id
      username
    }
  }
`;

const createUser = `
  mutation($username: String!) {
    createUser(input: {
      username: $username
    }) {
      id
      username
      createdAt
    }
  }
`;

const listUsers = graphql`
  query listUsers {
    listUsers(limit: 1000) {
      items {
        id
        username
        createdAt
      }
    }
  }
`;

const onCreateUser = gql`
  subscription OnCreateUser {
    onCreateUser {
      id
      username
      createdAt
    }
  }
`;

const getMessage = graphql`
  query getMessage($title: String!) {
    getMessage(title: $title) {
      id
      author
      content
      createdAt
    }
  }
`;

const listMessages = graphql`
  query listMessages {
    listMessages(limit: 1000) {
      items {
        id
        author
        title
        content
        createdAt
      }
    }
  }
`;

const createMessage = `
  mutation($title: String!, $author: String!, $content: String!) {
    createMessage(input: {
      title: $title,
      author: $author,
      content: $content
    }) {
      id
      title
      author
      content
      createdAt
    }
  }
`;

const onCreateMessage = gql`
  subscription OnCreateMessage {
    onCreateMessage {
      id
      author
      title
      content
      createdAt
    }
  }
`;

export {
  getUser,
  createUser,
  listUsers,
  onCreateUser,
  getMessage,
  createMessage,
  listMessages,
  onCreateMessage,
};
