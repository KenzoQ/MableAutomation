import * as data from '../../fixtures/test-data.json';

const adminEmail = data.dashboardAccount.adminAccount.email;
const adminPass = data.dashboardAccount.adminAccount.password;

// deprecated
Cypress.Commands.add('approveWWCC', (userId, referenceNumber, date) => {
  cy.log('approve WWCC')
    .loginAPI(adminEmail, adminPass)
    .then((res) =>
      cy
        .request({
          method: 'POST',
          url: `app/admin/accept_proposed_changes/${userId}/wwcc`,
          headers: {
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            _method: 'patch',
            authenticity_token: '',
            number: referenceNumber,
            expiry: date,
            admin_comment: '',
          },
          failOnStatusCode: false,
        }),
    );
});

// deprecated
Cypress.Commands.add('approveCPR', (userId, date) => {
  cy.log('approve CPR')
    .loginAPI(adminEmail, adminPass)
    .then((res) =>
      cy
        .request({
          method: 'POST',
          url: `app/admin/accept_proposed_changes/${userId}/cpr_certificate`,
          headers: {
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            _method: 'patch',
            authenticity_token: '',
            issue_date: date,
            admin_comment: '',
          },
          failOnStatusCode: false,
        }),
    );
});

// deprecated
Cypress.Commands.add('approveFirstAid', (userId, date) => {
  cy.log('approve First Aid')
    .loginAPI(adminEmail, adminPass)
    .then((res) =>
      cy
        .request({
          method: 'POST',
          url: `app/admin/accept_proposed_changes/${userId}/first_aid`,
          headers: {
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            _method: 'patch',
            authenticity_token: '',
            issue_date: date,
            admin_comment: '',
          },
          failOnStatusCode: false,
        }),
    );
});

// deprecated
Cypress.Commands.add('approveDriversLicense', (userId, date) => {
  cy.log('approve drivers license')
    .loginAPI(adminEmail, adminPass)
    .then((res) =>
      cy
        .request({
          method: 'POST',
          url: `app/admin/accept_proposed_changes/${userId}/drivers_license`,
          headers: {
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            _method: 'patch',
            authenticity_token: '',
            expiry: date,
            admin_comment: '',
          },
          failOnStatusCode: false,
        }),
    );
});
