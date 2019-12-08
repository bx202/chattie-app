import { put, takeLatest } from 'redux-saga/effects';
import {
  loginSuccess,
  loginFailure,
  getMessageSuccess,
  getMessageFailure,
} from './actions';
import { LOGIN_REQUEST, GET_MESSAGE_REQUEST } from './constant';

function* loginRequestHandler({ payload }) {
  try {
    yield put(loginSuccess(payload));
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* getMessageRequestHandler({ payload }) {
  try {
    yield put(getMessageSuccess(payload));
  } catch (err) {
    yield put(getMessageFailure(err));
  }
}

export default function* saga() {
  yield takeLatest(LOGIN_REQUEST, loginRequestHandler);
  yield takeLatest(GET_MESSAGE_REQUEST, getMessageRequestHandler);
}
