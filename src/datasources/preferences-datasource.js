export function initDatasource () {
    const defaultConfiguration = [
        {
            id: 0,
            icon: 'group',
            title: 'Must have',
            must: true,
            header: true,
            list: [
                {
                    id: 1,
                    icon: 'settings',
                    title: 'CEO full time',
                    must: true
                },
                {
                    id: 6,
                    icon: 'flash_on',
                    title: 'CTO full time',
                    must: true
                },
                {
                    id: 2,
                    icon: 'devices',
                    title: '$1M <= Round < $10M',
                    must: true
                }
            ]
        },
        {
            id: 3,
            icon: 'group',
            title: 'Super nice to have',
            header: true,
            list: [
                {
                    id: 4,
                    icon: 'group',
                    title: 'Source of leads is personal contact'
                },
                {
                    id: 5,
                    icon: 'equalizer',
                    title: 'CEO repeat entrepeneur'
                },
                {
                    id: 7,
                    icon: 'accessibility_new',
                    title: '$50+K MRR'

                }
            ]
        },
        {
            id: 8,
            icon: 'group',
            title: 'Nice to have',
            header: true,
            list: [
                {
                    id: 9,
                    icon: 'group',
                    title: 'CEO worked at high growth startup'
                },
                {
                    id: 10,
                    icon: 'equalizer',
                    title: 'CTO with +2 years leading tech teams'
                },
                {
                    id: 11,
                    icon: 'accessibility_new',
                    title: 'Previous investors from top funds'
                }
            ]
        }
    ];

    sessionStorage.setItem('data', JSON.stringify(defaultConfiguration));
}

export const preferencesDatasource = {
    _datakey: 'data',
    findPreferencesListById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => { 
                try {
                    let result = [];
                    let listPreferences = JSON.parse(sessionStorage.getItem(this._datakey));
                    let onePreference;

                    if (id) {
                        onePreference = this._findItem(listPreferences, id);
                        result = ((onePreference) && (onePreference.list)) ? onePreference.list : [];
                    } else {
                        result = listPreferences;
                    }

                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }, 2000);
        })
    },

    _findItem(preferences, id) {
        let result = null;
        let leng = preferences.length;
        let index = 0;

        while((!result) && (index < leng)) {
            if (preferences[index].id === id) {
                result = preferences[index];
            } else if (preferences[index].list) {
                result = this._findItem(preferences[index].list, id);
            }

            index++;
        }

        return result;
    },

    _findIndex (preferences, id, start, end) {
        let found = false;
        let result;

        while ((!found) && (start < end)) {
            found = preferences[start++].id === id;
        }

        if (found) {
            result = start;
        } else {
            result = - 1;
        }

        return result;
    },

    _insertItem (preferences, preferenceItem, prevIndex, nextIndex) {
        const prevList = preferences.slice(0, prevIndex + 1);
        const nextList = preferences.slice(nextIndex, preferences.length);

        return [...prevList, preferenceItem, ...nextList];
    },

    _saveIn (preferences, preferenceItem, prevId, nextId) {
        let prevIndex = -1;
        let nextIndex = -1;

        if (prevId) {
            // Insert preference not in the first position
           prevIndex = this._findIndex(preferences, prevId, 0, preferences.length);

           if (prevIndex < 0) {
               throw new Error('Previous index not found');
           }
        } else {
            // Insert preference in the first position
            return [ preferenceItem, ...preferences];
        }

        if (nextId) {
            // Insert prefence not in the last position
           nextIndex = this._findIndex(preferences, nextId, prevIndex + 1, preferences.length);

           if (nextIndex < 0) {
               throw new Error('Next index not found');
           }

        } else {
            // Insert preference in the last position
            return [...preferences, preferenceItem ];
        }

        if (prevIndex < nextIndex) {
            return this._insertItem(preferences, preferenceItem, prevIndex, nextIndex);
        } else {
            throw new Error('Previus index is bigger than next index');
        }
       
    },

    _findItemAndFather (preferences, id) {
        const leng = preferences.length;
        const index = 0;
        
        let itemIndex = -1;
        let parents = null;

        while ((itemIndex < 0) && (index < leng)){
            if (preferences[index].id === id) {
                itemIndex = index;
                parents = preferences;
            } else if (preferences[index].list) {
                [itemIndex, parents] = this._findItemAndFather(preferences[index].list, id);
            }

            index ++;
        }

        return [itemIndex, parents];
    },

    _removeFromPreferences(preferences, index) {
        if (index === 0) {
            preferences.shift();
        } else {
            preferences.splice((index-1), 1);
        }
    },

    _checkHeaders(preferences) {
        for (const item of preferences) {
            if (item.list) {
                item.header = true;
                this._checkHeaders(item.list);
            } else {
                item.header = false;
            }
        }
    },

    _removeItemById(preferences, id) {
        const [itemIndex, listPreferences] = this._findItemAndFather(preferences, id);

        this._removeFromPreferences(listPreferences, itemIndex);
        this._checkHeaders(preferences);

        sessionStorage.setItem(this._datakey, JSON.stringify(preferences));
    },

    removeItemById(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const preferences = sessionStorage.getItem(this._datakey);
                    this._removeItemById(preferences, id);
                    resolve('OK');
                } catch(e) {
                    reject(e);
                }
            },2000);
        });
    },

    saveInBackPreferences(options) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const preferences = sessionStorage.getItem(this._datakey);
                    const item = this._findItem(preferences, options.itemId);

                    this._removeItemById(preferences, options.itemId);

                    let parentItem;


                    if (options.parentId) {
                        parentItem = this._findItem(preferences, options.parentId);

                        if (parentItem.list) {
                            parentItem.list = this._saveIn(parentItem.list, item, options.prevId, options.nextId);
                        } else {
                            parentItem.list = [item];
                            parentItem.header = true;
                        }
                    } else {
                        preferences = this._saveIn(preferences, item, options.prevId, options.nextId);
                    }

                    sessionStorage.setItem(this._datakey, JSON.stringify(preferences));
                    resolve('OK');
                    
                } catch (e) {
                    reject(e);
                }
            }, 2000);
        });
    }
}