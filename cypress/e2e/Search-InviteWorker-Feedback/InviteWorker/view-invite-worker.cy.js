// import faker from 'faker/locale/en_AU';
import * as data from '../../../fixtures/test-data.json';

describe('View Invite Worker', () => {
  const noInviteEmail = data.dashboardAccount.noInviteClientAccount.email;
  const noInvitePass = data.dashboardAccount.noInviteClientAccount.password;

  const hadInviteEmail = data.dashboardAccount.hcpClientAccount.email;
  const hadInvitePass = data.dashboardAccount.hcpClientAccount.password;

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T782. View "Invite new worker" page - Client with no invitation history', () => {
    cy.log('Login as client')
      .log('Check accessibility: Login page')

      .loginToDashboard(noInviteEmail, noInvitePass)
      .log('Check accessibility: Home page')

      .log('Go to the Invited workers')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )
      .verifyTextVisible('How is this info used?')
      .verifyElementContainsText('app-invite-carer .action button', 'Invite')
      .verifyElementContainsText('app-invite-carer .action button', 'Cancel')
      .verifyElementExist(data.inviteWorker.backBtn)
      .log('Check accessibility: Invited worker form');
  });

  it('ES-T785. View Invited Workers page - Client with Invitation History', () => {
    cy.log('Login as client')
      .loginToDashboard(hadInviteEmail, hadInvitePass)

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')
      .log('Check accessibility: Invite worker page')
      // .injectAxe()
      // .checkA11y(null, null, null, true)

      .log('Check the Invite Worker page')
      .verifyElementContainsText(
        data.inviteWorker.inviteBtn,
        'Invite new worker',
      )

      .log('Check Invite worker having "Sent" status is visible')
      .verifyElementContainsText(data.inviteWorker.statusInvite, 'Sent')

      .log('Check Invite worker having "declined" status is visible')
      .verifyElementContainsText(data.inviteWorker.statusInvite, 'Declined')

      .log('Check Invite worker having "accepted" status is visible')
      .verifyElementContainsText(data.inviteWorker.statusInvite, 'Accepted')

      .log('Click the name with accepted status')
      .get(data.inviteWorker.statusInvite)
      .contains('Accepted')
      .parents('tr')
      .find('td>span')
      .click()
      .verifyTextVisible('Support Worker');
  });

  it('ES-T790. View Invite new worker page - Client with invitation history', () => {
    cy.log('Login as client')
      .loginToDashboard(hadInviteEmail, hadInvitePass)

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click Invite new worker')
      .clickElementOnText(data.inviteWorker.inviteBtn, 'Invite new worker')

      .log('Check Invite new worker page')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )
      .verifyTextVisible('How is this info used?')
      .verifyElementContainsText('app-invite-carer .action button', 'Invite')
      .verifyElementContainsText('app-invite-carer .action button', 'Cancel')
      .verifyElementExist(data.inviteWorker.backBtn);
  });

  // Accessibility testing:
  // 1. "How is this info used?" popup
  it('ES-T799. Check "How is this info used" functionality', () => {
    cy.log('Login as client')
      .loginToDashboard(hadInviteEmail, hadInvitePass)

      .log('Go to the Invite workers')
      .navigateByLeftMenuInDashboard('Invite workers')
      .log('Verify that user is navigated to "Invite new worker" page')
      .verifyCurrentURL('invite')

      .log('Click Invite new worker')
      .clickElementOnText(data.inviteWorker.inviteBtn, 'Invite new worker')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      )

      .log('Click "How is this info used?"')
      .clickElementOnText(data.inviteWorker.infoLink, 'How is this info used?')

      .log('Check accessibility: "How is this info used?" popup')
      // .injectAxe()
      // .checkA11y('.mat-dialog-container', null, null, true)

      .log('Click Ok button on the popup')
      .clickElementOnText('mat-dialog-container button', 'Ok')
      .verifyTextVisible(
        'Enter the details of someone you’d like to invite to your team',
      );
  });
});
