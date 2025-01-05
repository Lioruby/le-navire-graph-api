import * as path from 'path';
import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
} from 'testcontainers';

let instance: StartedDockerComposeEnvironment | null = null;

export const startDocker = async () => {
  console.log('Starting docker');
  const composeFilePath = path.resolve(__dirname);
  const compileFile = 'docker-compose.yml';

  instance = await new DockerComposeEnvironment(
    composeFilePath,
    compileFile,
  ).up();
  console.log('Docker started');
};

export const stopDocker = async () => {
  console.log('Stopping docker');
  if (!instance) {
    console.log('Docker is not running');
    return;
  }

  try {
    await instance.down();
    await instance.stop();
    console.log('Docker stopped');
    instance = null;
  } catch (e) {
    console.error('Failed to stop docker : ', e);
  }
};

export const getDockerEnvironment = (): StartedDockerComposeEnvironment => {
  if (!instance) {
    throw new Error('Instance is not available');
  }

  return instance;
};
