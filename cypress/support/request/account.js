/* eslint-disable no-restricted-syntax */
/* eslint-disable camelcase */
import * as data from '../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

const adminEmail = data.dashboardAccount.adminAccount.email;
const adminPass = data.dashboardAccount.adminAccount.password;

Cypress.Commands.add('loginAPI', (clientEmail, clientPass) => {
  cy.log('Request: Login API');
  cy.request({
    method: 'POST',
    url: 'app/api/ionic_authentication/sign_in.json?remember=false',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'x-api-key': Cypress.env('x-api-key'),
      'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
    },
    body: {
      email: clientEmail,
      password: clientPass,
    },
  });
});

Cypress.Commands.add('updateAccount', (emailClient, passwordClient, body) => {
  cy.log('Request: UpdateAccount')
    .loginAPI(emailClient, passwordClient)
    .then((res) =>
      cy.request({
        method: 'PATCH',
        url: 'app/settings/account.json',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          user: body,
        },
        failOnStatusCode: false,
      }),
    );
});

Cypress.Commands.add('getAccount', (emailClient, passwordClient) => {
  cy.log('Request: Get Account')
    .loginAPI(emailClient, passwordClient)
    .then((res) =>
      cy.request({
        method: 'GET',
        url: 'app/settings/account.json',
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
  'createWorkerAccountAPI',
  (email, password, firstName, lastName, postcode = 2600) => {
    cy.log('Request: Create Worker Account');
    cy.request({
      method: 'POST',
      url: 'app/users.json',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'x-api-key': Cypress.env('x-api-key'),
        'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
      },
      body: {
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          account_type: 'Carer',
          contact_phone: '0491570110',
          password,
          postcode,
          found_us: 'Google',
          carer_profile_attributes: {
            target_work_amount: 'entry',
          },
        },
      },
    });
  },
);

Cypress.Commands.add('approveAcc', (userId) => {
  cy.log('Aprrove Account')
    .loginAPI(adminEmail, adminPass)
    .then((res) =>
      cy.request({
        method: 'PATCH',
        url: `app/admin/approve/${userId}`,
        headers: {
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        failOnStatusCode: false,
      }),
    );
});

Cypress.Commands.add('getInfoAccount', (email, pass) => {
  cy.log('Get Info Account')
    .loginAPI(email, pass)
    .then((res) => {
      cy.request({
        method: 'GET',
        url: 'app/settings/account.json',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
      });
    });
});

Cypress.Commands.add(
  'signUpClientByAPI',
  (
    clientEmail,
    clientPassword = 'qaAutomation2021',
    firstName = 'Clark',
    lastName = 'Kent',
    postCodeId = '2000',
    address = 'Barangaroo',
    phone = '0491570110',
  ) => {
    cy.log('Request: signUp A Client');
    cy.request({
      method: 'POST',
      url: 'app/users.json',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'x-api-key': Cypress.env('x-api-key'),
        'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
      },
      body: {
        user: {
          account_type: 'Consumer',
          contact_phone: phone,
          email: clientEmail,
          first_name: firstName,
          found_us: 'Google',
          last_name: lastName,
          password: clientPassword,
          postcode: postCodeId,
          address_line_2: address,
          optimizely_user_id: {
            __zone_symbol__state: null,
            __zone_symbol__value: [],
          },
          opt_in_marketing: true,
          consent_to_collect_sensitive_information: true,
          voucher_code: null,
          consumer_profile_attributes: {
            participant_relationship: 'Self',
            participants_attributes: [],
            type_of_care: 'Disability Support',
            current_funding_source: 'Self Managed NDIS Funding',
            estimated_weekly_support_hour: 'med',
            funding_source_id: 1,
            age_of_receiver: 199,
          },
        },
      },
    });
  });
Cypress.Commands.add('completeServiceProfile', (email, pass) => {
  cy.log('Complete Profile')
    .loginAPI(email, pass)
    .then((res) =>
      cy.request({
        method: 'PATCH',
        url: '/api/v1/user',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          user: {
            carer_profile_attributes: {
              my_type: ['Social'],
              service_ids: [3209],
            },
          },
        },
      }),
    );
});

Cypress.Commands.add('completeProfile', (emailWorker, passWorker) => {
  cy.log('Complete Profile')
    .loginAPI(emailWorker, passWorker)
    .then((res) =>
      cy.request({
        method: 'PATCH',
        url: '/api/v1/user',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          user: {
            carer_profile_attributes: {
              experiences_json: [
                {
                  title: 'add automation',
                  company: 'company abc',
                  start_at: '1/06/2013',
                  end_at: '1/03/2014',
                  service_provided: '',
                },
              ],
              degrees_json: [
                {
                  institution: 'Institution test',
                  degree: 'IT',
                  start_at: '1/01/2003',
                  end_at: '1/01/2008',
                },
              ],
              bank_account_details_account_name: 'Account name testing',
              bank_account_details_bank_name: 'Bank name testing',
              bank_account_details_bsb: '123456',
              bank_account_details_account_number: '1234567890',
              bank_responsibility: true,
              first_hour_for_free: true,
              available_days: [
                'Saturday',
                'Sunday',
                'Friday',
                'Thursday',
                'Wednesday',
                'Tuesday',
                'Monday',
              ],
              care_knowledge: [
                'aged_care',
                'chronic_medical',
                'disability',
                'mental_health',
                'acquired_brain_injury',
                'spinal_cord_injurty',
                'vision_impairment',
                'dementia',
                'anxiety',
                'bipolar_disorder',
                'arthritis',
                'cardiovascular_disease',
              ],
              lgbti_friendly: true,
              has_seasonal_flu_shot: null,
              first_languages: ['Vietnamese', 'English'],
              second_languages: [],
              cultural_backgrounds: ['Asian', 'Vietnamese'],
              religions: ['None'],
              interests: [
                'Cooking',
                'CulturalFestivities',
                'Gardening',
                'IndoorGames',
                'Movies',
                'Music',
              ],
              personality: 'relaxed',
              non_smoker: false,
              pet_friendly: true,
              restrictions: ['NonSmoker'],
            },
          },
        },
      }),
    );
});

