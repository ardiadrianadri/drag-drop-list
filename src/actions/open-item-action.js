export function openItemAction(id) {
  return {
    type: 'OPEN_ITEM',
    payload: {
      id: id
    }
  };
}