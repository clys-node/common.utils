const {src, dest, series} = require('gulp');
const babel = require('gulp-babel');
const del = require('del');
const {spawn} = require('child_process');
const isWin = process.platform === 'win32';
const spawnOptions = {};
if (isWin) {
  spawnOptions.shell = true;
}

const runCmd = (cmd, param, options = {}) => {
  return new Promise((resolve, reject) => {
    let cmdProcess = spawn(cmd, param, {...spawnOptions, ...options});
    cmdProcess.stdout.on('data', function (data) {
      process.stdout.write(data)
    });
    cmdProcess.stderr.on('data', function (data) {
      process.stderr.write(data)
    });
    
    cmdProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(code);
      }
    });
  })
};

const copyEs = () =>
  src('src/utils/*.js')
    .pipe(dest('es'));

const compileLib = () =>
  src('src/utils/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(dest('lib'));

const webpack = async (cb) => {
  await runCmd('npx', ['webpack', "--mode=production"]);
  cb();
};


const clear = (cb) => del(['lib', 'dist', 'es'], cb);

const publish = async (cb) => {
  await runCmd('npm', ['publish']);
  cb();
};

const build = series(clear, copyEs, compileLib, webpack);

exports.publish = series(build, publish);
exports.build = build;
exports.default = build;
