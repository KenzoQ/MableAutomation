import * as data from '../../../fixtures/test-data.json';

describe('Client Onboarding', () => {
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T2067. Check new NAV opt on the left tile of the Dashboard UI', () => {
    const clientEmail = 'automation_zendee.planmanagedclient+@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Verify all sections in the left NAV')
      .verifyTextVisible('Dashboard')
      .verifyTextVisible('Search workers')
      .verifyTextVisible('Jobs')
      .verifyTextVisible('Support hours')
      .verifyTextVisible('Inbox')
      .verifyTextVisible('My support workers')
      .verifyTextVisible('Invite workers')
      .verifyTextVisible('Shortlist')
      .verifyTextVisible('Billing')
      .verifyTextVisible('Notes');
  });

  it('ES-T2068. View Client profile from dashboard UI', () => {
    const clientEmail = 'automation_ashton+clientprofile@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click the "Complete your profile"')
      .clickElementOnText(
        'h4',
        'Complete your account verification',
      )

      .log('Verify the Client Profile UI')
      .verifyCurrentURL('personal-details')
      .verifyTextVisible('Ashton’s personal details')
      .verifyTextVisible('The person receiving support.')
      .verifyTextVisible('What personal info is shared');
  });

  it('ES-T2070. View Client profile from “Account” button', () => {
    const clientEmail = 'automation_mike.responsivedesign+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Verify the Client Profile UI')
      .verifyCurrentURL('personal-details')
      .verifyTextVisible('Mike’s personal details')
      .verifyTextVisible('The person receiving support.')
      .verifyTextVisible('What personal info is shared');
  });

  it('ES-T2073. Check the reminder text that will appear in newly completed Profile with pending verification', () => {
    const clientEmail = 'automation_dylan.pendingverification+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Verify the Client Profile UI')
      .verifyCurrentURL('personal-details')

      .log('Check Pending verification')
      .verifyTextVisible('Pending verification')

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Personal details',
      )
      .verifyTextVisible('Dylan’s personal details')
      .verifyTextVisible('The person receiving support.')

      .log('Go to the My contacts')
      .clickElementOnText(
        '.subMenu span',
        'My contacts',
      )
      .verifyTextVisible('My contacts')
      .verifyTextVisible('Add up to 4 contacts that support you as emergency contacts or authorised to receive information.')

      .log('Go to the Payment details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')
      .verifyTextVisible('Pending verification – your details are being verified.');
  });

  it('ES-T2069. View Client profile from the Avatar', () => {
    const clientEmail = 'automation_mike.responsivedesign+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Profile btn')
      .clickElement('#profileCardAvatar')

      .log('Verify the Client Profile UI')
      .verifyCurrentURL('personal-details')
      .verifyTextVisible('Mike’s personal details')
      .verifyTextVisible('The person receiving support.')
      .verifyTextVisible('What personal info is shared');
  });

  it('ES-T2076. Account verification: Pre-approval with an account holder- Check My contacts', () => {
    const clientEmail = 'automation_lisa+guardian@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Verify the Client Profile UI')
      .verifyCurrentURL('personal-details')

      .log('Go to the My Contacts')
      .clickElementOnText(
        '.subMenu span',
        'My contacts',
      )
      .verifyTextVisible('My contacts')
      .verifyTextVisible('Full name')
      .verifyTextVisible('Contact phone')
      .verifyTextVisible('Email (optional)')
      .verifyTextVisible('Add as an emergency contact')
      .verifyTextVisible('Authorised to receive information')

      .log('Check relationship field')
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Partner / Spouse',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Immediate Family',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Extended Family',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Legal Representative / Advocate',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Approved Provider / Care Coordinator',
      )
      .verifyElementContainsText(
        data.clientOnboarding.contact.relationshipOptions,
        'Friend / Neighbour',
      )

      .log('Enter the full name of the person receiving the support')
      .inputTextField(
        data.clientOnboarding.contact.name,
        'Jojo Sogoni',
      )
      .verifyTextVisible('Can’t be the person receiving support.')

      .log('Enter the full name')
      .inputTextField(
        data.clientOnboarding.contact.name,
        'test test',
      )

      .log('Input phone')
      .inputTextField(
        data.clientOnboarding.contact.phone,
        '0436458885',
      )

      .log('Input email')
      .inputTextField(
        data.clientOnboarding.contact.email,
        'test123@gmail.com',
      )

      .log('Toogle off on emergency checkbox')
      .get(data.clientOnboarding.contact.emergency)
      .invoke('attr', 'aria-checked')
      .then(value => {
        if (value) cy.clickElement(data.clientOnboarding.contact.emergency, true);
      })

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Save and continue',
      )
      .verifyTextVisible('You must have at least 1 emergency contact listed.')

      .log('Toggle on for emergency checkbox')
      .clickElement(data.clientOnboarding.contact.emergency, true)

      .log('Toggle  on/off on authorised information')
      .clickElement(data.clientOnboarding.contact.authorisedInformation, true)

      .log('Click Add another contact')
      .clickElementOnText(
        'button span',
        'Add another contact',
      )

      .log('Delete contact')
      .get(data.clientOnboarding.contact.deleteContact)
      .last()
      .click({ force: true })

      .log('Click Submit form')
      .clickElementOnText(
        'button span',
        'Save and continue',
      )
      .verifyTextVisible('Payment details');
  });

  it('ES-T2079. Check payment details: Government fund - NDIS - Self managed', () => {
    const clientEmail = 'automation_nico.ndis.selfmanaged+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Payment Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')
      .verifyTextVisible('Pending verification – your details are being verified.')

      .log('Click "Yes" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'No') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Yes',
          );
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'NDIS') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'NDIS',
          );
        }
      })

      .log('Click "Self managed" on What type of plan?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Self managed') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Self managed',
          );
        }
      })

      .log('Click close icon on the Full NDIS letter if exist')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.clientOnboarding.payment.ndis_letter_delete}`).length > 0) {
          cy
            .clickElement(data.clientOnboarding.payment.ndis_letter_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'No',
            )
            .wait(1000)

            .clickElement(data.clientOnboarding.payment.ndis_letter_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'Yes',
            )
            .wait(2000);
        }
      })

      .log('Upload the file')
      .get(data.clientOnboarding.payment.ndis_letter_input)
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist(data.clientOnboarding.payment.ndis_letter_delete)

      .log('Click close icon on evidence if exist')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.clientOnboarding.payment.evidence_delete}`).length > 0) {
          cy
            .clickElement(data.clientOnboarding.payment.evidence_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'No',
            )

            .clickElement(data.clientOnboarding.payment.evidence_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'Yes',
            )
            .wait(2000);
        }
      })

      .log('Upload the file')
      .get(data.clientOnboarding.payment.evidence_input)
      .attachFile('debit.pdf')
      .wait(2000)
      // .verifyElementExist(data.clientOnboarding.payment.evidence_delete)

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        'hfgd',
      )
      .verifyTextVisible('Provide a valid NDIS number')

      .log('Clear NDIS field')
      .clearTextField(data.clientOnboarding.payment.nidsNumber)
      .verifyTextVisible('Provide an NDIS number')

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        '122345667',
      )
      .verifyTextNotExist('Provide a valid NDIS number')

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .log("Input the field on Additional recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log("Clear Additional recipient's eamil address")
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )
      .verifyElementVisible(
        'h2',
        'Nice one!',
      )
      .verifyElementContainsText('h2 span', 'Account details sent for verification')
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Search workers',
      );
  });

  it('ES-T2079.2 Check payment details: Requested/Active Agreement', () => {
    const clientEmail = 'automation_theo.activeagreement.selfmanaged+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')
      .verifyTextVisible('Pending verification – your details are being verified.')

      .log('Click "Yes" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'No') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Yes',
          );
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'NDIS') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'NDIS',
          );
        }
      })

      .log('Click "Self managed" on What type of plan?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Self managed') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Self managed',
          );
        }
      })

      .log('Click close icon on the Full NDIS letter if exist')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.clientOnboarding.payment.ndis_letter_delete}`).length > 0) {
          cy
            .clickElement(data.clientOnboarding.payment.ndis_letter_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'No',
            )
            .wait(1000)

            .clickElement(data.clientOnboarding.payment.ndis_letter_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'Yes',
            )
            .wait(2000);
        }
      })

      .log('Upload the file')
      .get(data.clientOnboarding.payment.ndis_letter_input)
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementVisible(data.clientOnboarding.payment.ndis_letter_delete)

      .log('Click close icon on the full name and plan date if exist')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.clientOnboarding.payment.name_and_plan_delete}`).length > 0) {
          cy
            .clickElement(data.clientOnboarding.payment.name_and_plan_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'No',
            )
            .wait(1000)

            .clickElement(data.clientOnboarding.payment.name_and_plan_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'Yes',
            )
            .wait(2000);
        }
      })

      .log('Upload the file')
      .get(data.clientOnboarding.payment.name_and_plan_input)
      .attachFile('debit.pdf')
      .wait(2000)
      .verifyElementExist(data.clientOnboarding.payment.name_and_plan_delete)

      .log('Click close icon on evidence if exist')
      .wait(2000)
      .get('body')
      .then($body => {
        if ($body.find(`${data.clientOnboarding.payment.evidence_delete}`).length > 0) {
          cy
            .clickElement(data.clientOnboarding.payment.evidence_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'No',
            )
            .wait(1000)

            .clickElement(data.clientOnboarding.payment.evidence_delete, true)

            .log('Click yes on the delete popup')
            .clickElementOnText(
              'mat-dialog-container button',
              'Yes',
            )
            .wait(2000);
        }
      })

      .log('Upload the file')
      .get(data.clientOnboarding.payment.evidence_input)
      .attachFile('debit.pdf')
      .wait(2000)
      // .verifyElementExist(data.clientOnboarding.payment.evidence_delete)

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        'hfgd',
      )
      .verifyTextVisible('Provide a valid NDIS number')

      .log('Clear NDIS field')
      .clearTextField(data.clientOnboarding.payment.nidsNumber)
      .verifyTextVisible('Provide an NDIS number')

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        '122345667',
      )
      .verifyTextNotExist('Provide a valid NDIS number')

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .log("Input the field on Additional recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log("Clear Additional recipient's eamil address")
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )
      .verifyElementVisible(
        'h2',
        'Nice one!',
      )
      .verifyElementContainsText('h2 span', 'Account details sent for verification')
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Complete profile',
      );
  });

  it('ES-T2077. Check payment details: Government fund - NDIS - Plan managed', () => {
    const clientEmail = 'automation_zendee.planmanagedclient+@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')
      .verifyTextVisible('Pending verification – your details are being verified.')

      .log('Click "Yes" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'No') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Yes',
          );
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'NDIS') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'NDIS',
          );
        }
      })

      .log('Click "Plan managed" on What type of plan?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Self managed') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Plan managed',
          );
        }
      })

      .log('Click Cancel organisation btn')
      .clickElementOnText(
        data.clientOnboarding.payment.canOrganisationBtn,
        'Cancel',
      )

      .log('Enter your funding plan manager organisation')
      .inputTextField(
        data.clientOnboarding.payment.assignPartnerFundingOrganisationInput,
        'QA Homes',
      )
      .clickElement('.suggestions .listOption')

      .log('Enter your funding plan manager organisation with randon character')
      .inputTextField(
        data.clientOnboarding.payment.assignPartnerFundingOrganisationInput,
        'test tesst',
      )
      .verifyTextVisible('Organisation not found.')

      .log('Click Add an organisation btn')
      .clickElementOnText(
        data.clientOnboarding.payment.addOrganisationBtn,
        'Add an organisation',
      )

      .log('Input organisation name')
      .inputTextField(
        data.clientOnboarding.payment.organisationForm.name,
        'Automation team',
      )

      .log('Input organisation phone')
      .inputTextField(
        data.clientOnboarding.payment.organisationForm.phone,
        '0436458885',
      )

      .log('Input organisation email')
      .inputTextField(
        data.clientOnboarding.payment.organisationForm.email,
        'toan.test@gmail.com',
      )

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        'hfgd',
      )
      .verifyTextVisible('Provide a valid NDIS number')

      .log('Clear NDIS field')
      .clearTextField(data.clientOnboarding.payment.nidsNumber)
      .verifyTextVisible('Provide an NDIS number')

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        '122345667',
      )
      .verifyTextNotExist('Provide a valid NDIS number')

      .log('Input any character in Invoice reference')
      .inputTextField(
        data.clientOnboarding.payment.invoicesInput,
        '2355Ahfyf',
      )

      .log('Clear the value in Invoice reference')
      .clearTextField(data.clientOnboarding.payment.invoicesInput)

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .log("Input the field on Additional recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log('Clear the two emails inputted on the Recipient email 1 and 2')
      .clearTextField(data.clientOnboarding.payment.mainRecipientInput)
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )
      .verifyElementVisible(
        'h2',
        'Nice one!',
      )
      .verifyElementContainsText(
        'h2 span',
        'Account details sent for verification',
      )
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Search workers',
      );
  });

  it('ES-T2077.2 Check payment details: Government fund - NDIS - Plan managed', () => {
    const clientEmail = 'automation_wen.activeagreement.planmanaged+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')
      .verifyTextVisible('Pending verification – your details are being verified.')

      .log('Click "Yes" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'No') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Yes',
          );
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'NDIS') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'NDIS',
          );
        }
      })

      .log('Click "Plan managed" on What type of plan?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Self managed') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Plan managed',
          );
        }
      })

      .log('Enter your funding plan manager organisation')
      .inputTextField(
        data.clientOnboarding.payment.assignPartnerFundingOrganisationInput,
        'QA Homes',
      )
      .clickElement('.suggestions .listOption')

      .log('Enter your funding plan manager organisation with randon character')
      .inputTextField(
        data.clientOnboarding.payment.assignPartnerFundingOrganisationInput,
        'test tesst',
      )
      .verifyTextVisible('Organisation not found.')

      .log('Click Add an organisation btn')
      .clickElementOnText(
        data.clientOnboarding.payment.addOrganisationBtn,
        'Add an organisation',
      )

      .log('Input organisation name')
      .inputTextField(
        data.clientOnboarding.payment.organisationForm.name,
        'Automation team',
      )

      .log('Input organisation phone')
      .inputTextField(
        data.clientOnboarding.payment.organisationForm.phone,
        '0436458885',
      )

      .log('Input organisation email')
      .inputTextField(
        data.clientOnboarding.payment.organisationForm.email,
        'toan.test@gmail.com',
      )

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        'hfgd',
      )
      .verifyTextVisible('Provide a valid NDIS number')

      .log('Clear NDIS field')
      .clearTextField(data.clientOnboarding.payment.nidsNumber)
      .verifyTextVisible('Provide an NDIS number')

      .log('Input NDIS field')
      .inputTextField(
        data.clientOnboarding.payment.nidsNumber,
        '122345668',
      )
      .verifyTextNotExist('Provide a valid NDIS number')

      .log('Input any character in Invoice reference')
      .inputTextField(
        data.clientOnboarding.payment.invoicesInput,
        '2355Ahfyf',
      )

      .log('Clear the value in Invoice reference')
      .clearTextField(data.clientOnboarding.payment.invoicesInput)

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log('Clear the two emails inputted on the Recipient email 1 and 2')
      .clearTextField(data.clientOnboarding.payment.mainRecipientInput)
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )

      .verifyElementVisible(
        'h2',
        'Nice one!',
      )
      .verifyElementContainsText(
        'h2 span',
        'Account details sent for verification',
      )
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Complete profile',
      );
  });

  it('ES-T2075. Check payment details: Government fund - NDIS - NDIA managed', () => {
    const clientEmail = 'automation_shiela.NDIAmanaged+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')
      .verifyTextVisible('Pending verification – your details are being verified.')

      .log('Click "Yes" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'No') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Yes',
          );
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'NDIS') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'NDIS',
          );
        }
      })

      .log('Click "Self managed" on What type of plan?')
      .get(`.checked ${data.clientOnboarding.payment.funding_source_code}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Self managed') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'NDIA managed',
          );
        }
      })

      .log('Input any character in Invoice reference')
      .inputTextField(
        data.clientOnboarding.payment.invoicesInput,
        '2355Ahfyf',
      )

      .log('Clear the value in Invoice reference')
      .clearTextField(data.clientOnboarding.payment.invoicesInput)

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .log("Input the field on Additional recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log('Clear the two emails inputted on the Recipient email 1 and 2')
      .clearTextField(data.clientOnboarding.payment.mainRecipientInput)
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )
      .verifyElementVisible(
        'h2',
        'Contact us to proceed further',
      )
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Ok got it',
      );
  });

  it('ES-T2074. Check payment details: Government fund - Home Care Package', () => {
    const clientEmail = 'automation_ginsmith.homecarepackage+client@donotuse.com.au';
    const clientPass = 'qaAutomation2021';

    cy.log('Login')
      .loginToDashboard(
        clientEmail,
        clientPass,
      )

      .log('Click Account btn')
      .clickElementOnText(
        '.editProfile span',
        'Account',
      )

      .log('Go to the Personal Details')
      .clickElementOnText(
        '.subMenu span',
        'Payment details',
      )
      .verifyTextVisible('Payment details')
      .verifyTextVisible('Pending verification – your details are being verified.')

      .log('Click "Yes" on Are you using government funding to pay for this support?')
      .get(`.checked ${data.clientOnboarding.payment.has_govt_funding}`)
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text === 'No') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Yes',
          );
        }
      })

      .log('Click "NDIS" on What type of funding?')
      .get('.checked input[formcontrolname="funding_source_id"]')
      .parents('.checked')
      .find('span.radioLabel')
      .then($el => {
        if ($el.text !== 'Home Care Package') {
          cy.clickElementOnText(
            '.radioBtn span.radioLabel',
            'Home Care Package',
          );
        }
      })

      .log('Input Home Care Package Provider')
      .inputTextField(
        data.clientOnboarding.payment.homeCareInput,
        'QA Homes',
      )
      .clickElement('.suggestions .listOption')

      .log('Input any character in Invoice reference')
      .inputTextField(
        data.clientOnboarding.payment.invoicesInput,
        '2355Ahfyf',
      )

      .log('Clear the value in Invoice reference')
      .clearTextField(data.clientOnboarding.payment.invoicesInput)

      .log("Input the field on Main recipient's email addrees")
      .inputTextField(
        data.clientOnboarding.payment.mainRecipientInput,
        'toan.test@gmail.com',
      )

      .inputTextField(
        data.clientOnboarding.payment.additionalRecipient,
        'toan.test123@gmail.com',
      )

      .log('Clear the two emails inputted on the Recipient email 1 and 2')
      .clearTextField(data.clientOnboarding.payment.mainRecipientInput)
      .clearTextField(data.clientOnboarding.payment.additionalRecipient)

      .log('Click Submit btn')
      .clickElementOnText(
        'button span',
        'Submit',
      )

      .verifyElementVisible(
        'h2',
        'Nice one!',
      )
      .verifyElementContainsText('h2 span', 'Account details sent for verification')
      .verifyElementContainsText(
        'mat-dialog-actions button',
        'Search workers',
      );
  });
});
