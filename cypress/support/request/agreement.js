/* eslint-disable no-restricted-syntax */
Cypress.Commands.add(
  'createAgreementByAPI',
  (
    workerEmail,
    workerPass,
    consumerID,
    clientEmail,
    clientPass,
    jobId = null,
  ) => {
    cy.log('Request: Create An Agreement')
      .sendAgreementAsWorker(workerEmail, workerPass, consumerID, jobId)
      .then(agreement => {
        cy.acceptAgreementAsClient(clientEmail, clientPass, agreement.body.data.id)
      });
  },
);

Cypress.Commands.add(
  'sendAgreementAsWorker',
  (workerEmail, workerPass, clientID, jobId = null) => {
    cy.log('Send a agreemnt as worker')
      .loginAPI(workerEmail, workerPass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: 'app/api/v1/workers/agreements.json',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            agreement: {
              consumer_user_id: clientID,
              posted_job_id: jobId,
              agreement_rates_attributes: {
                0: {
                  id: null,
                  rate_name: 'Automation testing',
                  rate_cents: 35,
                  flat_rate: false,
                  _destroy: false,
                },
              },
              plan_support_item_ids: [],
              agreed_service: 'Automation testing',
            },
          },
          failOnStatusCode: false,
        }),
      );
  },
);

Cypress.Commands.add(
  'amendAgreementByAPI',
  (workerEmail, workerPass, agreementID) => {
    cy.log('Request: Create An Agreement')
      .loginAPI(workerEmail, workerPass)
      .then((res) =>
        cy.request({
          method: 'PUT',
          url: `agreements/${agreementID}.json`,
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            id: agreementID,
            agreement: {
              posted_job_id: null,
              agreement_rates_attributes: {
                0: {
                  rate_name: 'Automation testing edit',
                  rate_cents: 25,
                  flat_rate: false,
                  _destroy: false,
                },
              },
              plan_support_item_ids: [],
              agreed_service: 'Automation testing edit',
            },
          },
        }),
      );
  },
);

Cypress.Commands.add(
  'sendMessageToApplyJob',
  (workerEmail, workerPass, jobID, clientName) => {
    cy.log('Request: Worker send message to appy job')
      .loginAPI(workerEmail, workerPass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: `app/workers/posted_jobs/${jobID}/posted_job_replies.json`,
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            message: {
              to: `${clientName}`,
              title: 'Automation Testing',
              message: 'Automation Test',
            },
          },
        }),
      );
  },
);

Cypress.Commands.add(
  'removeAgreementIfExist',
  (clientEmail, clientPass, workerId) => {
    cy.log('Check if Agreement exist')
      .loginAPI(clientEmail, clientPass)
      .then((res) => {
        cy.request({
          method: 'GET',
          url: 'app/agreements.json',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
        }).then((data) => {
          const agreement = data.body.data.filter(
            (item) => item.attributes.other_user.id.toString() === workerId,
          )[0];

          if (!!agreement) {
            const id = !!agreement.attributes.agreement_id
              ? agreement.attributes.agreement_id
              : agreement.id;

            cy.declineAmendAgreementByAPI(
              clientEmail,
              clientPass,
              !!id ? id : agreement.id,
            );

            cy.terminateAgreementAsClientByAPI(
              clientEmail,
              clientPass,
              !!id ? id : agreement.id,
            );

            cy.deleteAgreementByAPI(
              clientEmail,
              clientPass,
              !!id ? id : agreement.id,
            );
          }
        });
      });
  },
);

