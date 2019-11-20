const exec = require('@actions/exec');
const core = require('@actions/core');
const git = require('simple-git');

const GITHUB_TOKEN = core.getInput('github-token', {required: true});
const GITHUB_REPO = core.getInput('github-repo', {required: true});

async function run() {

  // const envs = Object.keys(process.env).filter(e=>e.startsWith('INPUT_'));
  const cwd = process.cwd();
  const wd = __dirname;

  // core.debug(envs)
  
  console.log('cwd')
  console.log(cwd)

  console.log('dirname')
  console.log(wd)
}

run().then(() => {
  console.log('Run success');
}).catch((e) => {
  core.setFailed(e.toString());
});
