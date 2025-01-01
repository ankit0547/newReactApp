export const authActionTypes = {
  SET_USER_AUTH: "SET_USER_AUTH",
  FETCH_USER_PERMISSIONS: "FETCH_USER_PERMISSIONS",
  FETCH_USER_PERMISSIONS_SUCCESS: "FETCH_USER_PERMISSIONS_SUCCESS",
  FETCH_USER_PERMISSIONS_FAILURE: "FETCH_USER_PERMISSIONS_FAILURE",
};

export const fetchUserPermissions = () => ({
  type: authActionTypes.FETCH_USER_PERMISSIONS,
});

export const fetchUserPermissionsSuccess = (data) => ({
  type: authActionTypes.FETCH_USER_PERMISSIONS_SUCCESS,
  payload: data,
});

export const fetchUserPermissionsFailure = (error) => ({
  type: authActionTypes.FETCH_USER_PERMISSIONS_FAILURE,
  payload: error,
});
