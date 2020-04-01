#!/usr/bin/env node
/**
 *  @author Ahmetcan ÖZCAN <ahmetcanozcan7@gmail.com>
 * 
 * @description Sernite Script, is the script executer module for sernite project.
 * 
 */


const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });



const getLine = (function () {
  const getLineGen = (async function* () {
    for await (const line of rl) {
      yield line;
    }
  })();
  return async () => ((await getLineGen.next()).value);
})();

/**
 * Send message to the given nit and wait for its response and return it.
 * using in async functions is recommended.
 * @param {string} name of the target nit
 * @param {string} message of the script
 * @returns {string} response of the nit
 */
async function nitmsg(name, message) {
  const m = `nit;;;${name};;;${message}\n`;
  console.error(m);
  const resp = await getLine() // Wait for nit response
  return resp;
}

/**
 * Send message to web client
 * @param {string} message the message will be sent to client.
 */
function send(message) {
  console.log(message);
}

class ScriptRunner {

  constructor() {
    this.params = process.argv.slice(3)
    this.handler = false;
  }

  /**
  * Exit the process
  * @param {string|number} msg error message or code
  */
  done = function (msg = false) {
    if (!msg) {
      return process.exit();
    }
    if (typeof msg == 'string') {
      const errMsg = `err;;;1;;;${msg}`;
      console.error(errMsg);
      return process.exit(1);
    }
    if (typeof msg == 'number') {
      return process.exit(msg);
    }
  }

  /**
 * @param {Function} 
 */
  setHandler = (handler) => {
    this.handler = handler;
    return this;
  }

  run = async () => {
    if (this.handler && typeof this.handler === 'function') {
      await this.handler(send, nitmsg)
      this.done()
    } else {
      this.done('null handler function.')
    }
  }

}






module.exports = new ScriptRunner();