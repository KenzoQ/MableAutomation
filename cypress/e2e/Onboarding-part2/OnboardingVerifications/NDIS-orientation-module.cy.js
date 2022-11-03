describe('NDIS orientation module', () => {
  before(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T445. NDIS orientation module dashboard tile visibility', () => {
    cy
      .log('Login as client')
      .loginToDashboard(
        'automation.ov.nonhcp.client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('NDIS orientation module dashboard tile is not visible')
      .verifyTextNotExist('NDIS Worker Orientation Module')

      .clickLogoutOnTopMenu()

      .log('Login as unapproved worker')
      .loginToDashboard(
        'automation.chad.ndis_unapprove+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('NDIS orientation module dashboard tile is not visible')
      .verifyTextNotExist('NDIS Worker Orientation Module')

      .clickLogoutOnTopMenu()

      .log('Login as approved worker')
      .loginToDashboard(
        'automation.lyman.ndis_approve+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('NDIS orientation module dashboard tile is visible')
      .verifyTextVisible('NDIS Worker Orientation Module')

      .clickLogoutOnTopMenu()

      .log('Login as approved worker')
      .loginToDashboard(
        'automation.logan.ndis_approve+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('NDIS orientation module dashboard tile is visible')
      .verifyTextVisible('NDIS Worker Orientation Module');
  });
});
