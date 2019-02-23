import { preferencesRepository } from '../repositories/preferences-repository';

export const GET_ROOT_LEVEL_LOADING = 'GET_ROOT_LEVEL_LOADING';
export const GET_ROOT_LEVEL_FINISH = 'GET_ROOT_LEVEL_FINISH';
export const GET_ROOT_LEVEL_ERROR = 'GET_ROOT_LEVEL_ERROR';

export function getRootLoadingAction () {
  return {
    type: GET_ROOT_LEVEL_LOADING
  }
}

export function getRootFinishAction (rootPreferences) {
  return {
    type: GET_ROOT_LEVEL_FINISH,
    payload: {
      preferences: rootPreferences
    }
  }
}

export function getRootErrorAction (error) {
  return {
    type: GET_ROOT_LEVEL_ERROR,
    payload: {
      error: error
    }
  }
}

export function fetchRootPreferences() {
  return function (dispatch) {

    dispatch(getRootLoadingAction())

    return preferencesRepository.getRootLevel()
    .then((preferences) => {
      dispatch(getRootFinishAction(preferences));
    })
    .catch((error) => {
      dispatch(getRootErrorAction(error));
    });
  }
}