Cypress.Commands.add(
  'setPostCode',
  (
    email,
    pass,
    post_code_id = 34464,
    name = 'Arndell Park NSW 2148',
  ) => {
    cy.log('Set Post Code')
      .loginAPI(email, pass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: '/api/v1/carer_locations',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            carer_location: {
              post_code_geo_id: post_code_id,
              name,
            },
          },
        }),
      );
  },
);

Cypress.Commands.add('setRate', (email, pass) => {
  cy.log('Set Rate')
    .loginAPI(email, pass)
    .then((res) =>
      cy.request({
        method: 'POST',
        url: '/api/v1/carer_rates',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        body: {
          rate_name: 'Weekday',
          rate_cents: 5000,
          flat_rate: false,
        },
      }),
    );
});

Cypress.Commands.add(
  'createApprovedWorker',
  (
    emailWorker,
    firstName,
    lastName,
    post_code_id,
    post_code_name,
    post_code = '2000',
  ) => {
    cy.signUpWorkerByAPI(emailWorker, firstName, lastName, post_code).then(
      () => {
        cy.wait(2000)
          .getInfoAccount(emailWorker, 'password')
          .then((infoAcc) => cy
            .completeProfile(emailWorker, 'password')
            .setPostCode(
              emailWorker,
              'password',
              post_code_id,
              post_code_name,
            )
            .setTimeAvailableAPI(emailWorker, 'password')
            .setRate(emailWorker, 'password')
            .setOverSeaResidencyAPI(emailWorker, 'password', true)
            .approveAcc(infoAcc.body.data.id));
      },
    );
  },
);

Cypress.Commands.add(
  'signUpCoordinatorByAPI',
  (
    coEmail,
    firstName = 'Toan',
    lastName = 'TS',
    postCodeId = '2000',
    phone = '0491570110',
  ) => {
    cy.log('Request: signUp A Coordinator')

      .loginAPI(adminEmail, adminPass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: '/api/v1/coordinators/register.json',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            organisation_id: '',
            user: {
              email: coEmail,
              contact_phone: phone,
              first_name: firstName,
              last_name: lastName,
              address_line_1: '2nd ave',
              address_line_2: 'Barangaroo',
              consent_to_collect_sensitive_information: true,
              opt_in_marketing: '',
              re_captcha: '',
              ga_client_id: '657167102.1627974080',
              password: 'qaAutomation2021',
              state: 'New South Wales',
              postcode: postCodeId,
            },
          },
        }),
      );
  },
);

Cypress.Commands.add(
  'signUpCoordinatorClientManagedByAPI',
  (
    coEmail,
    firstName = 'Toan',
    lastName = 'TS',
    postCodeId = '2000',
    phone = '0491570110',
  ) => {
    cy.log('Request: signUp A Coordinator - client managed')
      .loginAPI(adminEmail, adminPass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: '/api/v1/coordinators/clients.json',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            organisation_id: '',
            coordinator_id: 19528,
            user: {
              email: coEmail,
              contact_phone: phone,
              first_name: firstName,
              last_name: lastName,
              address_line_1: '2nd venu',
              address_line_2: 'Barangaroo',
              med_assistance: false,
              gender: 'male',
              birth_date: '15/6/1966',
              consumer_profile_attributes: {
                managed_as: 'self-managed',
                type_of_care: 'Post-Surgery',
                what_care: '',
                funding_source_id: '',
                behaviour_support_plan: '',
              },
              password: 'qaAutomation2021',
              state: 'New South Wales',
              postcode: postCodeId,
              ga_client_id: '657167102.1627974080',
            },
          },
        }),
      );
  },
);

Cypress.Commands.add(
  'signUpAClientAndApprovedByAPI',
  (
    clientEmail,
    clientPassword = 'qaAutomation2021',
    firstName = 'Clark',
    lastName = 'Kent',
    postCodeId = '2000',
    address = 'Barangaroo',
    phone = '0491570110',
  ) => {
    cy.signUpClientByAPI(
      clientEmail,
      clientPassword,
      firstName,
      lastName,
      postCodeId,
      address,
      phone,
    ).then(() => {
      cy.wait(2000)
        .getInfoAccount(clientEmail, clientPassword)
        .then((infoAcc) =>
          cy
            .approveAcc(infoAcc.body.data.id)
            .completeProfile(clientEmail, clientPassword),
        );
    });
  },
);

