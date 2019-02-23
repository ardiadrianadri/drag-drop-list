import { preferencesDatasource } from '../datasources/preferences-datasource';

export const preferencesRepository = {
    _setPreferences (preference) {
        preference.open = false;

        return preference;
    },

    async getAllPreferences() {
        const preferences = await preferencesDatasource.findPreferencesListById();

        return preferences.map(this._setPreferences);
    },

    async openItem(item) {
        if (!item.list) {
            item.list =  await preferencesDatasource.findPreferencesListById(item.id);
        }

        item.open = true;

        return item;
    },

    closeItem(item) {
        item.open = false;
    }
};