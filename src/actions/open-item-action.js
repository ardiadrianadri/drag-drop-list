import { preferencesRepository } from '../repositories/preferences-repository';
import { findPreference } from '../tools';

export const OPEN_ITEM_LOADING = 'OPEN_ITEM_LOADING';
export const OPEN_ITEM_FINISH = 'OPEN_ITEM_FINISH';
export const OPEN_ITEM_ERROR = 'OPEN_ITEM_ERROR';

export function openItemLoadingAction() {
  return {
    type: OPEN_ITEM_LOADING
  };
}

export function openItemFinishAction(item, preferences) {
  const action = {
    type: OPEN_ITEM_FINISH,
    payload: {
      item: item
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
  return function (dispatch, getState) {
    dispatch(openItemLoadingAction());

    const preferences = getState().listPreferences.preferences;
    const item = findPreference(preferences, id);

    return preferencesRepository.openItem(item)
    .then((preferences) => {
      dispatch(openItemFinishAction(item, preferences));
    })
    .catch((error) => {
      dispatch(openItemErrorAction(error))
    });
  }
}
