import {
  NativeModules,
  NativeEventEmitter
} from 'react-native';

const { ThreadSelfManager } = NativeModules;

const self = {
  onmessage: null,

  postMessage: (message) => {
    if (!message) { return; }
    ThreadSelfManager.postMessage(message);
  },

  eventEmitter: new NativeEventEmitter(ThreadSelfManager)
};

self.eventEmitter.addListener('ThreadMessage', (message) => {
  !!message && self.onmessage && self.onmessage(message);
});

export default self;
