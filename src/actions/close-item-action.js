export const CLOSE_ITEM_ACTION = 'CLOSE_ITEM_ACTION'

export function closeItemAction (id) {
  return {
    type: CLOSE_ITEM_ACTION,
    payload: {
      id: id
    }
  };
}