Cypress.Commands.add(
  'createANewContact',
  (clientEmail, clientPassword = 'qaAutomation2021', workerID = '16817') => {
    cy.loginAPI(clientEmail, clientPassword).then((res) => {
      cy.request({
        method: 'GET',
        url: `/new_contact/${workerID}.json`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
      });
    });
  },
);

Cypress.Commands.add(
  'signUpWorkerByAPI',
  (
    email = `toantsworker${faker.random.number(
      99999,
    )}${new Date().getUTCDay()}@mailinator.com`,
    firstName = 'toan',
    lastName = 'ts',
    postCodeId = '2000',
    phone = '0491570110',
  ) => {
    cy.log('Request: signUp A Worker')
      .loginAPI(adminEmail, adminPass)
      .then((res) =>
        cy.request({
          method: 'POST',
          url: 'app/users.json',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            user: {
              account_type: 'Carer',
              contact_phone: phone,
              email,
              first_name: firstName,
              found_us: 'Google',
              last_name: lastName,
              password: 'password',
              postcode: postCodeId,
              optimizely_user_id: {
                __zone_symbol__state: null,
                __zone_symbol__value: [],
              },
              opt_in_marketing: true,
              consent_to_collect_sensitive_information: true,
              voucher_code: null,
              carer_profile_attributes: {
                target_work_amount: 'low',
              },
            },
          },
        }),
      );
  },
);

Cypress.Commands.add(
  'setOverSeaResidencyAPI',
  (email, password, isOver18 = false) => {
    cy.log('Request: Available For Work On')
      .loginAPI(email, password)
      .then((res) => {
        cy.request({
          method: 'PATCH',
          url: 'app/api/v1/workers/overseas_residency',
          headers: {
            Accept: 'application/json, text/plain, */*',
            'x-api-key': Cypress.env('x-api-key'),
            'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
            Authorization: `Bearer ${res.body.token}`,
          },
          body: {
            stat_dec_other_country_resident: isOver18,
          },
        });
      });
  },
);

Cypress.Commands.add(
  'setTimeAvailableAPI',
  (email, password) => {
    cy.log('Request: Available For Work On')
      .loginAPI(email, password)
      .then((res) => {
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
            operationName: 'updateWorkerAvailability',
            variables: {
              UpdateWorkerAvailabilityInput: {
                available: true,
                monday: true,
                mondayTimes: [
                  {
                    id: null,
                    startTime: '00:00',
                    endTime: '23:30',
                  },
                ],
                tuesday: true,
                tuesdayTimes: [
                  {
                    id: null,
                    startTime: '00:00',
                    endTime: '23:30',
                  },
                ],
                wednesday: true,
                wednesdayTimes: [
                  {
                    id: null,
                    startTime: '00:00',
                    endTime: '23:30',
                  },
                ],
                thursday: true,
                thursdayTimes: [
                  {
                    id: null,
                    startTime: '00:00',
                    endTime: '23:30',
                  },
                ],
                friday: true,
                fridayTimes: [
                  {
                    id: null,
                    startTime: '00:00',
                    endTime: '23:30',
                  },
                ],
                saturday: true,
                saturdayTimes: [
                  {
                    id: null,
                    startTime: '00:00',
                    endTime: '23:30',
                  },
                ],
                sunday: true,
                sundayTimes: [
                  {
                    id: null,
                    startTime: '00:00',
                    endTime: '23:30',
                  },
                ],
                desiredHours: 18,
              },
            },
            query: 'mutation updateWorkerAvailability($UpdateWorkerAvailabilityInput: UpdateWorkerAvailabilityInput!) {\n  updateWorkerAvailability(input: $UpdateWorkerAvailabilityInput) {\n    availability {\n      available\n      monday\n      tuesday\n      wednesday\n      thursday\n      friday\n      saturday\n      sunday\n      mondayTimes {\n        id\n        startTime\n        endTime\n      }\n      tuesdayTimes {\n        id\n        startTime\n        endTime\n      }\n      wednesdayTimes {\n        id\n        startTime\n        endTime\n      }\n      thursdayTimes {\n        id\n        startTime\n        endTime\n      }\n      fridayTimes {\n        id\n        startTime\n        endTime\n      }\n      saturdayTimes {\n        id\n        startTime\n        endTime\n      }\n      sundayTimes {\n        id\n        startTime\n        endTime\n      }\n      desiredHours\n    }\n  }\n}\n',
          },
        });
      });
  },
);

Cypress.Commands.add(
  'setMultiTimeAvailableAPI',
  (obj) => {
    const list = Object.values(obj);
    for (const item of list) {
      cy.setTimeAvailableAPI(item.email, item.password);
      cy.wait(1000);
    }
  },
);