Cypress.Commands.add(
  'createAgreementIfNotExist',
  (workerEmail, workerPass, workerId, clientId, clientEmail, clientPass) => {
    cy.log('Check if agrrement exist')
      .loginAPI(clientEmail, clientPass)
      .then((res) => {
        cy.request({
          method: 'GET',
          url: 'app/agreements.json',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
        }).then((data) => {
          const agreement = data.body.data.filter(
            (item) => item.attributes.other_user.id.toString() === workerId,
          )[0];
          console.log('test', agreement);

          if (
            !!agreement &&
            agreement.attributes.button_text === 'EDIT LAST SENT OFFER'
          ) {
            const id = !!agreement.attributes.agreement_id
              ? agreement.attributes.agreement_id
              : agreement.id;
            cy.deleteAgreementByAPI(clientEmail, clientPass, id);

            cy.declineAmendAgreementByAPI(clientEmail, clientPass, id);
          }

          if (
            !agreement ||
            agreement.attributes.button_text === 'EDIT LAST SENT OFFER'
          ) {
            cy.wait(1000).createAgreementByAPI(
              workerEmail,
              workerPass,
              clientId,
              clientEmail,
              clientPass,
            );
          }
        });
      });
  },
);

Cypress.Commands.add(
  'terminateAgreementAsClientByAPI',
  (clientEmail, clientPass, agreementID) => {
    cy.log('Request: Terminate Agreement')
      .loginAPI(clientEmail, clientPass)
      .then((res) =>
        cy.request({
          method: 'PATCH',
          url: `app/api/v1/clients/agreements/${agreementID}/terminate.json`,
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            agreement: {
              termination_reason: 'no_longer_needs_support',
              termination_reason_other: '',
            },
          },
          failOnStatusCode: false,
        }),
      );
  },
);

Cypress.Commands.add(
  'deleteAgreementByAPI',
  (clientEmail, clientPass, agreementID) => {
    cy.log('Request: DeleteAgreement')
      .loginAPI(clientEmail, clientPass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: `app/agreements/${agreementID}/decline_offer.json`,
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          failOnStatusCode: false,
        }),
      );
  },
);

Cypress.Commands.add(
  'declineAmendAgreementByAPI',
  (clientEmail, clientPass, agreementID) => {
    cy.log('Request: DeleteAgreement')
      .loginAPI(clientEmail, clientPass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: `/agreements/${agreementID}/decline_amendments.json`,
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          failOnStatusCode: false,
        }),
      );
  },
);

Cypress.Commands.add(
  'requestAgreeentAsClient',
  (clientEmail, clientPass, conversationId) => {
    cy.log('Request: Request Agreement As client')
      .loginAPI(clientEmail, clientPass)
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
            variables: {},
            query:
              `mutation {\n  requestAgreement(input: {conversationId: ${conversationId}}) {\n    agreement {\n      id\n    }\n  }\n}`,
          },
        });
      });
  },
);

Cypress.Commands.add(
  'acceptAgreementAsClient',
  (clientEmail, clientPass, agreementId) => {
    cy.log('Request: Accept Agreement As client')
      .loginAPI(clientEmail, clientPass)
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
            operationName: 'respondToAgreementOffer',
            variables: {
              RespondToAgreementOfferInput: {
                id: agreementId,
                action: 'accept',
              },
            },
            query:
              'mutation respondToAgreementOffer($RespondToAgreementOfferInput: RespondToAgreementOfferInput!) {\n  respondToAgreementOffer(input: $RespondToAgreementOfferInput) {\n    agreement {\n      id\n      agreedOnSchedule\n      agreedService\n      expectedEndDate\n      sessionSummaries\n      scheduleSummary\n      scheduleDescription\n      jobFrequency\n      jobOccurrence\n      expectedStartDate\n    }\n  }\n}\n',
          },
          failOnStatusCode: false,
        });
      });
  },
);

