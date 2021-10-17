// __test-utils__/custom-jest-environment.js
// Stolen from: https://github.com/ipfs/jest-environment-aegir/blob/master/src/index.js
// Overcomes error from jest internals.. this thing: https://github.com/facebook/jest/issues/6248
"use strict";

// import NodeEnvironment from 'jest-environment-node'

// class MyEnvironment extends NodeEnvironment {
//   constructor(config) {
//     super(
//       Object.assign({}, config, {
//         globals: Object.assign({}, config.globals, {
//           Uint32Array: Uint32Array,
//           Uint8Array: Uint8Array,
//           ArrayBuffer: ArrayBuffer,
//         }),
//       }),
//     );
//   }

//   async setup() {}

//   async teardown() {}

// }

// export default MyEnvironment

/**
 * Correct Jest bug that prevents the Firestore tests from running. More info here:
 * https://github.com/firebase/firebase-js-sdk/issues/3096#issuecomment-637584185
 */

import DOMEnvironment from 'jest-environment-jsdom'

class MyEnvironment extends DOMEnvironment {
  constructor(config) {
    super(
      Object.assign({}, config, {
        globals: Object.assign({}, config.globals, {
          Uint32Array: Uint32Array,
          Uint8Array: Uint8Array,
          ArrayBuffer: ArrayBuffer
        })
      })
    );
  }

  async setup() { }

  async teardown() { }
}

export default MyEnvironment