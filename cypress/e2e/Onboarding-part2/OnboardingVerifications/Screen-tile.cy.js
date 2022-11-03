describe('Screen tile', () => {
  before(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T3533. Screening tool tile visibility', () => {
    cy
      .log('Login worker has active agreement')
      .loginToDashboard(
        'automation.digna.screentile.approvewithagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Verify worker can see the screening tool tile')
      .verifyTextVisible('Screening tool for shifts')

      .clickLogoutOnTopMenu()

      .log('Login worker has no active agreement')
      .loginToDashboard(
        'automation.lovie.screentile.approvewithoutagreement+worker@donotuse.com.au ',
        'qaAutomation2021',
      )

      .log('Verify worker can see the screening tool tile')
      .verifyTextNotExist('Screening tool for shifts')

      .clickLogoutOnTopMenu()

      .log('Login worker has pending agreement')
      .loginToDashboard(
        'automation.alfonso.screentile.approvependingagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Verify worker can see the screening tool tile')
      .verifyTextNotExist('Screening tool for shifts')

      .clickLogoutOnTopMenu()

      .log('Login worker has requested agreement')
      .loginToDashboard(
        'automation.delmar.screentile.arpproverequestagreement+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Verify worker can see the screening tool tile')
      .verifyTextNotExist('Screening tool for shifts')

      .clickLogoutOnTopMenu()

      .log('Login client')
      .loginToDashboard(
        'automation.ov.highrisk.client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Verify worker can see the screening tool tile')
      .verifyTextNotExist('Screening tool for shifts');
  });
});
