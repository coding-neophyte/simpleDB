const fs = require('fs/promises');
const path = require('path');
const SimpleDb = require('../lib/simple-db');

const { CI, HOME } = process.env;
const BASE_DIR = CI ? HOME : __dirname;
const TEST_DIR = path.join(BASE_DIR, 'test-dir');

describe('simple database', () => {

  beforeEach(async () => {
    await fs.rm(TEST_DIR, { force: true, recursive: true });
    await fs.mkdir(TEST_DIR, { recursive: true });
  });

  it('should save a file', async () => {
    const simpleDb = new SimpleDb(TEST_DIR);
    const newFile = {
      name: 'newfile.txt',
    };
    // const fileWithId = { id: expect.any(String), name: 'newfile.txt' };

    return simpleDb.save(newFile)
      .then(() => simpleDb.get(newFile.id))
      .then((file) => expect(file).toEqual({ ...newFile, id: expect.any(String) }));
  });

  it('should throw an error when no id exists', async () => {
    const simpleDb = new SimpleDb(TEST_DIR);
    const id = 'no id ';

    return simpleDb.get(id)
      .then((file) => expect(file).toEqual(null));
  });

  it('should get all files', async () => {
    const simpleDb = new SimpleDb(TEST_DIR);

    const file1 = {
      name: 'file1.txt'
    };
    const file2 = {
      name: 'file1.txt',
    };

    return simpleDb.save(file1)
      .then(() => simpleDb.save(file2))
      .then(() => simpleDb.getAll())
      .then((files) => expect(files).toEqual(expect.arrayContaining([file1, file2])));
  });

});
