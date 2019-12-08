import * as ActionTypes from './constant';

export const loginReqeust = payload => ({
  type: ActionTypes.LOGIN_REQUEST,
  payload,
});

export const loginSuccess = payload => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload,
});

export const loginFailure = err => ({
  type: ActionTypes.LOGIN_FAILURE,
  err,
});

export const getMessageRequest = payload => ({
  type: ActionTypes.GET_MESSAGE_REQUEST,
  payload,
});

export const getMessageSuccess = payload => ({
  type: ActionTypes.GET_MESSAGE_SUCCESS,
  payload,
});

export const getMessageFailure = err => ({
  type: ActionTypes.GET_MESSAGE_FAILURE,
  err,
});
