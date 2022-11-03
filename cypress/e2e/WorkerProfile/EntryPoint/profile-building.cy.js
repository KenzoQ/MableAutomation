/* eslint-disable max-len */
/* eslint-disable no-multiple-empty-lines */
// import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('Profile building', () => {
  const workerEmail1 = 'automation_rinasmith+worker@donotuse.com.au';
  const workerEmail2 = 'automation_sebastiandavis+worker@donotuse.com.au';
  const supportEmail1 = 'automation_ninodavis+worker+dev@donotuse.com.au';
  const supportEmail2 = 'automation_kenzo.ndis+sw@donotuse.com.au';
  const supportEmail3 = 'automation_julia.barretto.ndis+sw@donotuse.com.au';
  const adminEmail = data.dashboardAccount.adminBetterCaring.email;
  const adminPassword = data.dashboardAccount.adminBetterCaring.password;
  const defaultPassword = 'qaAutomation2021';
  const newBio = data.validate.moreThan200characters + String(Date.now());

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T4318. Check Support Providers Profile Photo UI', () => {
    cy
      .log(`login ${workerEmail1}`)
      .loginToDashboard(workerEmail1, defaultPassword)

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Click the Update profile photo button')
      .verifyTextExist('Edit Profile')
      .clickElementOnText('a', 'Update profile photo')

      .verifyTextExist('My profile')
      .clickElementOnText('button', 'Continue to edit my profile')

      .log('Check the side nav under "My Profile"')
      .get('a[href="/profile-building/profile-photo"]')
      .siblings('app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '9.58V9.61Z')

      .log('Check the copy under Profile photo and How to update your photo')
      .verifyListTextExistNoWaitV2(data.profileBuildingContent.profilePhoto)

      .log('Verify the Photo guidelines')
      .verifyListTextExistNoWaitV2(data.profileBuildingContent.photoGuidelines)

      .log('Check the profile photo')
      .get('app-avatar[id="profileCardAvatar"] div')
      .invoke('attr', 'style')
      .then(value => {
        cy.get('#photoUpdate app-avatar div')
          .invoke('attr', 'style')
          .then(image => expect(image).to.equal(value));
      })

      .log('Check the Update profile photo button')
      .verifyElementContainsText('button span', 'Update profile photo')
      .verifyTextExist('Max: 5MB');
  });

  it('ES-T4323. Check the support providers Your bio UI', () => {
    cy
      .log(`login ${workerEmail2}`)
      .loginToDashboard(workerEmail2, defaultPassword)

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Click the Update profile photo button')
      .verifyTextExist('Edit Profile')
      .clickElementOnText('a', 'Edit bio')

      .verifyTextExist('My profile')
      .clickElementOnText('button', 'Continue to edit my profile')

      .log('Check the side nav under "My Profile"')
      .get('a[href="/profile-building/your-bio"]')
      .siblings('app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '9.58V9.61Z')

      .log('Check the copy under Your bio and How to update your bio')
      .verifyListTextExistNoWaitV2(data.profileBuildingContent.yourBio)

      .log('Check the bio guidelines')
      .verifyListTextExistNoWaitV2(data.profileBuildingContent.bioGuidelines)

      .log('Check the bio')
      .verifyTextExist('Minimum 200 characters')
      .verifyTextExist('/1500');
  });

  it('ES-T4324. Check support providers bio update', () => {
    // Preconditions:
    // If the support provider has already submitted the updated bio, the admin approves it.
    // If not, start executing ES-T4324 as usual.

    const userID = '24724';
    const approveButton = `button[data-action="/app/admin/accept_proposed_changes/${userID}/about"]`;

    cy.loginToDashboard(adminEmail, adminPassword)
      .verifyTextExist('Users')

      .log('On the search bar enter the email and click the search button')
      .inputTextField('input[id="search-users-input"]', supportEmail1)
      .clickElement('input[id="submit"]')

      .log('On the profile click the Edit button')
      .verifyTextExist(supportEmail1)
      .clickElementOnText('a', 'Edit')
      .verifyTextExist('return to list')

      .get('body')
      .then(($body) => {
        if ($body.find(approveButton).length > 0) {
          cy.clickElement('input[id="bio_made_changes_yes"]')

            .get(approveButton)
            .click({ force: true })
            .wait(2000);
        }
      })

      .clickLogoutOnTopMenu();

    cy
      .log(`login ${supportEmail1}`)
      .loginToDashboard(supportEmail1, defaultPassword)

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Click the Update profile photo button')
      .verifyTextExist('Edit Profile')
      .clickElementOnText('a', 'Edit bio')

      .verifyTextExist('My profile')
      .clickElementOnText('button', 'Continue to edit my profile')

      .log('Check the side nav under "My Profile"')
      .get('a[href="/profile-building/your-bio"]')
      .siblings('app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', '9.58V9.61Z')

      .log('Check the bio')
      .verifyTextExist('Minimum 200 characters')
      .verifyTextExist('/1500')

      .log('Enter the new bio')
      .inputTextField('textarea[formcontrolname="yourBio"]', 'CHANGE BIO')
      .verifyTextExist('Provide your bio with a minimum of 200 characters')

      .log('Delete all the characters in the bio')
      .clearTextField('textarea[formcontrolname="yourBio"]')
      .verifyTextExist('Provide your bio with a minimum of 200 characters')

      .log('Enter a bio with more than 1500 characters')
      .inputTextField('textarea[formcontrolname="yourBio"]', data.validate.moreThan1500characters)
      .verifyTextExist('Provide your bio with a maximum of 1500 characters')

      .log('Enter a bio between 200 - 1500 characters')
      .inputTextField('textarea[formcontrolname="yourBio"]', newBio)
      .verifyElementNotExist('[label="invalid field:"]')

      .clickElementOnText('button span', 'Submit for approval')

      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Click the Update profile photo button')
      .verifyTextExist('Edit Profile')
      .clickElementOnText('a', 'Edit bio')

      .verifyTextExist('My profile')
      .verifyTextExist('We’re reviewing your bio')
      .verifyTextExist('Your bio is in review. If approved, it will be updated within the next 48 hours. If there’s a problem, we’ll contact you by email');
  });

  it('ES-T4325. Check the support providers Your bio message via email - Admin approved', () => {
    // Preconditions: ES-T4324
    // Note: ES-T4324 and ES-T4325 must run in pairs.

    const SPName = 'Nino Davis';

    cy
      .log(`login ${supportEmail1}`)
      .loginToDashboard(supportEmail1, defaultPassword)

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Click the Update profile photo button')
      .verifyTextExist('Edit Profile')
      .clickElementOnText('a', 'Edit bio')

      .verifyTextExist('My profile')
      .clickElementOnText('button', 'Continue to edit my profile')

      .log('Check the banner')
      .verifyTextExist('We’re reviewing your bio')
      .verifyTextExist('Your bio is in review. If approved, it will be updated within the next 48 hours. If there’s a problem, we’ll contact you by email')

      .clickLogoutOnTopMenu()
      .loginToDashboard(adminEmail, adminPassword)

      .verifyTextExist('Users')

      .log('On the search bar enter the SP name and click the search button')
      .inputTextField('input[id="search-users-input"]', SPName)
      .clickElement('input[id="submit"]')

      .log('On the SP name/profile click the Edit button')
      .verifyTextExist(SPName)
      .clickElementOnText('a', 'Edit')

      .log('Scroll down and look for the Your bio')
      .verifyTextExist('Bio')

      .log('Check the bio')
      .verifyTextExist('Current bio')
      .verifyTextExist('New bio')
      .verifyTextExist('Did you make any changes to the new bio?')
      .verifyTextExist('Approve')
      .verifyTextExist('Decline')

      .log('Select Yes on Did you make any changes to the new bio?')
      .clickElement('input[id="bio_made_changes_yes"]')
      .verifyTextExist('Outline the changes made to their new bio')
      .verifyTextExist('For example, explain why this bio doesn\'t meet our guidelines.')

      .log('Check the error state by inputting character on the field then removing it.')
      .inputTextField('textarea[name="admin_comment"]', 'This is test comment')
      .clearTextField('textarea[name="admin_comment"]')
      .verifyTextExist('Outline the changes made')

      .log('Enter any character then Click the Approve button')
      .clickElementOnText('button', 'Approve')

      .verifyTextExist(newBio);
  });

  it('ES-T4329. Check Support providers WWCC UI', () => {
    // Preconditions:
    // If the support provider has already submitted the updated WWCC, the admin approves it.
    // If not, start executing ES-T4329 as usual.

    const userID = '24661';
    const approveButton = `button[data-action="/app/admin/accept_proposed_changes/${userID}/wwcc"]`;

    cy.loginToDashboard(adminEmail, adminPassword)
      .verifyTextExist('Users')

      .log('On the search bar enter the email and click the search button')
      .inputTextField('input[id="search-users-input"]', supportEmail2)
      .clickElement('input[id="submit"]')

      .log('On the profile click the Edit button')
      .verifyTextExist(supportEmail2)
      .clickElementOnText('a', 'Edit')
      .verifyTextExist('return to list')

      .get('body')
      .then(($body) => {
        if ($body.find(approveButton).length > 0) {
          cy
            .get(approveButton)
            .click({ force: true })
            .wait(2000);
        }
      })

      .clickLogoutOnTopMenu();

    cy
      .log(`login ${supportEmail2}`)
      .loginToDashboard(supportEmail2, defaultPassword)

      .log('On the left menu panel, click Edit Profile ')
      .clickElementOnText('span', 'Edit profile')

      .log('On the side nav, click the WWCC')
      .clickElement('a[href="/profile-building/working-with-children-check"]')

      .log('Check the Working with Children Check and Submitting your Working with Children Check copies')
      .log('Verify the side banner copy: How to apply for a Working with Children Check')
      .verifyListTextExistNoWaitV2(data.profileBuildingContent.WWCC)

      .log('Verify the mandatory fields, and button on the WWCC page')
      .verifyTextExist('Enter your Working with Children Check reference number')
      .verifyTextExist('Expiry date')
      .verifyTextExist('Day')
      .verifyTextExist('Month')
      .verifyTextExist('Year')
      .verifyTextExist('You must upload a copy of your Working with Children Check')
      .verifyTextExist('Upload file');
  });

  it('ES-T4330. Check Support providers WWCC Update', () => {
    // Preconditions:
    // If the support provider has already submitted the updated WWCC, the admin approves it.
    // If not, start executing ES-T4330 as usual.

    const referenceNumber = '123456778';
    const userID = '24661';
    const approveButton = `button[data-action="/app/admin/accept_proposed_changes/${userID}/wwcc"]`;

    cy.loginToDashboard(adminEmail, adminPassword)
      .verifyTextExist('Users')

      .log('On the search bar enter the email and click the search button')
      .inputTextField('input[id="search-users-input"]', supportEmail2)
      .clickElement('input[id="submit"]')

      .log('On the profile click the Edit button')
      .verifyTextExist(supportEmail2)
      .clickElementOnText('a', 'Edit')
      .verifyTextExist('return to list')

      .get('body')
      .then(($body) => {
        if ($body.find(approveButton).length > 0) {
          cy
            .get(approveButton)
            .click({ force: true })
            .wait(2000);
        }
      })

      .clickLogoutOnTopMenu();

    cy
      .log(`login ${supportEmail2}`)
      .loginToDashboard(supportEmail2, defaultPassword)

      .log('On the left menu panel, click Edit Profile ')
      .clickElementOnText('span', 'Edit profile')

      .log('On the side nav, click the WWCC')
      .clickElement('a[href="/profile-building/working-with-children-check"]')

      .log('Check the side NAV under My profile')
      .get('a[href="/profile-building/working-with-children-check"]')
      .parents('li')
      .should('have.class', 'selected')

      .log('Verify the mandatory fields, and button on the WWCC page')
      .verifyTextExist('Enter your Working with Children Check reference number')
      .verifyTextExist('Expiry date')
      .verifyTextExist('Day')
      .verifyTextExist('Month')
      .verifyTextExist('Year')
      .verifyTextExist('You must upload a copy of your Working with Children Check')
      .verifyTextExist('Upload file')

      .log('Click the field under the WWCC reference number')
      .inputTextField('input[formcontrolname="number"]', referenceNumber)

      .log('Delete the entered number')
      .get('input[formcontrolname="number"]')
      .clear()
      .verifyTextExist('Provide a number')
      .inputTextField('input[formcontrolname="number"]', referenceNumber)

      .log('Enter data on the expiry date')
      .selectDropdown(
        'select',
        '4',
        0,
      )
      .selectDropdown(
        'select',
        'January',
        1,
      )
      .selectDropdown(
        'select',
        '2024',
        2,
      )

      .log('Upload the document')
      .get('input[accept="image/*,application/pdf"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist('a.delete')
      .verifyTextExist('Submit for verification')

      .log('Click the x button')
      .clickElement('a.delete')
      .verifyTextExist(' Delete File ')
      .verifyTextExist(' Are you sure you want to delete file? ')

      .log('Click the No button')
      .clickElementOnText('button', 'No')
      .wait(2000)

      .log('Click the x button and tap the Yes button')
      .clickElement('a.delete')
      .clickElementOnText('button', 'Yes')
      .wait(2000)
      .verifyTextNotExist('debit.pdf')

      .log('Reupload the file')
      .get('input[accept="image/*,application/pdf"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist('a.delete')

      .log('Click the Submit for verification button')
      .clickElementOnText('button span', 'Submit for verification')
      .verifyElementNotExist('Submit for verification')

      .log('Check the WWCC banner')
      .verifyTextExist('We’re verifying your Working with Children Check')
      .verifyTextExist('Verification can take up to 48 hours. If there’s a problem, we’ll contact you by email. Once complete, your Working with Children Check will show as verified in your profile')

      .log('Click the Dashboard button/link on the left nav')
      .navigateByLeftMenuInDashboard('Dashboard')

      .log('Click the Build profile button and revisit the WWCC page')
      .clickElementOnText('span', 'Edit profile')
      .clickElement('a[href="/profile-building/working-with-children-check"]')

      .verifyTextExist('We’re verifying your Working with Children Check')
      .verifyTextExist('Verification can take up to 48 hours. If there’s a problem, we’ll contact you by email. Once complete, your Working with Children Check will show as verified in your profile')
      .get('input[formcontrolname="number"]')
      .should('have.value', referenceNumber)
      .get('select')
      .eq(0)
      .should('have.value', '4')
      .get('select')
      .eq(1)
      .should('have.value', '1')
      .get('select')
      .eq(2)
      .should('have.value', '2024');
  });

  it('ES-T4341. Check CPR certificate update', () => {
    // Preconditions:
    // If the support provider has already submitted the updated CPR certificate, the admin approves it.
    // If not, start executing ES-T4341 as usual.

    const userID = '24661';
    const title = 'CPR Certificate (HLTAID0012/HLTAID009 and previously HLTAID004/HLTAID001)';
    const approveButton = `button[data-action="/app/admin/accept_proposed_changes/${userID}/cpr_certificate"]`;

    cy.loginToDashboard(adminEmail, adminPassword)
      .verifyTextExist('Users')

      .log('On the search bar enter the email and click the search button')
      .inputTextField('input[id="search-users-input"]', supportEmail2)
      .clickElement('input[id="submit"]')

      .log('On the profile click the Edit button')
      .verifyTextExist(supportEmail2)
      .clickElementOnText('a', 'Edit')
      .verifyTextExist('return to list')

      .get('body')
      .then(($body) => {
        if ($body.find(approveButton).length > 0) {
          cy
            .get(approveButton)
            .click({ force: true })
            .wait(2000);
        }
      })

      .clickLogoutOnTopMenu();

    cy
      .log(`login ${supportEmail2}`)
      .loginToDashboard(supportEmail2, defaultPassword)

      .log('On the left menu panel, click Edit Profile ')
      .clickElementOnText('span', 'Edit profile')

      .log('On the side nav, tap the Additional training')
      .clickElement('a[href="/profile-building/additional-training"]')

      .log('Check the left NAV')
      .get('a[href="/profile-building/additional-training"]')
      .parents('li')
      .should('have.class', 'selected')

      .log('Click the CPR Certificate')
      .clickElementOnText('h3', title)
      .verifyTextExist(' Upload file ')

      .log('Upload the file')
      .get('input[accept="image/*,application/pdf"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist('a.delete')

      .log('Click the x button')
      .clickElement('a.delete')
      .verifyTextExist(' Delete File ')
      .verifyTextExist(' Are you sure you want to delete file? ')

      .log('Click the No button')
      .clickElementOnText('button', 'No')
      .wait(2000)

      .log('Click the x button and tap the Yes button')
      .clickElement('a.delete')
      .clickElementOnText('button', 'Yes')

      .log('Reupload the file')
      .get('input[accept="image/*,application/pdf"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist('a.delete')

      .log('Enter data on the issue date')
      .selectDropdown(
        'select',
        '1',
        0,
      )
      .selectDropdown(
        'select',
        'January',
        1,
      )
      .selectDropdown(
        'select',
        '2022',
        2,
      )

      .log('Click the submit for verification button')
      .clickElementOnText('button span', 'Submit for verification')
      .verifyTextExist('We’re verifying your additional training documents')
      .verifyTextExist('Verification can take up to 48 hours. If there’s a problem, we’ll contact you by email. Once complete, your additional training will display in your profile.');
  });

  it('ES-T4344. Check the First Aid certificate update', () => {
    // Preconditions:
    // If the support provider has already submitted the updated First Aid certificate, the admin approves it.
    // If not, start executing ES-T4344 as usual.
    const userID = '31663';
    const title = 'First Aid (HLTAID0012/HLTAID011 and previously HLTAID004 /HLTAID03) ';
    const approveButton = `button[data-action="/app/admin/accept_proposed_changes/${userID}/first_aid"]`;

    cy.loginToDashboard(adminEmail, adminPassword)
      .verifyTextExist('Users')

      .log('On the search bar enter the email and click the search button')
      .inputTextField('input[id="search-users-input"]', supportEmail3)
      .clickElement('input[id="submit"]')

      .log('On the profile click the Edit button')
      .verifyTextExist(supportEmail3)
      .clickElementOnText('a', 'Edit')
      .verifyTextExist('return to list')

      .get('body')
      .then(($body) => {
        if ($body.find(approveButton).length > 0) {
          cy
            .get(approveButton)
            .click({ force: true })
            .wait(2000);
        }
      })

      .clickLogoutOnTopMenu();

    cy
      .log(`login ${supportEmail3}`)
      .loginToDashboard(supportEmail3, defaultPassword)

      .log('On the left menu panel, click Edit Profile ')
      .clickElementOnText('span', 'Edit profile')

      .log('On the side nav, tap the Additional training')
      .clickElement('a[href="/profile-building/additional-training"]')
      .verifyTextExist('Select any additional training you’ve completed and upload your documents for verification.')

      .log('Uncheck all additional')
      .get('body')
      .then(($body) => {
        const n = $body.find('mat-checkbox.mat-checkbox-checked').length;

        if (n > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < n; i++) {
            cy.get('mat-checkbox.mat-checkbox-checked h3')
              .eq(0)
              .click({ force: true })
              .wait(1000);
          }
        }
      })

      .log('On the UI, click the First Aid')
      .wait(1000)
      .clickElementOnText('h3', title)

      .log('Upload the file')
      .get('input[accept="image/*,application/pdf"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist('a.delete')

      .log('Click the x button')
      .clickElement('a.delete')
      .verifyTextExist(' Delete File ')
      .verifyTextExist(' Are you sure you want to delete file? ')

      .log('Click the No button')
      .clickElementOnText('button', 'No')
      .wait(2000)

      .log('Click the x button and tap the Yes button')
      .clickElement('a.delete')
      .clickElementOnText('button', 'Yes')
      .wait(2000)
      .verifyTextNotExist('debit.pdf')

      .log('Reupload the file')
      .get('input[accept="image/*,application/pdf"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist('a.delete')

      .log('Enter data on the issue date')
      .selectDropdown(
        'select',
        '1',
        0,
      )
      .selectDropdown(
        'select',
        'January',
        1,
      )
      .selectDropdown(
        'select',
        '2022',
        2,
      )

      .log('Click the submit for verification button')
      .clickElementOnText('button span', 'Submit for verification')
      .verifyTextExist('We’re verifying your additional training documents')
      .verifyTextExist('Verification can take up to 48 hours. If there’s a problem, we’ll contact you by email. Once complete, your additional training will display in your profile.');
  });

  it('ES-T4347. Check the Drivers licence certificate update', () => {
    // Preconditions:
    // If the support provider has already submitted the updated Drivers licence certificate, the admin approves it.
    // If not, start executing ES-T4347 as usual.

    const userID = '31663';
    const title = 'Valid Driver\'s Licence';
    const approveButton = `button[data-action="/app/admin/accept_proposed_changes/${userID}/drivers_license"]`;

    cy.loginToDashboard(adminEmail, adminPassword)
      .verifyTextExist('Users')

      .log('On the search bar enter the email and click the search button')
      .inputTextField('input[id="search-users-input"]', supportEmail3)
      .clickElement('input[id="submit"]')

      .log('On the profile click the Edit button')
      .verifyTextExist(supportEmail3)
      .clickElementOnText('a', 'Edit')
      .verifyTextExist('return to list')

      .get('body')
      .then(($body) => {
        if ($body.find(approveButton).length > 0) {
          cy
            .get(approveButton)
            .click({ force: true })
            .wait(2000);
        }
      })

      .clickLogoutOnTopMenu();

    cy
      .log(`login ${supportEmail3}`)
      .loginToDashboard(supportEmail3, defaultPassword)

      .log('On the left menu panel, click Edit Profile ')
      .clickElementOnText('span', 'Edit profile')

      .log('On the side nav, tap the Additional training')
      .clickElement('a[href="/profile-building/additional-training"]')
      .verifyTextExist('Select any additional training you’ve completed and upload your documents for verification.')

      .log('Uncheck all additional')
      .get('body')
      .then(($body) => {
        const n = $body.find('mat-checkbox.mat-checkbox-checked').length;

        if (n > 0) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < n; i++) {
            cy.get('mat-checkbox.mat-checkbox-checked h3')
              .eq(0)
              .click({ force: true })
              .wait(1000);
          }
        }
      })

      .log('On the UI, click the Drivers licence')
      .clickElementOnText('h3', title)

      .log('Upload the file')
      .get('input[accept="image/*,application/pdf"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist('a.delete')

      .log('Click the x button')
      .clickElement('a.delete')
      .verifyTextExist(' Delete File ')
      .verifyTextExist(' Are you sure you want to delete file? ')

      .log('Click the No button')
      .clickElementOnText('button', 'No')
      .wait(2000)

      .log('Click the x button and tap the Yes button')
      .clickElement('a.delete')
      .clickElementOnText('button', 'Yes')
      .wait(2000)
      .verifyTextNotExist('debit.pdf')

      .log('Reupload the file')
      .get('input[accept="image/*,application/pdf"]')
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist('a.delete')

      .log('Enter data on the issue date')
      .selectDropdown(
        'select',
        '1',
        0,
      )
      .selectDropdown(
        'select',
        'December',
        1,
      )
      .selectDropdown(
        'select',
        '2022',
        2,
      )

      .log('Click the submit for verification button')
      .clickElementOnText('button span', 'Submit for verification')
      .verifyTextExist('We’re verifying your additional training documents')
      .verifyTextExist('Verification can take up to 48 hours. If there’s a problem, we’ll contact you by email. Once complete, your additional training will display in your profile.');
  });
});
