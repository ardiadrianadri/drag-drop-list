import { preferencesDatasource } from '../datasources/preferences-datasource';

export const preferencesRepository = {
    _setPreferences (preference) {
        preference.open = false;

        return preference;
    },

    async getRootLevel() {
        const preferences = await preferencesDatasource.findPreferencesListById();

        return preferences.map(this._setPreferences);
    },

    async openItem(item) {
        if (!item.list) {
            item.list =  await preferencesDatasource.findPreferencesListById(item.id);
        }

        item.open = true;

        return item;
    }
};