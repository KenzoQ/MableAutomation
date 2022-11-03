import moment from 'moment';

Cypress.Commands.add('getDeliveredAsClient', (clientEmail, clientPass) => {
  cy.log('Request: Get The Timesheet List');
  cy.loginAPI(clientEmail, clientPass).then((res) => {
    cy.request({
      method: 'POST',
      url: 'app/graphql',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'x-api-key': Cypress.env('x-api-key'),
        'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
        Authorization: `Bearer ${res.body.token}`,
      },
      body: { variables: {}, query: '{\n  eventDeliveries(\n    first: 20\n    last: null\n    after: null\n    before: null\n    search: null\n    carerId: null\n    clientId: null\n    filter: "delivered"\n    onlyWithIncident: null\n  ) {\n    nodes {\n      actualState\n      agreement {\n        id\n      }\n      agreementRateId\n      approvedAt\n      canQuery\n      canEditApproved\n      carerFullName\n      carerInvoiceStatementId\n      carerPaidByPaynow\n      carerPaidAt\n      carerPaidStatus\n      createdAt\n      client {\n        fullName\n      }\n      collectedAt\n      collectionOverdue\n      consumerPaidAt\n      consumerPaymentMethodCode\n      deletable\n      deliveryDate\n      deliveryTime\n      deliveryHours\n      deliveredHours\n      deliveredHoursAndMinutes\n      deliveredCost\n      deliveredStartTime\n      endTime\n      firstName\n      feePercentage\n      formattedGstClient\n      hasIncident\n      horizonOneOfferApprovedAt\n      horizonOneOfferDeclinedAt\n      horizonOfferDeclinedReason\n      horizonOfferStatus\n      hourlyFee\n      hourlyPaynowFee\n      id\n      isPending\n      invoicedAt\n      invoiceCarerAdvanced\n      incidentReport {\n        incidentDate\n        incidentTime\n        incidentLocation\n        incidentWho\n        incidentWhat\n        incidentDetail\n        incidentActionsTake\n        incidentShortQuestionnaire\n        incidentInjuriesDamage\n        incidentStepsPrevent\n        incidentWitness\n        incidentAlreadyNotified\n        incidentReportToOrg\n      }\n      manuallyAdvancedAt\n      netHourlyRate\n      otherUserId\n      paidAt\n      paymentDueByDate\n      paymentTooltip\n      paynowApprovedAt\n      paynowAvailable\n      paynowDisplayable\n      paynowRequested\n      paynowRequestedAt\n      paynowFeePercentage\n      paynowDeclinedAt\n      paynowRequestedStatus\n      rate\n      rateKindLabel\n      showIncidentToClient\n      showNdisItems\n      state\n      startTime\n      shiftNote {\n        description\n        canShareShiftNote\n        attachments {\n          images {\n            asset {\n              url\n            }\n          }\n        }\n      }\n      supportDurations {\n        eventDeliveryId\n        hours\n        id\n        minutes\n        name\n        planSupportItemId\n      }\n      total\n      totalFee\n      warnEdit\n      withInfoBanner\n      workerPaymentQueriedAt\n    }\n    totalCount\n    pageInfo {\n      ...PageInfo\n    }\n  }\n}\n\nfragment PageInfo on PageInfo {\n  endCursor\n  hasNextPage\n  hasPreviousPage\n  startCursor\n}\n' },
    });
  });
});

Cypress.Commands.add(
  'rejectTimesheet',
  (clientEmail, clientPass, workerName, isAll = true) => {
    cy.log('Request: Client rejects Timesheet');
    cy.loginAPI(clientEmail, clientPass).then((res) => {
      cy.getDeliveredAsClient(clientEmail, clientPass).then((deliveredRes) => {
        const deliveredList = deliveredRes.body.data.eventDeliveries.nodes.filter(
          (item) => item.actualState === 'delivered' && item.carerFullName === workerName,
        );

        if (deliveredList.length > 0 && isAll) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < deliveredList.length; i++) {
            cy.log(i);
            cy.request({
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
              body: { operationName: 'rejectTimesheet', variables: { RejectTimesheetInput: { id: deliveredList[i].id } }, query: 'mutation rejectTimesheet($RejectTimesheetInput: RejectTimesheetInput!) {\n  rejectTimesheet(input: $RejectTimesheetInput) {\n    timesheet {\n      id\n    }\n  }\n}\n' },
            });
          }
        }
        if (deliveredList.length > 0 && !isAll) {
          cy.request({
            method: 'POST',
            url: 'app/graphql',
            headers: {
              Accept: 'application/json, text/plain, */*',
              'x-api-key': Cypress.env('x-api-key'),
              'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
              Authorization: `Bearer ${res.body.token}`,
            },
            body: { operationName: 'rejectTimesheet', variables: { RejectTimesheetInput: { id: deliveredList[0].id } }, query: 'mutation rejectTimesheet($RejectTimesheetInput: RejectTimesheetInput!) {\n  rejectTimesheet(input: $RejectTimesheetInput) {\n    timesheet {\n      id\n    }\n  }\n}\n' },
          });
        }
      });
    });
  },
);

