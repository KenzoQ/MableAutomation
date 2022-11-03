/* eslint-disable no-multiple-empty-lines */
// import faker from 'faker/locale/en_AU';

describe('COVID-19 Safe shift questions', () => {
  const loganleeEmail = 'automation_loganlee.covidsafeshift+client@donotuse.com.au';
  const annaleeEmail = 'automation_annalee.covidsafeshift+sw@donotuse.com.au';
  const kyujinleeEmail = 'automation_kyujinlee.covidsafeshift+client@donotuse.com.au';
  const sangaleeEmail = 'automation_sangalee.covidsafeshift+client@donotuse.com.au';

  const defaultPassword = 'qaAutomation2021';
  const covid19GlobalBanner = 'app-global-banners';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T3176. [Client] COVID-19 Safe shift global banner visibility', () => {
    cy
      .log('Login')
      .loginToDashboard(loganleeEmail, defaultPassword)

      .verifyCovid19GobalBannerVisible(covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerVisible('Inbox', covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerVisible('Support hours', covid19GlobalBanner)

      // The cypress is not support multiple tab so Only check url
      .clickElement(`${covid19GlobalBanner} button`)
      .navigationAndVerifyCovid19BannerNotVisible('Inbox', covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerNotVisible('Dashboard', covid19GlobalBanner)

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login')

      .loginToDashboard(loganleeEmail, defaultPassword)
      .verifyCovid19GobalBannerVisible(covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerVisible('Inbox', covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerVisible('Support hours', covid19GlobalBanner);
  });

  it('ES-T3175. [Worker] COVID-19 Safe shift global banner visibility', () => {
    cy
      .log('Login')
      .loginToDashboard(annaleeEmail, defaultPassword)

      .verifyCovid19GobalBannerVisible(covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerVisible('Inbox', covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerVisible('Support hours', covid19GlobalBanner)

      // The cypress is not support multiple tab so Only check url
      .clickElement(`${covid19GlobalBanner} button`)
      .navigationAndVerifyCovid19BannerNotVisible('Inbox', covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerNotVisible('Dashboard', covid19GlobalBanner)

      .log('On the top right corner of the page click "Logout"')
      .clickLogoutOnTopMenu()
      .url()
      .should('include', '/login')

      .loginToDashboard(annaleeEmail, defaultPassword)
      .verifyCovid19GobalBannerVisible(covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerVisible('Inbox', covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerVisible('Support hours', covid19GlobalBanner);
  });

  it('ES-T4236. [Client] Absence of COVID-19 Safe shift global banner', () => {
    cy
      .log('Login')
      .loginToDashboard(kyujinleeEmail, defaultPassword)

      .verifyCovid19GobalBannerNotVisible(covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerNotVisible('Inbox', covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerNotVisible('Dashboard', covid19GlobalBanner);
  });

  it('ES-T4237. [Worker] Absence of COVID-19 Safe shift global banner', () => {
    cy
      .log('Login')
      .loginToDashboard(sangaleeEmail, defaultPassword)

      .verifyCovid19GobalBannerNotVisible(covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerNotVisible('Inbox', covid19GlobalBanner)
      .navigationAndVerifyCovid19BannerNotVisible('Dashboard', covid19GlobalBanner);
  });
});



