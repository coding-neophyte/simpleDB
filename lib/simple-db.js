const fs = require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDb {
  constructor(dirPath) {
    this.dirPath = dirPath;
  }

  save(fileObj){
    const generatedId = shortid.generate();
    fileObj.id = generatedId;

    // const jsonId = JSON.parse(`${fileObj.id}.json`);
    const file = path.join(this.dirPath, `${fileObj.id}.json`);
    const stringedFile = JSON.stringify(fileObj);


    return fs.writeFile(file, stringedFile);
  }

  get(id){
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

  getAll(){

  }

}

module.exports = SimpleDb;
