const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  async save(fileObj){
    const generatedId = shortid.generate();
    fileObj.id = generatedId;

    // const jsonId = JSON.parse(`${fileObj.id}.json`);
    const file = path.join(this.dirPath, `${fileObj.id}.json`);
    const stringedFile = JSON.stringify(fileObj);


    return fs.writeFile(file, stringedFile);
  }

  async get(id){
    const file = path.join(this.dirPath, `${id}.json`);

    return fs.readFile(file, 'utf-8')
      .then((file) => JSON.parse(file))
      .catch((err) => {
        if(err.code === 'ENOENT'){
          return null;
        }
        throw err;
      });
  }

  async getAll(){
    const allFiles = await fs.readdir(this.dirPath);
    return Promise.all(allFiles.map((file) => fs.readFile(`${this.dirPath}/${file}`, 'utf-8')
      .then((files) => JSON.parse(files))
      .catch((err) => {
        if(err.code === 'ENOENT'){
          return null;
        }
        throw err;
      })));

  }

}

module.exports = SimpleDb;
