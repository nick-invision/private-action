const exec = require('@actions/exec');
const core = require('@actions/core');
const git = require('simple-git');

const GITHUB_TOKEN = core.getInput('github-token', {required: true});
const GITHUB_REPO = core.getInput('github-repo', {required: true});

async function run() {

  const envs = Object.keys(process.env).filter(e=>e.startsWith('INPUT_'));

  core.debug(envs)

  core.debug('workspace')
  await exec.exec('ls -a')
  
  core.debug('cwd')
  core.debug(process.cwd())

  core.debug('docker version');
  await exec.exec('docker', [
    'version',
  ]);

  core.debug('docker status');
  await exec.exec('sudo', [
    'systemctl',
    'status',
    'docker',
  ]);
}

run().then(() => {
  console.log('Run success');
}).catch((e) => {
  core.setFailed(e.toString());
});
