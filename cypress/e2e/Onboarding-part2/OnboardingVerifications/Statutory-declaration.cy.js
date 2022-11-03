describe('Statutory declaration', () => {
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T66. Stat dec information on worker profile visibility', () => {
    cy
      .log('Login as a HCP Client')
      .loginToDashboard(
        'automation.ov.highrisk.client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Search support workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Input address and click Search button.')
      .typeAddressAndSearch('Bar Beach NSW 2300')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('Scroll down and look for Leo J then click View profile')
      .viewProfileOf('Leo J')

      .log('Check stat dec information')
      .verifyTextNotExist('May be required to provide more documentation to work with an aged care client or provider.')
      .log('Click Search support workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Input address and click Search button.')
      .typeAddressAndSearch('2300')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('Scroll down and look for James W then click View profile')
      .viewProfileOf('James W')

      .log('Check stat dec information')
      .verifyTextNotExist('May be required to provide more documentation to work with an aged care client or provider.')

      .log('Click Search support workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Input address and click Search button.')
      .typeAddressAndSearch('Bar Beach NSW 2300')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('Scroll down and look for Gregg S then click View profile')
      .viewProfileOf('Gregg S')

      .log('Check stat dec information')
      .verifyTextExist('May be required to provide more documentation to work with an aged care client or provider.')

      .log('Click Search support workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Input address and click Search button.')
      .typeAddressAndSearch('Bar Beach NSW 2300')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('Scroll down and look for Summer H then click View profile')
      .viewProfileOf('Summer H')

      .log('Check stat dec information')
      .verifyTextExist('May be required to provide more documentation to work with an aged care client or provider.')

      .log('Click Search support workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Input address and click Search button.')
      .typeAddressAndSearch('Bar Beach NSW 2300')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('Scroll down and look for Skye E then click View profile')
      .viewProfileOf('Skye E')

      .log('Check stat dec information')
      .verifyTextExist('May be required to provide more documentation to work with an aged care client or provider.')

      .log('Click Search support workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Input address and click Search button.')
      .typeAddressAndSearch('Bar Beach NSW 2300')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('Scroll down and look for Bella C then click View profile')
      .viewProfileOf('Bella C')

      .log('Check stat dec information')
      .verifyTextNotExist('May be required to provide more documentation to work with an aged care client or provider.')

      .log('Click Search support workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Input address and click Search button.')
      .typeAddressAndSearch('Bar Beach NSW 2300')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('Scroll down and look for Layla Y then click View profile')
      .viewProfileOf('Layla Y')

      .log('Check stat dec information')
      .verifyTextExist('May be required to provide more documentation to work with an aged care client or provider.')

      .log('Log out')
      .clickLogoutOnTopMenu()

      .log('Login as a Non HCP Client')
      .loginToDashboard(
        'automation.ov.nonhcp.client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Search support workers')
      .navigateByLeftMenuInDashboard('Search workers')

      .log('Input address and click Search button.')
      .typeAddressAndSearch('Bar Beach NSW 2300')

      .log('Click Skip to result button.')
      .clickElementOnText('button span', 'Skip to results')

      .log('Scroll down and look for Layla Y then click View profile')
      .viewProfileOf('Layla Y')

      .log('Check stat dec information')
      .verifyTextNotExist('May be required to provide more documentation to work with an aged care client or provider.');
  });

  it('ES-T53. Statutory declaration pop up visibility', () => {
    cy
      .log('Login as unapproved worker')
      .loginToDashboard(
        'automation.marilynn.ov_compliantapprove+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check stat dec popup is not shown')
      .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')

      .clickLogoutOnTopMenu()

      .log('Login as unapproved worker')
      .loginToDashboard(
        'automation.kay.ov_noncompliantunapprove+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check stat dec popup is not shown')
      .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')

      .clickLogoutOnTopMenu()

      .log('Login as compliant worker')
      .loginToDashboard(
        'automation.gemma.ov_compliantstatno+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check stat dec popup is not shown')
      .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')

      .clickLogoutOnTopMenu()

      .log('Login as non compliant worker, not high risk')
      .loginToDashboard(
        'automation.gregg.ov_noncompliantlowrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check stat dec popup is not shown')
      .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')

      .clickLogoutOnTopMenu()

      .log('Login as non compliant worker, not high risk')
      .loginToDashboard(
        'automation.summer.ov_noncompliantlowrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check stat dec popup is not shown')
      .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')

      .clickLogoutOnTopMenu()

      .log('Login as non compliant worker')
      .loginToDashboard(
        'automation.skye.ov_noncomplianthighrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check stat dec popup is not shown')
      .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')

      .clickLogoutOnTopMenu()

    // .log('Login as non compliant worker')
    // .loginToDashboard(
    //   'automation.bella.ov_noncomplianthighrisk+worker@donotuse.com.au',
    //   'qaAutomation2021',
    // )

    // .log('Check stat dec popup is not shown')
    // .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')

    // .clickLogoutOnTopMenu()
    // .reload()

      .log('Login as non compliant worker')
      .loginToDashboard(
        'automation.layla.ov_noncomplianthighrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check stat dec popup is not shown')
      .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')

      .clickLogoutOnTopMenu()

      .log('Login as client')
      .loginToDashboard(
        'automation.ov.highrisk.client@donotuse.com.au ',
        'qaAutomation2021',
      )

      .log('Check stat dec popup is not shown')
      .verifyTextNotExistOrVisible('h3', 'Additional Profile Questions')
      .clickLogoutOnTopMenu()
      .reload();
  });

  it('ES-T57. Check statutory declaration tile UI', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.skye.ov_noncomplianthighrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyTextVisible('Statutory declaration due')
      .get('.updateDue div.updateType')
      .contains('Statutory declaration due')
      .parent()
      .find('.small')
      .click()

      .log('User is directed new page')
      .url()
      .should('include', '/overseas-residency');
  });

  it('ES-T58. Statutory declaration tile visibility', () => {
    cy
      .log('Login as unapproved worker')
      .loginToDashboard(
        'automation.marilynn.ov_compliantapprove+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyUpdateDueStatDecNotExist()

      .clickLogoutOnTopMenu()
      .reload()

      .log('Login as unapproved worker')
      .loginToDashboard(
        'automation.kay.ov_noncompliantunapprove+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyUpdateDueStatDecNotExist()

      .clickLogoutOnTopMenu()
      .reload()

      .log('Login as complaint worker')
      .loginToDashboard(
        'automation.gemma.ov_compliantstatno+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyUpdateDueStatDecNotExist()

      .clickLogoutOnTopMenu()
      .reload()

      .log('Login as non complaint worker')
      .loginToDashboard(
        'automation.james.ov_noncompliantapprove+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyUpdateDueStatDecNotExist()

      .clickLogoutOnTopMenu()
      .reload()

      .reload()
      .log('Login as non complaint worker')
      .loginToDashboard(
        'automation.gregg.ov_noncompliantlowrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyUpdateDueStatDecNotExist()

      .clickLogoutOnTopMenu()
      .reload()

      .log('Login as non complaint worker, not a high risk')
      .loginToDashboard(
        'automation.summer.ov_noncompliantlowrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyUpdateDueStatDecNotExist()

      .clickLogoutOnTopMenu()
      .reload()

      .log('Login as non complaint worker')
      .loginToDashboard(
        'automation.skye.ov_noncomplianthighrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyTextExist('Statutory declaration due')

      .clickLogoutOnTopMenu()
      .reload()

      .log('Login as non complaint worker')
      .loginToDashboard(
        'automation.layla.ov_noncomplianthighrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyTextExist('Statutory declaration due')

      .clickLogoutOnTopMenu()
      .reload()

      .log('Login as a client')
      .loginToDashboard(
        'automation.ov.highrisk.client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check update tile content')
      .verifyUpdateDueStatDecNotExist()

      .clickLogoutOnTopMenu()
      .reload();
  });

  it('ES-T65. Check stat dec message information on support worker profile UI', () => {
    cy
      .log('Login as unapproved worker')
      .loginToDashboard(
        'automation.ov.highrisk.client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Inbox')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Select Christian Hyatt')
      .clickElementOnText('span', 'Christian')

      .log('Click View profile')
      .clickElementOnText(
        'button span',
        'View profile',
      )

      .log('Check the message information is visible')
      .verifyTextExist('May be required to provide more documentation to work with an aged care client or provider.')

      .log('Click learn more')
      .clickElement('.medicineBasedServices a', true, 1)

    // .log('Verify new popup is shown')
    // .verifyTextExist('Statutory Declaration')

      .log('Click Close btn')
      .clickElementOnText(
        'mat-dialog-container button',
        'Close',
      )
      .verifyTextNotExist('Statutory Declaration');
  });

  it('ES-T67. Check request agreement UI, HCP Client', () => {
    cy
      .log('Login as HCP client')
      .loginToDashboard(
        'automation.ov.highrisk.client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Inbox')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Choose conversation')
      .clickElementOnText('span', 'Angelina')

      .log('Check conversation page')
      .verifyTextNotExistOrVisible('div', 'Angelina is required to provide Mable with a Statutory Declaration. They will be unable to enter into an agreement with you until this is completed.')

      .log('Click/Check Request an Agreement')
      .verifyTextVisible('p', 'You have requested an agreement from Angelina C.')

      .log('Click Inbox')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Select Inbox of Layla')
      .clickElementOnText('span', 'Layla')

      .log('Check conversation page')
      .verifyTextVisible('Layla is required to provide Mable with a Statutory Declaration. They will be unable to enter into an agreement with you until this is completed.')

      .log('Check request agreement button')
      .verifyElementContainsTextNotExist('button span', 'Request an agreement')

      .log('Click learn more')
      .clickElementByText('Learn more')

      .log('Check pop up content')
      .verifyElementExist('mat-dialog-container')

      .log('Click ok button')
      .clickElementOnText('mat-dialog-container button', 'Ok')
      .verifyElementNotExist('mat-dialog-container');
  });

  it('ES-T69. Check request agreement UI, non HCP Client', () => {
    cy
      .log('Login as HCP client')
      .loginToDashboard(
        'automation.ov.nonhcp.client@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Inbox')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Choose conversation')
      .clickElementOnText('span', 'Angelina')

      .log('Check conversation page')
      .verifyTextNotExistOrVisible('div', 'Angelina is required to provide Mable with a Statutory Declaration. They will be unable to enter into an agreement with you until this is completed.')

      .log('Click/Check Request an Agreement')
      .verifyTextVisible('p', 'You have requested an agreement from Angelina Cole.')

      .log('Click Inbox')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Select Inbox of Layla')
      .clickElementOnText('span', 'Layla')

      .log('Check conversation page')
      .verifyTextNotExistOrVisible('div', 'Layla is required to provide Mable with a Statutory Declaration. They will be unable to enter into an agreement with you until this is completed.')

      .log('Click/Check request agreement button')
      .verifyTextVisible('p', 'You have requested an agreement from Layla Young.');
  });

  it('ES-T70. Check create an agreement to HCP client UI', () => {
    cy

      .log('Login as an non compliant worker')
      .loginToDashboard(
        'automation.layla.ov_noncomplianthighrisk+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click Inbox')
      .navigateByLeftMenuInDashboard('Inbox')
      .checkInboxPopup()

      .log('Choose conversation')
      .clickElementOnText('span', 'High')

      .log('Check conversation screen')
      .verifyTextVisible('To complete your profile and send an offer to High Risk, complete and upload your statutory declaration.')

      .log('Check Offer an agreement button')
      .verifyTextNotExist('Offer an agreement')

      .log('Click Send an offer button')
      .verifyTextNotExist('Send an offer')

      .log('Click "Make statutory declaration" button.')
      .clickElementOnText(
        'button span',
        'Upload declaration',
      )
      .verifyTextExist('Additional Profile Questions')
      .clickLogoutOnTopMenu()
      .reload();
  });

  it('ES-T52. Check statutory declaration pop up UI', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.rogelio.trantow.onboardingverification+worker@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Check stat dec popup content')
      .verifyTextVisible('Additional Profile Questions')
      .verifyElementContainsText(
        '.radioLabel',
        'Yes',
      )
      .verifyElementContainsText(
        '.radioLabel',
        'No',
      )
      .verifyElementContainsText(
        '.actionContainer button',
        'Continue',
      );
  });
});
