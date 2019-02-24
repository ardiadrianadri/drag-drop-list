export const DRAG_START = 'DRAG_START';

export function dragStartAction (id) {
  return {
    type: DRAG_START,
    payload: {
      id: id
    }
  }
}