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

    const jsonId = JSON.parse(`${fileObj.id}.json`);
    const file = path.join(this.dirPath, jsonId);
    const stringedFile = JSON.stringify(file);

    return fs.writeFile(file, stringedFile);
  }

}

module.exports = SimpleDb;
