const exec = require('@actions/exec');
const core = require('@actions/core');
const {parse} = require('yaml');
const {readFileSync} = require('fs')

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

  core.info('Cloning private action');
  await exec.exec(cmd);

  const actionFile = readFileSync(`${WORKING_DIR}/action.yml`, 'utf8');
  const actionYml = yaml.parseactionFile
  core.info(`yml: ${JSON.stringify(actionYml, null, 2)}`)
  core.info(`yml: ${actionYml}`)
  core.info(actionYml)
}

run().then(() => {
  console.log('Run success');
}).catch((e) => {
  core.setFailed(e.toString());
});
