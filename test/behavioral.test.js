const { initialise } = require('../testDB/initialise');
const knex = require('../testDB/connect')
const { delay, queryFactory } = require('./util');

describe('Test Lucid chart Importer ', () => {
  beforeAll(async (done) => {
    await initialise();
    done();
  })

  it('it should return track name TEST and Track Status 2', async done => {
    const query = 'SELECT core.track.name, core.track."trackStatusId" FROM core.track;';
    const expected = {
      name: 'test',
      trackStatusId: 2
    }
    await queryFactory(query, track => {
      expect(track[0]).toEqual(expected);
    });
    done();
  })
  
  it('it should return silo Source, Stage1, Stage 2 and shelf', async done => {
    const query = 'SELECT core.silo.name FROM core.silo;'
    await queryFactory(query, siloNames => {
      const names = siloNames.map(silo => silo.name);
      expect(names).toEqual(expect.arrayContaining(['Source', 'Stage 1', 'Stage 2', 'Shelf']));
    });
    done();
  })

  afterAll(async (done) => {
    delay(5);
    await knex.destroy();
    done();
  })
});