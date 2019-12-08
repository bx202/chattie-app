import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import AWSAppSyncClient from 'aws-appsync';
import { Rehydrated } from 'aws-appsync-react';
import Amplify, { Auth } from 'aws-amplify';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import amplifyConfig from './aws-exports';
import App from './App';
import reduxStore from './store';
import './index.css';
import * as serviceWorker from './serviceWorker';

Amplify.configure(amplifyConfig);

const client = new AWSAppSyncClient({
  url: amplifyConfig.aws_appsync_graphqlEndpoint,
  region: amplifyConfig.aws_appsync_region,
  userPoolId: amplifyConfig.aws_user_pools_id,
  userPoolWebClientId: amplifyConfig.aws_user_pools_web_client_id,
  auth: {
    type: amplifyConfig.aws_appsync_authenticationType,
    jwtToken: async () => (await Auth.currentSession()).idToken.jwtToken,
  },
});

ReactDOM.render(
  <Provider store={reduxStore}>
    <ApolloProvider client={client}>
      <Rehydrated>
        <App />
      </Rehydrated>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
