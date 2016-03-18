
export function authRequest() {
  return {
    type: 'AUTH_REQUEST',
    payload: {
      isFetching: true,
      isAuthenticated: false,
    }
  }
};

export function authReceive(user) {
  return {
    type: 'AUTH_SUCCESS',
    payload: {
      isFetching: false,
      isAuthenticated: true,
    }
  }
};

export function authError(message) {
  return {
    type: 'AUTH_FAILURE',
    payload: {
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }
};
