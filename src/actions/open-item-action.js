import { preferencesRepository } from '../repositories/preferences-repository';

export const OPEN_ITEM_LOADING = 'OPEN_ITEM_LOADING';
export const OPEN_ITEM_FINISH = 'OPEN_ITEM_FINISH';
export const OPEN_ITEM_ERROR = 'OPEN_ITEM_ERROR';

export function openItemLoadingAction() {
  return {
    type: OPEN_ITEM_LOADING
  };
}

export function openItemFinishAction(id, preferences) {
  const action = {
    type: OPEN_ITEM_FINISH,
    payload: {
      id: id
    }
  };

  if (preferences) {
    action.payload.preferences = preferences;
  }

  return action;
}

export function openItemErrorAction (error) {
  return {
    type: OPEN_ITEM_ERROR,
    payload: {
      error: error
    }
  };
}

export function fetchOpenItem (id) {
  return function (dispatch) {
    dispatch(openItemLoadingAction());

    return preferencesRepository.openItem(id)
    .then((preferences) => {
      dispatch(openItemFinishAction(id, preferences));
    })
    .catch((error) => {
      dispatch(openItemErrorAction(error))
    });
  }
}