Cypress.Commands.add(
  'approvedTimesheet',
  (clientEmail, clientPass, workerName) => {
    cy.log('Request: Client Approve Timesheet');
    cy.loginAPI(clientEmail, clientPass).then((res) => {
      cy.getDeliveredAsClient(clientEmail, clientPass).then((deliveredRes) => {
        const deliveredList = deliveredRes.body.data.filter(
          (item) => item.attributes.full_name === workerName,
        )[0];

        if (!!deliveredList) {
          cy.request({
            method: 'POST',
            url: `timesheets/${deliveredList.attributes.id}/approve.json`,
            headers: {
              Accept: 'application/json, text/plain, */*',
              'x-api-key': Cypress.env('x-api-key'),
              'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
              Authorization: `Bearer ${res.body.token}`,
            },
            failOnStatusCode: false,
          });
        }
      });
    });
  },
);

Cypress.Commands.add(
  'getTimesheetsAsWorker',
  (workerEmail, workerPass, page = 1) => {
    cy.log('Request: Get timesheet list');
    cy.loginAPI(workerEmail, workerPass).then((res) => {
      cy.request({
        method: 'GET',
        url: `timesheets.json?page=${page}`,
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
  'createTimesheetAsWorkerByAPI',
  (
    workerEmail,
    workerPass,
    agreementID,
    agreementRateID,
    startTime = '08',
    endTime = '08',
    day = '',
  ) => {
    cy.log('Request: Create a timesheet');
    const today = moment(new Date()).format('DD/MM/YYYY');

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
          operationName: 'createTimesheet',
          variables: {
            CreateTimesheetInput: {
              attributes: {
                startTime: `${!!day ? day : today} ${startTime}:00 AM`,
                endTime: `${!!day ? day : today} ${endTime}:30 AM`,
                agreementId: agreementID,
                agreementRateId: agreementRateID,
                shiftNotes: 'tesst automation ',
                incidentActionsTake: null,
                incidentAlreadyNotified: null,
                incidentDate: null,
                incidentDetail: null,
                incidentInjuriesDamage: null,
                incidentLocation: null,
                incidentStepsPrevent: null,
                incidentTime: null,
                incidentWhat: null,
                incidentWho: null,
                incidentWitness: null,
                supportDurationsAttributes: [],
                showIncidentToClient: null,
                incidentReportToOrg: null,
              },
            },
          },
          query:
            'mutation createTimesheet($CreateTimesheetInput: CreateTimesheetInput!) {\n  createTimesheet(input: $CreateTimesheetInput) {\n    timesheet {\n      id\n      agreement {\n        id\n        otherUser {\n          fullName\n          firstName\n          id\n        }\n        agreementRates {\n          rateCents\n          flatRate\n          rateName\n          id\n        }\n      }\n      shiftNote {\n        description\n      }\n      consumerPaymentMethodCode\n      deliveredHoursAndMinutes\n      rate\n      rateKindLabel\n      total\n      showNdisItems\n      netHourlyRate\n      hourlyFee\n      canDeleteAssets\n      paynowFeePercentage\n      paynowDisplayable\n      supportDurations {\n        eventDeliveryId\n        hours\n        id\n        minutes\n        name\n        planSupportItemId\n      }\n      deliveredCost\n      totalFee\n      warnings\n      agreementRateId\n      isPending\n      warnEdit\n      feePercentage\n      hasIncident\n    }\n  }\n}\n',
        },
        failOnStatusCode: false,
      }),
    );
  },
);

Cypress.Commands.add(
  'createNDISTimesheetByAPI',
  (
    workerEmail,
    workerPass,
    agreementID,
    agreementRateID,
    startTime = '08',
    endTime = '08',
    day = '',
  ) => {
    cy.log('Request: Create a timesheet');

    const today = moment(new Date()).format('DD/MM/YYYY');

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
          operationName: 'createTimesheet',
          variables: {
            CreateTimesheetInput: {
              attributes: {
                startTime: `${!!day ? day : today} ${startTime}:00`,
                endTime: `${!!day ? day : today} ${endTime}:30}`,
                agreementId: agreementID,
                agreementRateId: agreementRateID,
                shiftNotes: 'test automation ',
                incidentActionsTake: null,
                incidentAlreadyNotified: null,
                incidentDate: null,
                incidentDetail: null,
                incidentInjuriesDamage: null,
                incidentLocation: null,
                incidentStepsPrevent: null,
                incidentTime: null,
                incidentWhat: null,
                incidentWho: null,
                incidentWitness: null,
                supportDurationsAttributes: [
                  {
                    id: null,
                    eventDeliveryId: null,
                    planSupportItemId: '7692',
                    hours: null,
                    minutes: 30,
                    name: 'remote microphone system',
                  },
                  {
                    id: null,
                    eventDeliveryId: null,
                    planSupportItemId: '7693',
                    hours: null,
                    minutes: null,
                    name: 'sport adaptions to wheelchair (power or manual)',
                  },
                ],
                showIncidentToClient: null,
                incidentReportToOrg: null,
              },
            },
          },
          query:
            'mutation createTimesheet($CreateTimesheetInput: CreateTimesheetInput!) {\n  createTimesheet(input: $CreateTimesheetInput) {\n    timesheet {\n      id\n      agreement {\n        id\n        otherUser {\n          fullName\n          firstName\n          id\n        }\n        agreementRates {\n          rateCents\n          flatRate\n          rateName\n          id\n        }\n      }\n      shiftNote {\n        description\n      }\n      consumerPaymentMethodCode\n      deliveredHoursAndMinutes\n      rate\n      rateKindLabel\n      total\n      showNdisItems\n      netHourlyRate\n      hourlyFee\n      canDeleteAssets\n      paynowFeePercentage\n      paynowDisplayable\n      supportDurations {\n        eventDeliveryId\n        hours\n        id\n        minutes\n        name\n        planSupportItemId\n      }\n      deliveredCost\n      totalFee\n      warnings\n      agreementRateId\n      isPending\n      warnEdit\n      feePercentage\n      hasIncident\n    }\n  }\n}\n',
        },
      }),
    );
  },
);

