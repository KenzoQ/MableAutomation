Cypress.Commands.add('createRegularJobByAPI', (
  clientEmail,
  clientPass,
  jobTitle = 'Regular reply conversation',
  post_code_name = 'Melbourne VIC 3000',
  post_code_id = 38794,
) => {
  cy.log('Request: Create Regular Job');
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
        carer_description: 'Automation Testing...',
        consumer_description: 'Automation Testing...',
        frequency: 'ongoing',
        hours: 'med',
        job_description: 'Automation Testing...',
        job_location: post_code_name,
        post_code_geo_id: post_code_id,
        scheduling: 'flexible',
        search_filter: {
          basic_search: [],
          advanced: {
            'users.gender': [
              null,
            ],
          },
          suburb: {
            idx: post_code_id,
            txt: post_code_name,
          },
        },
        title: jobTitle,
      },
    },
  }));
});