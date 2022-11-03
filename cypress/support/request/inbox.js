Cypress.Commands.add(
  'sendMessageToClientAPI',
  (
    workerEmail,
    workerPass,
    clientID = 15443,
    clientName = 'Richard G',
    text = 'Automation test',
  ) => {
    cy.loginAPI(workerEmail, workerPass).then((res) => {
      cy.request({
        method: 'GET',
        url: '/conversations.json?page=1&filter=inbox',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
      }).then((inbox) => {
        const { data } = inbox.body;
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].attributes.name.toString().toUpperCase() === clientName.toUpperCase()
          ) {
            cy.log(data[0].id);
            cy.request({
              method: 'POST',
              url: `/conversations/${data[0].id}/messages.json`,
              headers: {
                Accept: 'application/json, text/plain, */*',
                'x-api-key': Cypress.env('x-api-key'),
                'x-bypass-authentication': Cypress.env(
                  'x-bypass-authentication',
                ),
                Authorization: `Bearer ${res.body.token}`,
              },
              body: {
                body: text,
                conversation_id: data[0].id,
                receiver_id: clientID,
              },
            });
            i = data.length;
          }
        }
      });
    });
  },
);
