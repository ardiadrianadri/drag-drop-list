import { preferencesDatasource } from './preferences-datasource';

describe('Test for preferenceDatasource', () => {

  const mockSessionStorage = {
    getItem: function(key) {
      expect(preferencesDatasource._datakey).toBe(key);

      return JSON.stringify([
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
      ]);
    },
    setItem: jest.fn(() => {})
  };

  describe('findPreferencesListById', () => {

    beforeEach(() => {
      Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });
    });
    
    it('should return the first level of preferences if it does not get any id', (done) => {
      const original = JSON.parse(sessionStorage.getItem(preferencesDatasource._datakey));
      const leng = original.length;
      preferencesDatasource
        .findPreferencesListById()
        .then((result) => {
          expect(leng).toBe(result.length);
          for (let i = 0; i < leng; i++) {
            expect(original[i].id).toBe(result[i].id);
            expect(original[i].icon).toBe(result[i].icon);
            expect(original[i].title).toBe(result[i].title);
          }

          done();
        })
        .catch(() => {
          done.fail('It should not fail');
        });
    });

    it('should return an empty array if the id does not exist', (done) => {
      preferencesDatasource.findPreferencesListById(20)
      .then((result) => {
        expect(result.length).toBe(0);

        done();
      })
      .catch(() => {
        done.fail('It should not fail');
      })
    });

    it('should return the list of the preferences children if it gets a valid id', (done) => {
      const original = JSON.parse(sessionStorage.getItem(preferencesDatasource._datakey));
      const children = original[0].list;
      const leng = children.length;

      preferencesDatasource.findPreferencesListById(0)
      .then((result) => {
        expect(result.length).toBe(leng);

        for (let i = 0; i < leng; i++) {
          expect(children[i].id).toBe(result[i].id);
          expect(children[i].icon).toBe(result[i].icon);
          expect(children[i].title).toBe(result[i].title);
        }

        done();        
      })
      .catch(() => {
        done.fail('It should not fail');
      });
    });
  });

  describe('removeItemById', () => {

    beforeEach(() => {
      Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });
    });

    it('should not change the list of preference if the id does not exist', (done) => {
      const original = JSON.parse(sessionStorage.getItem(preferencesDatasource._datakey));
      const leng = original.length;

      preferencesDatasource.removeItemById(20)
      .then(() => {
        const lastCall = mockSessionStorage.setItem.mock.calls.length - 1
        const newPreferences = JSON.parse(mockSessionStorage.setItem.mock.calls[lastCall][1]);

        expect(newPreferences.length).toBe(leng);
        
        for(let i = 0; i < leng; i++) {
          expect(newPreferences[i].list.length).toBe(original[i].list.length);
        }

        done();
      })
      .catch(() => {
        done.fail('It should not fail');
      });
    });

    it('should remove a preference of root level if the id match with it', (done) => {
      const original = JSON.parse(sessionStorage.getItem(preferencesDatasource._datakey));
      const leng = original.length;

      preferencesDatasource.removeItemById(3)
      .then(() => {
        const lastCall = mockSessionStorage.setItem.mock.calls.length - 1
        const newPreferences = JSON.parse(mockSessionStorage.setItem.mock.calls[lastCall][1]);

        expect(newPreferences.length).toBe(leng - 1);
        expect(newPreferences[0].id).toEqual(original[0].id);
        expect(newPreferences[1].id).toEqual(original[2].id);

        done();
      })
      .catch((error) => {
        done.fail('It should not fail');
      });
    });

    it('should remove a childre preference if the id matcha with it', (done) => {
      const original = JSON.parse(sessionStorage.getItem(preferencesDatasource._datakey));
      const children = original[0].list;
      const leng = children.length;

      preferencesDatasource.removeItemById(6)
      .then(() => {
        const lastCall = mockSessionStorage.setItem.mock.calls.length - 1
        const newPreferences = JSON.parse(mockSessionStorage.setItem.mock.calls[lastCall][1]);
        const newChildrens = newPreferences[0].list;
        expect(newChildrens.length).toBe(leng - 1);
        expect(newChildrens[0].id).toBe(children[0].id);
        expect(newChildrens[1].id).toBe(children[2].id);

        done();
      })
      .catch(() => {
        done.fail('It should not fail');
      })
    });
  });

  describe('saveInBackPreferences', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'sessionStorage', { value: mockSessionStorage });
    });

    it('should move a item at the root if the parentId is not an input', (done) => {
      const original = JSON.parse(sessionStorage.getItem(preferencesDatasource._datakey));
      const item11 = original[2].list[2];

      preferencesDatasource.saveInBackPreferences(11,0,3)
      .then(() => {
        const lastCall = mockSessionStorage.setItem.mock.calls.length - 1
        const newPreferences = JSON.parse(mockSessionStorage.setItem.mock.calls[lastCall][1]);

        expect(item11.id).toBe(newPreferences[1].id);
        done();
      })
      .catch(() => { done.fail('it should not fail'); })
    });

    it('should move a item from one list to other if the parentId is filled', (done) => {
      const original = JSON.parse(sessionStorage.getItem(preferencesDatasource._datakey));
      const item6 = original[0].list[1];

      preferencesDatasource.saveInBackPreferences(6,5,7,3)
      .then(() => {
        const lastCall = mockSessionStorage.setItem.mock.calls.length - 1
        const newPreferences = JSON.parse(mockSessionStorage.setItem.mock.calls[lastCall][1]);

        expect(item6.id).toBe(newPreferences[1].list[2].id);
        done();
      })
      .catch(() => { done.fail('It should not fail'); })
    });

    it('should create a new header if a preference is moved under an item without list', (done) => {
      const original = JSON.parse(sessionStorage.getItem(preferencesDatasource._datakey));
      const item6 = original[0].list[1];

      preferencesDatasource.saveInBackPreferences(6, null, null, 5)
      .then(() => {
        const lastCall = mockSessionStorage.setItem.mock.calls.length - 1
        const newPreferences = JSON.parse(mockSessionStorage.setItem.mock.calls[lastCall][1]);

        expect(item6.id).toBe(newPreferences[1].list[1].list[0].id);
        expect(newPreferences[1].list[1].header).toBe(true);
        done();
      })
      .catch(() => { done.fail('It should not fail'); });
    });
  });
});
