Cypress.Commands.add('sendMessageAPI', (
  email,
  password,
  conversationId,
  receivedId,
) => {
  cy.log('API---Send a message')
    .loginAPI(email, password).then((res) => {
      cy.request({
        method: 'POST',
        url: 'app/graphql ',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          body: 'send a new message',
          conversation_id: conversationId,
          receiver_id: receivedId,
        },
      });
    });
});

Cypress.Commands.add('blockUserAPI', (
  email,
  password,
  conversationId,
) => {
  cy.log('API---Block user')
    .loginAPI(email, password).then((res) => {
      cy.request({
        method: 'POST',
        url: `api/v1/incidents/users/${conversationId}/blocks.json`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          incident_user: {
            reason: '',
            comment: '',
          },
        },
        failOnStatusCode: false,
      });
    });
});

Cypress.Commands.add('unBlockUserAPI', (
  email,
  password,
  conversationId,
) => {
  cy.log('API--- Unblock user')
    .loginAPI(email, password).then((res) => {
      cy.request({
        method: 'POST',
        url: `api/v1/incidents/users/${conversationId}/unblocks.json`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          incident_user: {
            reason: '',
          },
        },
        failOnStatusCode: false,
      });
    });
});
