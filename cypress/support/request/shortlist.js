Cypress.Commands.add('shortlistAWorkerIDByAPI', (
  clientEmail,
  clientPass,
  carerID,
) => {
  cy.log(`Shortlist: ${carerID}`);
  cy.loginAPI(clientEmail, clientPass)
    .then((res) => {
      cy.request({
        method: 'POST',
        url: '/app/graphql',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          operationName: 'createShortlist',
          variables: {
            createShortlistInput: {
              shortlistProfileId: carerID,
              mechanism: null,
            },
          },
          query: 'mutation createShortlist($createShortlistInput: CreateShortlistInput!) {\n  createShortlist(input: $createShortlistInput) {\n    shortlist {\n      profile {\n        clientFields {\n          shortlisted\n        }\n      }\n    }\n  }\n}',
        },
      });
    });
});

Cypress.Commands.add('shortlistWorkerEmailByAPI', (
  clientEmail,
  clientPass,
  workerEmail,
  workerPass,
) => {
  cy.log(`Shortlist: ${workerEmail}`);
  cy.getInfoAccount(workerEmail, workerPass).then((infoAcc) => {
    const carerID = infoAcc.body.data.id;
    cy.loginAPI(clientEmail, clientPass)
      .then((res) => {
        cy.request({
          method: 'POST',
          url: '/app/graphql',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            operationName: 'createShortlist',
            variables: {
              createShortlistInput: {
                shortlistProfileId: carerID,
                mechanism: null,
              },
            },
            query: 'mutation createShortlist($createShortlistInput: CreateShortlistInput!) {\n  createShortlist(input: $createShortlistInput) {\n    shortlist {\n      profile {\n        clientFields {\n          shortlisted\n        }\n      }\n    }\n  }\n}',
          },
        });
      });
  });
});

Cypress.Commands.add('createFullWokerThenShortlist', (
  clientEmail,
  clientPass,
  emailWorker,
  firstName,
  lastName,
  // post_code_id,
  // post_code_name,
  post_code = '2000',
) => {
  cy.signUpWorkerByAPI(emailWorker, firstName, lastName, post_code).then(
    () => {
      cy.log(`Create worker: ${emailWorker}`);
      cy.wait(2000)
        .getInfoAccount(emailWorker, 'password')
        .then((infoAcc) => cy
          .completeProfile(emailWorker, 'password')
          .setPostCode(
            emailWorker,
            'password',
            // post_code_id,
            // post_code_name,
          )
          .setRate(emailWorker, 'password')
          .approveAcc(infoAcc.body.data.id)
          .wait(2000)
          .shortlistAWorkerIDByAPI(
            clientEmail,
            clientPass,
            infoAcc.body.data.attributes.carer_profile_attributes.id,
          ));
    },
  );
});

Cypress.Commands.add('removeAllShortlist', (
  clientEmail,
  clientPass,
  page = 1,
) => {
  cy.log('Remove shortlist');
  cy.loginAPI(clientEmail, clientPass)
    .then((res) => {
      cy.request({
        method: 'GET',
        url: `/shortlist.json?page=${page}`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
      }).then((list) => {
        if (list.body.data.length > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < list.body.data.length; i++) {
            cy.log(`Remove shorlist-id: ${list.body.data[i].id}`);
            cy.request({
              method: 'DELETE',
              url: `/shortlist/${list.body.data[i].id}.json`,
              headers: {
                Accept: 'application/json, text/plain, */*',
                'x-api-key': Cypress.env('x-api-key'),
                'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
                Authorization: `Bearer ${res.body.token}`,
              },
            });
          }
        } else {
          cy.log('There is no shortlist');
        }
      });
    });
});

Cypress.Commands.add('getShortlistAPI', (
  clientEmail,
  clientPass,
  page = 1,
) => {
  cy.log('Get shortlist');
  cy.loginAPI(clientEmail, clientPass)
    .then((res) => {
      cy.request({
        method: 'GET',
        url: `/shortlist.json?page=${page}`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
      });
    });
});
