/* eslint-disable no-restricted-syntax */
Cypress.Commands.add(
  'createLastMinuteJob',
  (
    clientEmail,
    clientPass,
    titleJob,
    postCodeId = '34160',
    postCodeName = 'Barangaroo NSW 2000',
  ) => {
    cy.log('Request: Create Last Minute Job');
    cy.loginAPI(clientEmail, clientPass).then((res) => {
      const nextday = new Date(new Date().setDate(new Date().getDate() + 1));

      const day1 = `${nextday.getDate()}/${
        nextday.getMonth() + 1
      }/${nextday.getFullYear()}`;
      const day2 = `${nextday.getDate()}-${
        nextday.getMonth() + 1
      }-${nextday.getFullYear()}`;

      return cy.request({
        method: 'POST',
        url: 'app/clients/flex_jobs.json',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          posted_job: {
            title: titleJob,
            job_description: 'automation test',
            consumer_description: 'automation test',
            job_location: postCodeName,
            post_code_geo_id: postCodeId,
            search_filter: {
              basic_search: [],
              advanced: {
                users: {
                  gender: '',
                },
              },
              suburb: {
                idx: postCodeId,
                txt: postCodeName,
              },
            },
            frequency: null,
            hours: null,
            scheduling: null,
            days_and_times: null,
            gender: '',
            end_time: `${day2} 16:00`,
            start_time: `${day2} 12:00`,
            end_date: day1,
            start_date: day1,
          },
        },
      });
    });
  },
);

Cypress.Commands.add(
  'createLastMinuteJobGraphql',
  (
    clientEmail,
    clientPass,
    titleJob,
    postCodeId = '34160',
    postCodeName = 'Barangaroo NSW 2000',
  ) => {
    cy.log('Request: Create Last Minute Job');
    cy.loginAPI(clientEmail, clientPass).then((res) => {
      const nextday = new Date(new Date().setDate(new Date().getDate() + 1));

      // eslint-disable-next-line no-unused-vars
      const day1 = `${nextday.getDate()}/${
        nextday.getMonth() + 1
      }/${nextday.getFullYear()}`;
      const day2 = `${nextday.getDate()}-${
        nextday.getMonth() + 1
      }-${nextday.getFullYear()}`;

      return cy.request({
        method: 'POST',
        url: 'app/graphql',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          operationName: 'createFlexJobs',
          variables: {
            createFlexJobsInput: {
              action: 'create',
              attributes: {
                title: titleJob,
                jobDescription: 'Describe the support required',
                consumerDescription: 'Describe the support required',
                searchFilter: {
                  basicSearch: [],
                  advanced: {
                    gender: 'nopref',
                  },
                  suburb: {
                    idx: postCodeId,
                    txt: postCodeName,
                  },
                },
                endTime: `${day2} 16:00`,
                startTime: `${day2} 12:00`,
              },
            },
          },
          query: 'mutation createFlexJobs($createFlexJobsInput: FlexJobCreateUpdateInput!) {\n  flexJobCreateUpdate(input: $createFlexJobsInput) {\n    clientMutationId\n    postedJob {\n      id\n    }\n  }\n}\n',
        },
      });
    });
  },
);

Cypress.Commands.add('pickJobNoGraphgl', (jobId, workerEmail, workerPass) => {
  cy.log('Request: Pick a Job');
  cy.loginAPI(workerEmail, workerPass).then((res) =>
    cy.request({
      method: 'POST',
      url: `api/v1/workers/posted_jobs/${jobId}/flex_offer.json`,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'x-api-key': Cypress.env('x-api-key'),
        'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
        Authorization: `Bearer ${res.body.token}`,
      },
      body: {
        posted_job: {
          comment: 'Automation added offer ..',
          rate_offer: 4000,
        },
      },
      failOnStatusCode: false,
    }),
  );
});

Cypress.Commands.add('pickJob', (jobId, workerEmail, workerPass) => {
  cy.log('Request: Pick a Job');
  cy.loginAPI(workerEmail, workerPass).then((res) =>
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
        operationName: 'workerFlexJobs',
        variables: {
          flexJobWorkerActionRequest: {
            id: jobId,
            flexMatchAttributes: {
              comment: 'pick it',
              rateOffer: 3500,
            },
            action: 'offer',
          },
        },
        query: 'mutation workerFlexJobs($flexJobWorkerActionRequest: OfferDeclineWithdrawFlexJobsInput!) {\n  workerFlexJobs(input: $flexJobWorkerActionRequest) {\n    clientMutationId\n  }\n}\n',
      },
      failOnStatusCode: false,
    }),
  );
});

Cypress.Commands.add('pickJobMultiAccount', (jobId, accountObj) => {
  const list = Object.values(accountObj);
  for (const item of list) {
    cy.log(`Request: ${item.email} pick a Job id ${jobId}`);
    cy.pickJob(jobId, item.email, item.password);
  }
});

Cypress.Commands.add('cancelJob', (jobId, clientEmail, clientPass) => {
  cy.log('Request: Cancel Job');
  cy.loginAPI(clientEmail, clientPass).then((res) =>
    cy.request({
      method: 'POST',
      url: `app/clients/posted_jobs/${jobId}/cancel.json`,
      headers: {
        Accept: 'application/json, text/plain, */*',
        'x-api-key': Cypress.env('x-api-key'),
        'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
        Authorization: `Bearer ${res.body.token}`,
      },
      body: {
        reason: 'cancelled_enough_applicants',
      },
    }),
  );
});

Cypress.Commands.add(
  'filledJob',
  (jobId, workerId, clientEmail, clientPass) => {
    cy.log('Request: Filled Job');
    cy.loginAPI(clientEmail, clientPass).then((res) =>
      cy.request({
        method: 'POST',
        url: `app/clients/flex_jobs/${jobId}/accept_offer.json`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          user_id: workerId,
        },
        failOnStatusCode: false,
      }),
    );
  },
);

Cypress.Commands.add(
  'createFilledJob',
  (
    jobTitle,
    clientEmail,
    clientPass,
    workerId,
    workerEmail,
    workerPass,
    postCodeId,
    postCodeName,
  ) => {
    cy.createLastMinuteJob(
      clientEmail,
      clientPass,
      jobTitle,
      postCodeId,
      postCodeName,
    ).then((res) => {
      cy.wait(4000)
        .pickJob(res.body.data.id, workerEmail, workerPass)
        .then(() =>
          cy
            .wait(4000)
            .filledJob(res.body.data.id, workerId, clientEmail, clientPass),
        );
    });
  },
);

Cypress.Commands.add(
  'createJobHasOffer',
  (
    jobTitle,
    clientEmail,
    clientPass,
    workerEmail,
    workerPass,
    postCodeId = '34464',
    postCodeName = 'Arndell Park NSW 2148',
  ) => {
    cy.createLastMinuteJob(
      clientEmail,
      clientPass,
      jobTitle,
      postCodeId,
      postCodeName,
    ).then((res) => {
      console.log(res);
      cy.pickJob(res.body.data.id, workerEmail, workerPass);
    });
  },
);

Cypress.Commands.add('removeMultiAgreements', (email, password, ids) => {
  for (const id of ids) {
    cy.removeAgreementIfExist(email, password, id);
  }
});
