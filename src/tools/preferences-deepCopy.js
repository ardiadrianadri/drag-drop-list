export function deepCoppy ( preferences ) {
  let result = [];

  for (const item of preferences) {
    if (item.list) {
      item.list = deepCoppy(item.list).slice(0);
    }

    result.push(Object.assign({}, item));
  }

  return result;
}