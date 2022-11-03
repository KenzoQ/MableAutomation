describe('Update your service', () => {
  const workerEmail = 'automation_kevin.onboarding.accountdetails+worker@donotuse.com.au';
  const workerEmail2 = 'automation_kevin.onboarding.services+worker@donotuse.com.au';
  const workerPass = 'qaAutomation2021';

  const approvedEmail = 'automation_kevin.onboarding.services4+worker@donotuse.com.au';
  const approvedPass = 'qaAutomation2021';

  const expiredEmail = 'automation_kevin.onboarding.services2+worker@donotuse.com.au';
  const expiredPass = 'qaAutomation2021';

  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1657. Update "Services you offer"', () => {
    const indexCheckbox = Math.floor(Math.random() * (3 - 0));

    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .log('Update the selected offer')
      .verifyTextVisible('Services you offer')
      .verifyTextVisible('What services can you offer?')
      .log('Select uncheck all options')
      .uncheckOptions()

      .clickElement(
        '#servicesYouOffer mat-checkbox input',
        true,
        indexCheckbox,
      )

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Click Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Services you offer',
      )

      .verifyTextVisible('Services you offer')
      .verifyTextVisible('What services can you offer?')
      .verifyElementHasClass(
        '#servicesYouOffer mat-checkbox',
        'mat-checkbox-checked',
        indexCheckbox,
      );
  });

  it('ES-T1659. Update "Additional training" with selected training', () => {
    const indexCheckbox = 0;

    cy
      .log('Login as worker')
      .loginToDashboard(
        workerEmail2,
        workerPass,
      )

      .log('Click Resume account setup')
      .clickElementOnText(
        '#urgentCallToAction a',
        'Resume account setup',
      )

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Additional training',
      )

      .log('Select uncheck all options')
      .get('app-onboarding-services-checkbox-list mat-checkbox.mat-checkbox-checked label')
      .click({ multiple: true, force: true })

      .log('Select aditional training')
      .verifyTextVisible('Additional training (optional)')
      .clickElement(
        'app-onboarding-services-checkbox-list mat-checkbox h3',
        true,
        indexCheckbox,
      )

      .get('body')
      .then($body => {
        if ($body.find('a.delete').length > 0) {
          cy.get('a.delete')
            .click({ force: true })
            .clickElementOnText('button', 'Yes')
            .wait(2000);
        }
      })

      .selectDropdown(
        '.checkboxListContainer select',
        '1',
        0,
      )
      .selectDropdown(
        '.checkboxListContainer select',
        'January',
        1,
      )
      .selectDropdown(
        '.checkboxListContainer select',
        '2022',
        2,
      )

      .get('input[type="file"]')
      .attachFile('debit.pdf')
      .verifyTextVisible('File uploaded')
      .wait(2000)

      .log('Click Next btn')
      .clickElementOnText(
        '#stepsAction button',
        'Next',
      )

      .goToSetUpAccount()

      .log('Chick Services you offer')
      .clickElementOnText(
        '.menu li a',
        'Additional training',
      )

      .verifyElementHasClass(
        'app-onboarding-services-checkbox-list mat-checkbox',
        'mat-checkbox-checked',
        indexCheckbox,
      );
  });

  it('ES-T1694. Update nursing registration', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        approvedEmail,
        approvedPass,
      )

      .log('Check Dashobard UI')
      .verifyTextVisible('Immediate action required')
      .verifyTextVisible('Updates due')

      .log('Verify Nursing Registration section')
      .verifyTextVisible('Nursing Registration')
      .verifyElementContainsText(
        '.expiringDocument button',
        'Update',
      );
  });

  it('ES-T1692. Update allied health registration', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        expiredEmail,
        expiredPass,
      )

      .verifyTextVisible('Immediate action required')
      .verifyTextVisible('Allied Health Registration');
  });
});
