const { defineConfig } = require('cypress');
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 30000,
    baseUrl: 'https://uat.containers.staging-mable.com.au/',
    chromeWebSecurity: false,
    viewportWidth: 1366,
    viewportHeight: 768,
    failOnStatusCode: false,
    requestTimeout: 20000,
    numTestsKeptInMemory: 0,
    responseTimeout: 50000,
    pageLoadTimeout: 100000,
    projectId: 'einzee',
    env: {
      'x-api-key': 'qGkTowXWf86SUTbXAEjfE4uRYxI6lVYh9FolGJjw',
      'x-bypass-authentication': 'a9394bd2bba377a042da123e9f140944',
    },
    trashAssetsBeforeRuns: false,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json',
    },
    video: false,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium') {
          launchOptions.args.push('--disable-dev-shm-usage');
        }
      });

      on('after:screenshot', (details) => {
        console.log(details.specName);
        console.log(details.name);
        console.log(details.path);

        const newPath = path.join(
          __dirname,
          `cypress/screenshots/${details.path.split('/').slice(-1)[0]}`,
        );

        return new Promise((resolve, reject) => {
          fs.rename(details.path, newPath, (err) => {
            if (err) return reject(err);

            // because we renamed/moved the image, resolve with the new path
            // so it is accurate in the test results
            resolve({ path: newPath });
          });
        });
      });
    },
  },
});
