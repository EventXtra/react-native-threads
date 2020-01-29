import {
  NativeModules,
  NativeEventEmitter
} from 'react-native';

const { ThreadManager } = NativeModules;

export default class Thread {
  constructor(jsPath) {
    if (!jsPath || !jsPath.endsWith('.js')) {
      throw new Error('Invalid path for thread. Only js files are supported');
    }

    this.eventEmitter = new NativeEventEmitter(ThreadManager)

    this.id = ThreadManager.startThread(jsPath.replace(".js", ""))
      .then(id => {
        this.eventEmitter.addListener(`ThreadMessage`, (message) => {
          console.log(`Thread ${id} Received ThreadMessage ${message}`);
          !!message && this.onmessage && this.onmessage(message);
        });
        return id;
      })
      .catch(err => { throw new Error(err) });
  }

  postMessage(message) {
    this.id.then(id => ThreadManager.postThreadMessage(id, message));
  }

  terminate() {
    this.id.then(ThreadManager.stopThread);
  }
}
