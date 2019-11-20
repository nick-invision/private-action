const exec = require('@actions/exec');
const core = require('@actions/core');

const GITHUB_TOKEN = core.getInput('github-token', {required: true});
const GITHUB_REPO = core.getInput('github-repo', {required: true});
const GITHUB_BRANCH = core.getInput('github-branch', {required: false});

const DEFAULT_BRANCH = 'master'
const WORKING_DIR = './.private-action'

async function run() {
  const repo = `https://${GITHUB_TOKEN}@github.com/${GITHUB_REPO}.git`
  const cmd = [
    'git clone', 
    '--single-branch', 
    '--no-tags', 
    '--depth 1', 
    `-b ${GITHUB_BRANCH || DEFAULT_BRANCH}`, 
    repo,  
    WORKING_DIR
  ].join(' ')

  core.info('Cloning private action')
  await exec.exec(cmd);

  // const envs = Object.keys(process.env).filter(e=>e.startsWith('INPUT_'));
  const cwd = process.cwd();
  
  console.log('cwd')
  console.log(cwd)
}

run().then(() => {
  console.log('Run success');
}).catch((e) => {
  core.setFailed(e.toString());
});
