const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
// const { v4: uuidv4 } = require('uuid');

class SRSGenerator {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
  }

  _createPrompt() {
    return `Generate: SRS\nName: ${this.name}\nDescription: ${this.description}\n`;
  }

  async initProcess(prompt) {
    return new Promise((resolve, reject) => {
      const nodeProcess = spawn('nodemon', ['app.js', prompt]);

      let result = '';

      nodeProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      nodeProcess.stderr.on('data', (data) => {
        console.error(`Error: ${data}`);
        reject(data.toString());
      });

      nodeProcess.on('close', (code) => {
        if (code === 0) {
          resolve(result);
        } else {
          reject(`Node script exited with code ${code}`);
        }
      });
    });
  }

  // TODO: convert to pdf
  async generate() {
    const prompt = this._createPrompt();
    const result = await this.initProcess(prompt);

    const currentTimestamp = Date.now();
    const fileName = `${currentTimestamp}_${this.name.replace(/\s+/g, '-').toLowerCase()}.pdf`;

    // Placeholder for PDF conversion
    // fs.writeFileSync(fileName, result);

    return {
      fileUrl: `http://127.0.0.1:5000/documents/${fileName}`,
    };
  }
}

module.exports = { SRSGenerator };
