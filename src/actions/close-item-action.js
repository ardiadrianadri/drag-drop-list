function closeItemAction (id) {
  return {
    type: 'CLOSE_ITEM_ACTION',
    payload: {
      id: id
    }
  };
}