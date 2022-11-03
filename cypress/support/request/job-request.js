Cypress.Commands.add('getListJobAsClient', (clientEmail, clientPass) => {
  cy.log('Request: Get a List Job As Client')
    .loginAPI(clientEmail, clientPass)
    .then((res) =>
      cy.request({
        method: 'GET',
        url: 'clients/posted_jobs.json',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
      }),
    );
});

Cypress.Commands.add(
  'getListJobAsWorker',
  (workerEmail, workerPass, postCodeId) => {
    cy.log('Request: Get a List Job as Worker')
      .loginAPI(workerEmail, workerPass)
      .then((res) =>
        cy.request({
          method: 'GET',
          url: `app/api/v1/workers/posted_jobs.json?filter=search&status=all&search_jobs={"available_days":[],"services":[],"order":"age","distance":true,"post_code_geo_id":"${postCodeId}","participants_age":[]}`,
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
        }),
      );
  },
);
