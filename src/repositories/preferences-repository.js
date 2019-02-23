import { preferencesDatasource } from '../datasources/preferences-datasource';

export const preferencesRepository = {
    _setPrefernces (preferences) {
        return preferences.map((preference) => {
            if (preference.list) {
                preference.list = this._setPrefernces(list);
                preference.header = true;
                preference.open = true;
            }

            return preference;
        });
    },
    async findPreferences() {
        const preferences = await preferencesDatasource.findPreferences();
        return this._setPrefernces(preferences);
    },
    async savePrefences(preferences) {
        
    }
}