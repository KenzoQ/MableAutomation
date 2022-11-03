import faker from 'faker/locale/en_AU';

describe('Repost regular job (Additional)', () => {
  const duplicatejobClientEmail = 'automation_client+duplicatejob.filled@donotuse.com.au';
  const expiredjobClientEmail = 'automation_client.expiredjob@donotuse.com.au';
  const cancelledjobClientEmail = 'automation_client.cancelledjob+duplicate@donotuse.com.au';
  const clientEmail = 'automation_andrea.jobshare+client@donotuse.com.au';
  const defaultPass = 'qaAutomation2021';
  const list = {
    postCode: '2148',
    title: faker.name.jobTitle(),
    frequency: 'One-off',
    scheduling: 'I have preferred days and times',
    preDays: ['Morning'],
    hours: '5 to 10 hours',
    service: 'Community participation, sports',
    whatSupport: 'Support automation 123',
    whatQuality: 'Qualities automation 123',
    whatImportant: 'Important automation 123',
    gender: 'Female',
  };
  const suburb = '2148';
  const title = faker.name.jobTitle();
  const frequency = 'One-off';
  const scheduling = 'I have preferred days and times';
  const preDays = ['Morning', 'Afternoon'];
  const onDays = 7;
  const listDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const startTime = '08:00';
  const endTime = '21:00';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it(`1 .ES-T4206 - Client can repost a filled regular job
    2. ES-T4209 - Reposting regular job retains previous field data
    3. ES-T4222 - Client can cancel reposting a regular job`, () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .rePostAFilledRegularJob(0);
  });

  it('ES-T4207 - Client can repost an expired regular job', () => {
    cy
      .log('Login as client')
      .loginToDashboard(expiredjobClientEmail, defaultPass)

      .rePostAnExpiredRegularJob(0);
  });

  it('ES-T4208 - Client cannot repost an open regular job', () => {
    cy
      .log('Login as client')
      .loginToDashboard(clientEmail, defaultPass)

      .verifyCannotRepostAnOpenJob(0);
  });

  it('ES-T4223 - Client can repost a cancelled regular job', () => {
    cy
      .log('Login as client')
      .loginToDashboard(cancelledjobClientEmail, defaultPass)

      .rePostACancelledRegularJob(0);
  });

  it('ES-T4210 - Reposting regular job can be posted with updated field values - Job title', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log(`'Repost Job and edit title: ${title}'`)
      .rePostAndEditTitleAFilledRegularJob(0, title);
  });

  it('ES-T4211 - Reposting regular job can be posted with updated field values - Suburb', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log(`'Repost Job and edit suburb: ${suburb}'`)
      .rePostAndEditSuburbAFilledRegularJob(0, suburb);
  });

  it('ES-T4212 - Reposting public job can be posted with updated field values - Frequency', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log(`'Repost Job and edit frequency: ${frequency}'`)
      .rePostAndEditFrequencyAFilledRegularJob(0, frequency);
  });

  it('ES-T4213 - Reposting regular job can be posted with updated field values - Scheduling', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log(`'Repost Job and edit Scheduling: ${scheduling} ${onDays}'`)
      .rePostAndEditSchedulingAFilledRegularJob(0, onDays, startTime, endTime, listDays);
  });

  // outdated
  it('ES-T4214 - Reposting public job can be posted with updated field values - Estimated hrs per week', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log('\'Repost Job and edit Estimated: 5-10 \'')
      .rePostAndEditEstimatedAFilledRegularJob(0);
  });

  // outdated
  it('ES-T4215 - Reposting regular job can be posted with updated field values - Services', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log('\'Repost Job and edit service \'')
      .rePostAndEditServiceAFilledRegularJob(0);
  });

  // outdated
  it('ES-T4216 - Reposting regular job can be posted with updated field values - What will the support person do?', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log('\'Repost Job and What will the support person do? \'')
      .rePostAndWhatSupportAFilledRegularJob(0);
  });

  // outdated
  it('ES-T4217 - Reposting regular job can be posted with updated field values - What qualities are you looking for in a support person?', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log('What qualities are you looking for in a support person?')
      .rePostAndWhatQualityAFilledRegularJob(0);
  });

  // outdated
  it('ES-T4218 - Reposting regular job can be posted with updated field values - Preferred worker gender', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log('Repost and select gender')
      .rePostAndGenderAFilledRegularJob(0);
  });

  it('ES-T4220 - Reposting regular job can be posted with updated field values - What is important for support people to know about you?', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log('What is important for support people to know about you?')
      .rePostAndWhatImportantAFilledRegularJob(0);
  });

  // outdated
  it('ES-T4221 - Reposting public job can be posted with all field values updated', () => {
    cy
      .log('Login as client')
      .loginToDashboard(duplicatejobClientEmail, defaultPass)

      .log('What is important for support people to know about you?')
      .rePostAllFieldsAFilledRegularJob(0, list);
  });
});
