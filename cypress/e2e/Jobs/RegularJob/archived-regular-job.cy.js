/* eslint-disable no-unused-vars */
import * as data from '../../../fixtures/test-data.json';
import faker from 'faker/locale/en_AU';

describe('Archived regular job spec', () => {
  const cocoClientEmail = 'automation_coco.regularjob+client@donotuse.com.au';
  const clientPass = 'qaAutomation2021';
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1. ES-T534. Archived filled job
    2. ES-T535. Check newly Archived filled job`, () => {
    const jobTitle = faker.name.jobTitle();
    cy
      .log('Login as client')
      .loginToDashboard(cocoClientEmail, clientPass)

      // Precondition create a filled job
      .createRegularJobByAPI(cocoClientEmail, clientPass, jobTitle)

      .markAsFilledFirstJobThenSelectOption(0)

      .archivedAfilledRegularJob(0);
  });
});
