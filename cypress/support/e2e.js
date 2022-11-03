// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-file-upload';
import addContext from 'mochawesome/addContext';

import './commands';
import './before';
import './routes';

import './page-actions/base-action';
import './page-actions/signup-action';
import './page-actions/post-job-action';
import './page-actions/profile-action';
import './page-actions/bid-job-action';
import './page-actions/inbox-action';
import './page-actions/manage-user-action';
import './page-actions/admin-jobs-action';
import './page-actions/timesheet-action';
import './page-actions/login-action';
import './page-actions/dashboard-action';
import './page-actions/search-for-workers-action';
import './page-actions/account-setting-action';
import './page-actions/invite-worker-action';
import './page-actions/regular-job-action';
import './page-actions/agreement-action';
import './page-actions/onboarding-action';
import './page-actions/last-minute-job-action';
import './page-actions/worker-profile-building-action';
import './page-actions/private-job-action';

import './request/account';
import './request/job-request';
import './request/agreement';
import './request/last-minute-job';
import './request/regular-job';
import './request/timesheet';
import './request/inbox';
import './request/message';
import './request/private-job';
import './request/shortlist';
import './request/profile-building';

import 'cypress-xpath';

Cypress.on('window:load', (window) => {
  const original = window.addEventListener;
  window.addEventListener = () => {
    if (arguments && arguments[0] === 'beforeunload') {
      return;
    }
    return original.apply(this, arguments);
  };
});

Cypress.on('uncaught:exception', () => false);

Cypress.on('before:browser:launch', (browser = {}, launchOptions) => {
  if (browser.name === 'chrome') {
    launchOptions.args.push('--disable-dev-shm-usage');
    return launchOptions;
  }
});

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    let item = runnable;
    const nameParts = [runnable.title];

    while (item.parent) {
      nameParts.unshift(item.parent.title);
      item = item.parent;
    }

    if (runnable.hookName) {
      nameParts.push(`${runnable.hookName} hook`);
    }

    const fullTestName = nameParts.filter(Boolean).join(' -- ');

    const imageUrl = `screenshots/${fullTestName} (failed).png`;

    addContext({ test }, imageUrl);
  }
});
