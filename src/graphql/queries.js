// eslint-disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    createdAt
    updatedAt
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      username
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
export const getMessage = `query GetMessage($id: ID!) {
  getMessage(id: $id) {
    id
    title
    author
    content
    createdAt
    updatedAt
  }
}
`;
export const listMessages = `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      title
      author
      content
      createdAt
      updatedAt
    }
    nextToken
  }
}
`;
