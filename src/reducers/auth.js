import * as Types from '../actions/types';

const initialState = '';

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case Types.SET_AUTHED_USER:
      return payload;

    default:
      return state;
  }
}
