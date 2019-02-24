export function findPreference(preferences, id) {
  const leng = preferences.length;

  let preference = null;
  let index = 0;

  while ((!preference) && (index < leng)) {
    if ( preferences[index].id === id ) {
      preference = preferences[index];
    } else if (preferences[index].list) {
      preference = findPreference(preferences[index].list, id);
    }

    index ++;
  }

  return preference;
}