Cypress.Commands.add(
  'approvedTimesheetById',
  (clientEmail, clientPass, timesheetId) => {
    cy.log('Request: Client Approve Timesheet');
    cy.loginAPI(clientEmail, clientPass).then((res) => {
      cy.request({
        method: 'POST',
        url: `/timesheets/${timesheetId}/approve.json`,
        headers: {
          Accept: 'application/json, text/plain, */*',
          'x-api-key': Cypress.env('x-api-key'),
          'x-bypass-authentication': Cypress.env('x-bypass-authentication'),
          Authorization: `Bearer ${res.body.token}`,
        },
        failOnStatusCode: false,
      });
    });
  },
);

Cypress.Commands.add(
  'createTimesheetIncidentReportAsWorkerByAPI',
  (
    workerEmail,
    workerPass,
    agreementID,
    agreementRateID,
    clientID,
  ) => {
    cy.log('Request: Create support hours which it has incident report');

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
          data: {
            createTimesheet: {
              timesheet: {
                id: '30904',
                agreement: {
                  id: agreementID,
                  otherUser: {
                    fullName: 'Queenie Cartwright',
                    firstName: 'Queenie',
                    id: clientID,
                  },
                  agreementRates: [
                    {
                      rateCents: 4000,
                      flatRate: false,
                      rateName: 'Weekday',
                      id: agreementRateID,
                    },
                  ],
                },
                shiftNote: {
                  description: 'Describe your support session Describe your support session Describe your support session Describe your support session Describe your support session ',
                },
                consumerPaymentMethodCode: 'invoice',
                deliveredHoursAndMinutes: '1 hour 0 mins',
                rate: '$40.00',
                rateKindLabel: 'Hourly',
                total: '$36.00',
                showNdisItems: false,
                netHourlyRate: '$36.00',
                hourlyFee: '$4.00',
                canDeleteAssets: true,
                paynowFeePercentage: '1.5%',
                paynowDisplayable: false,
                supportDurations: [],
                deliveredCost: '4000',
                totalFee: '$4.00',
                warnings: [],
                agreementRateId: agreementRateID,
                isPending: true,
                warnEdit: false,
                feePercentage: '10%',
                hasIncident: true,
              },
            },
          },
        },
        failOnStatusCode: false,
      }),
    );
  },
);
