import { defaultStore } from './default-state';
import {
  GET_ROOT_LEVEL_LOADING,
  GET_ROOT_LEVEL_FINISH,
  GET_ROOT_LEVEL_ERROR,
  OPEN_ITEM_LOADING,
  OPEN_ITEM_FINISH,
  OPEN_ITEM_ERROR,
  CLOSE_ITEM_ACTION,
  DRAG_START
} from '../actions';
import { findPreference, deepCoppy } from '../tools';

export function reducer (state = defaultStore, action) {
  let newState = Object.assign({}, state);

  let oldItem = null;
  let item = null;

  switch (action.type) {
    case GET_ROOT_LEVEL_LOADING:
      newState.listPreferences.loading = true;
    break;
    case GET_ROOT_LEVEL_FINISH:
      newState.listPreferences.preferences = [...action.payload.preferences];
      newState.listPreferences.loading = false;
    break;
    case GET_ROOT_LEVEL_ERROR:
      newState.listPreferences.error = action.payload.error.message;
      newState.listPreferences.loading = false;
    break;
    case OPEN_ITEM_LOADING:
      newState.listPreferences.loading = true;
    break;
    case OPEN_ITEM_FINISH:
      newState.listPreferences.loading = false;
      oldItem = findPreference(newState.listPreferences.preferences, action.payload.item.id);

      oldItem = Object.assign({}, action.payload.item);

      oldItem.open=true;
    break;
    case OPEN_ITEM_ERROR:
      newState.listPreferences.loading = false;
      newState.listPreferences.error = action.payload.error.message;
    break;
    case CLOSE_ITEM_ACTION:
      item = findPreference(
        newState.listPreferences.preferences,
        action.payload.id
      );

      item.open = false;

      newState.listPreferences.preferences = deepCoppy(newState.listPreferences.preferences);
    break;
    case DRAG_START:
        item = findPreference(
          newState.listPreferences.preferences,
          action.payload.id
        );

        item.dragOver = true;

        newState.listPreferences.preferences = deepCoppy(newState.listPreferences.preferences);
    default:
      return state;
  }

  return newState;
}