Cypress.Commands.add(
  'amendAgreementGraphqlAPI',
  (workerEmail, workerPass, clientID, agreementID) => {
    cy.log('Request: Amend An Agreement')
      .loginAPI(workerEmail, workerPass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: 'app/graphql',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            operationName: 'amendAgreement',
            variables: {
              AmendAgreementInput: {
                attributes: {
                  postedJobId: null,
                  ratesInDollars: [
                    {
                      id: null,
                      rateName: 'Weekday',
                      rateDollars: 35,
                      flatRate: false,
                      _destroy: false,
                    },
                    {
                      id: null,
                      rateName: 'Weekend',
                      rateDollars: 40,
                      flatRate: false,
                      _destroy: false,
                    },
                    {
                      id: null,
                      rateName: '24HourShift',
                      rateDollars: 100,
                      flatRate: true,
                      _destroy: false,
                    },
                  ],
                  planSupportItemIds: [],
                  agreedService: 'Automation testing 1234',
                  jobFrequency: null,
                  agreedOnSchedule: false,
                  expectedEndDate: '',
                  expectedStartDate: '',
                  daysAndTimes: {
                    monday: {
                      expected: false,
                      expectedSessions: [],
                    },
                    tuesday: {
                      expected: false,
                      expectedSessions: [],
                    },
                    wednesday: {
                      expected: false,
                      expectedSessions: [],
                    },
                    thursday: {
                      expected: false,
                      expectedSessions: [],
                    },
                    friday: {
                      expected: false,
                      expectedSessions: [],
                    },
                    saturday: {
                      expected: false,
                      expectedSessions: [],
                    },
                    sunday: {
                      expected: false,
                      expectedSessions: [],
                    },
                  },
                  scheduleDescription: '',
                  consumerUserId: clientID,
                  jobOccurrence: null,
                  id: agreementID,
                },
              },
            },
            query:
              'mutation amendAgreement($AmendAgreementInput: AmendAgreementInput!) {\n  amendAgreement(input: $AmendAgreementInput) {\n    agreement {\n      id\n    }\n  }\n}\n',
          },
        }),
      );
  },
);

Cypress.Commands.add(
  'removeAgreementMultiAccountsIfExist',
  (workerObj, clientEmail, clientPass) => {
    const list = Object.values(workerObj);
    for (const item of list) {
      cy.log(
        `Agreement: ${item.email}
      ID: ${item.id}`,
      )
        .loginAPI(clientEmail, clientPass)
        .then((res) => {
          cy.request({
            method: 'GET',
            url: 'app/agreements.json',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'x-api-key': Cypress.env('x-api-key'),
              'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
              Authorization: `Bearer ${res.body.token}`,
            },
          }).then((data) => {
            const agreement = data.body.data.filter(
              (item) => item.attributes.other_user.id.toString() === item.id,
            )[0];
            console.log('test', agreement);

            if (
              !!agreement &&
              agreement.attributes.button_text === 'EDIT LAST SENT OFFER'
            ) {
              const id = !!agreement.attributes.agreement_id
                ? agreement.attributes.agreement_id
                : agreement.id;
              cy.deleteAgreementByAPI(clientEmail, clientPass, id);
              cy.declineAmendAgreementByAPI(clientEmail, clientPass, id);
            }
          });
        });
    }
  },
);

Cypress.Commands.add(
  'declineAgreement',
  (workerEmail, workerPass, workerId, clientEmail, clientPass) => {
    cy.log('Request: Decline agreement')
      .loginAPI(clientEmail, clientPass)
      .then((res) => {
        cy.request({
          method: 'GET',
          url: 'app/agreements.json',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
        }).then((data) => {
          const agreement = data.body.data.filter(
            (item) => item.attributes.other_user.id.toString() === workerId,
          )[0];

          if (!!agreement) {
            const id = !!agreement.attributes.agreement_id
              ? agreement.attributes.agreement_id
              : agreement.id;

            cy
              .loginAPI(workerEmail, workerPass)
              .then(res => {
                cy
                  .request({
                    method: 'POST',
                    url: 'app/graphql',
                    headers: {
                      Accept: 'application/json, text/plain, */*',
                      'x-api-key': Cypress.env('x-api-key'),
                      'x-bypass-authentication': Cypress.env(
                        'x-bypass-authentication',
                      ),
                      Authorization: `Bearer ${res.body.token}`,
                    },
                    body: {
                      operationName: 'declineAgreement',
                      variables: {
                        id,
                      },
                      query:
                        'mutation declineAgreement($id: ID!) {\n  declineAgreement(input: {id: $id}) {\n    agreement {\n      id\n      status\n    }\n  }\n}',
                    },
                    failOnStatusCode: false,
                  });
              });
          }
        });
      });
  },
);
