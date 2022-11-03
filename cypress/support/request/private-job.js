Cypress.Commands.add('createPJOnlyDes2ByAPI', (
  clientEmail,
  clientPass,
  jobDes2 = 'private conversation',
  post_code_name = 'Barangaroo NSW 2000',
  post_code_id = 34160,
  workerID = 9452,
) => {
  cy.log('Request: Create Private Job');
  cy.loginAPI(clientEmail, clientPass).then((res) => cy.request({
    method: 'POST',
    url: 'app/clients/posted_jobs.json',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'x-api-key': Cypress.env('x-api-key'),
      'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
      Authorization: `Bearer ${res.body.token}`,
    },
    body: {
      posted_job: {
        title: 'Automation Private Job',
        job_description: jobDes2,
        frequency: 'ongoing',
        job_location: post_code_name,
        hours: 'med',
        scheduling: 'flexible',
        gender: '',
        post_code_geo_id: post_code_id,
        search_filter: {
          basic_search: [],
          advanced: {
            'users.gender': [
              '',
            ],
          },
          suburb: {
            idx: post_code_id,
            txt: post_code_name,
          },
        },
        participant_id: workerID,
        kind: 'private',
      },
    },
  }));
});

Cypress.Commands.add('fillAPrivateJob', (
  clientEmail,
  clientPass,
  jobID,
) => {
  cy.log('Request: Fill A Private Job');
  cy.loginAPI(clientEmail, clientPass).then((res) => cy.request({
    method: 'POST',
    url: 'app/graphql',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'x-api-key': Cypress.env('x-api-key'),
      'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
      Authorization: `Bearer ${res.body.token}`,
    },
    body: {
      operationName: 'updatePostedJobStatus',
      variables: {
        postedJobAction: {
          postedJobId: jobID,
          action: 'fulfil',
          reason: 'fulfilled_off_platform',
        },
      },
      query: 'mutation updatePostedJobStatus($postedJobAction: UpdatePostedJobStatusInput!) {\n  updatePostedJobStatus(input: $postedJobAction) {\n    clientMutationId\n  }\n}\n',
    },
  }));
});
