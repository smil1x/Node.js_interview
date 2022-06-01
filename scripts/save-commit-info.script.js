/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const childProcess = require('child_process');
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const fs = require('fs');
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const path = require('path');

try {
  const branch = childProcess.execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  const commit = childProcess.execSync('git rev-parse HEAD').toString().trim();
  const authorName = childProcess.execSync("git log -1 --pretty=format:'%an'").toString().trim();
  const commitTime = childProcess.execSync("git log -1 --pretty=format:'%cd'").toString().trim();
  const commitMsg = childProcess.execSync('git log -1 --pretty=%B').toString().trim().replace(/\n+/g, '; ');
  const lastCommitInfo = {
    branch,
    commit,
    authorName,
    commitTime,
    commitMsg,
  };

  const lastCommitInfoJson = JSON.stringify(lastCommitInfo, null, 2);

  const appName = JSON.parse(process.env.npm_config_argv).original[2];
  if (appName) {
    const appFolder = appName.replace(/"/g, '');
    fs.mkdirSync(path.resolve(__dirname, '..', 'dist', 'apps', appFolder), { recursive: true });
    fs.writeFileSync(path.resolve(__dirname, '..', 'dist', 'apps', appFolder, 'commit-info.json'), lastCommitInfoJson);
  } else {
    console.log('save-commit-info.scripts.js: failed to write commit info');
  }
} catch (e) {
  console.log('save-commit-info.scripts.js:', e.message);
}
