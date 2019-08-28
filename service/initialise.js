
const { promisify } = require('util');
const { init, importFromLucidchart } = require('./index');

const importFromLucid = promisify(importFromLucidchart);

async function initialise() {
  console.debug('*** 1 - build up test database... ***');
  await init();
    if (await importFromLucid('test')) {
      console.debug('*** 4 - New tracks imported ***');
    }
  console.debug('Ready.');
}

module.exports = { initialise };