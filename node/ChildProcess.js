const {spawn: Spawn} = require('child_process');
const isWin = process.platform === 'win32';
const ChildProcess = {
  /**
   *
   * @param {string} cmd
   * @param options
   */
  runCmd(cmd, options) {
    return new Promise((resolve, reject) => {
      const params = cmd.replace(/\s/g, ' ').split(' ');
      let cmdProcess = Spawn(params.shift(), params, {
        shell: isWin,
        stdio: 'inherit',
        ...options
      });
      cmdProcess.on('close', (code) => code === 0 ? resolve() : reject(code))
    });
  }
};
module.exports = ChildProcess;