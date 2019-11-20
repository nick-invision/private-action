const exec = require('@actions/exec');
const core = require('@actions/core');

const GITHUB_TOKEN = core.getInput('github-token');
const GITHUB_REPO = core.getInput('github-repo');

async function run() {

  const envs = Object.keys(process.env).filter(e=>e.startsWith('INPUT_'));

  console.log(envs)

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

  // // buildx
  // await exec.exec('docker', [
  //   'buildx',
  //   'version',
  // ]).then(async () => {
  //   if (DOCKER_BUILDX !== 'true') {
  //     core.debug('buildx disabled');
  //     return;
  //   }

  //   // install buildx
  //   await exec.exec('docker', [
  //     'run',
  //     '--rm',
  //     '--privileged',
  //     'docker/binfmt:820fdd95a9972a5308930a2bdfb8573dd4447ad3',
  //   ]);

  //   await exec.exec('cat', [
  //     '/proc/sys/fs/binfmt_misc/qemu-aarch64',
  //   ]);

  //   await exec.exec('docker', [
  //     'buildx',
  //     'create',
  //     '--use',
  //     '--name',
  //     'mybuilder',
  //   ]);

  //   await exec.exec('docker', [
  //     'buildx',
  //     'inspect',
  //     '--bootstrap'
  //   ]);
  // }, () => {
  //   core.debug('NOT Support Buildx');
  // });
}

run().then(() => {
  console.log('Run success');
}).catch((e) => {
  core.setFailed(e.toString());
});
