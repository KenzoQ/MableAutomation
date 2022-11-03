/* eslint-disable guard-for-in */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-syntax */
/* eslint-disable linebreak-style */
import faker from 'faker/locale/en_AU';
import { format } from 'date-fns';
import * as data from '../../fixtures/test-data.json';

Cypress.Commands.add('uploadFile', (selector, fixturePath, mimeType, filename) => {
  cy.get(selector).then((subject) => {
    cy.fixture(fixturePath, 'base64').then((base64String) => {
      Cypress.Blob.base64StringToBlob(base64String, mimeType).then((blob) => {
        const testfile = new File([blob], filename, { type: mimeType });
        const dataTransfer = new DataTransfer();
        const fileInput = subject[0];

        dataTransfer.items.add(testfile);
        // This triggers the @change event on the input.
        fileInput.files = dataTransfer.files;
        cy.wrap(subject).trigger('change', { force: true });
      });
    });
  });
});

Cypress.Commands.add('verifyCurrentURL', (value) => {
  cy
    .url()
    .should('contain', value);
});

Cypress.Commands.add('randomPastDay', () => {
  const dayFaker = faker.random.number({ min: 1, max: 28 });
  const day = `0 ${dayFaker}`.slice(-2);
  const monthFaker = faker.random.number({ min: 1, max: 11 });
  const month = `0 ${monthFaker}`.slice(-2);
  const year = '2019';

  return `${day}/${month}/${year}`;
});

Cypress.Commands.add('navigateByLeftMenuInDashboard', (item, admin = false) => {
  if (!admin) {
    cy.get('#mainMenuSection .itemList a.itemLink')
      .contains(item)
      .parents('a')
      .click({ force: true });
  } else {
    cy.get('li.main-navigation-list__item')
      .contains(item)
      .should('exist')
      .click({ force: true });
  }

  cy.wait(1000).checkAllPopups();
});

Cypress.Commands.add('clickElementByText', (item, type, isForce = true) => {
  if (type !== undefined) {
    cy.verifyElementExistNoWait(type);
    cy.get('body').find(type).contains(item).click({ force: isForce });
  } else {
    cy.get('body').contains(item).should('exist').click({ force: isForce });
  }
});

Cypress.Commands.add('selectDropdown', (fieldCss, value, position = 0) => {
  cy.get(fieldCss).eq(position).should('exist').select(value, { force: true });
});

Cypress.Commands.add('selectDropdownFirstItem', (fieldCss, value) => {
  cy.get(fieldCss).should('exist').select(value, { force: true });
});

Cypress.Commands.add('checkCheckbox', (fieldCss) => {
  cy.get(fieldCss).should('exist').check();
});

Cypress.Commands.add('checkRadio', (fieldCss) => {
  cy.get(fieldCss).should('exist').check({ force: true });
});

Cypress.Commands.add('verifyStatusOfCheckbox', (fieldCss, status, position) => {
  if (position !== undefined) {
    cy.get(fieldCss).eq(position)
      .should(status ? 'be.checked' : 'be.not.checked');
  } else {
    cy.get(fieldCss)
      .should(status ? 'be.checked' : 'be.not.checked');
  }
});

Cypress.Commands.add('clickCheckboxIfNotYetChecked', (fieldCss, position) => {
  if (position !== undefined) {
    cy.get(fieldCss).eq(position)
      .then(el => {
        const status = el.val();
        if (status !== 'on') cy.get(fieldCss).eq(position).click({ force: true });
      });
  } else {
    cy.get(fieldCss)
      .invoke('status')
      .then(el => {
        const status = el.val();
        if (status !== 'on') cy.get(fieldCss).eq(position).click({ force: true });
      });
  }
});

Cypress.Commands.add('inputTextFieldByPlaceholder', (placeholder, text) => {
  cy.get(`input[placeholder="${placeholder}"]`)
    .should('exist')
    .clear()
    .type(text);
});

Cypress.Commands.add('clickElement', (css, isForce = false, position = 0) => {
  if (position !== undefined) {
    cy.get(css).eq(position).should('exist');
    cy.get(css).eq(position).click({ force: isForce });
  } else {
    cy.get(css).first().should('exist');
    cy.get(css).first().click({ force: isForce });
  }
});

Cypress.Commands.add('clickLastElement', (css, isForce = false) => {
  cy.get(css).last().trigger('mouseover');
  cy
    .get(css).last().should('exist')
    .click({ force: isForce });
});

Cypress.Commands.add('clickElementByIndex', (css, isForce = false, position) => {
  if (position !== undefined) {
    cy.get(css).eq(position).should('exist').click({ force: isForce });
  } else {
    cy.get(css).first().should('exist').click({ force: isForce });
  }
});

Cypress.Commands.add('inputTextField', (fieldCss, text, isForce = false) => {
  cy.get(fieldCss).should('exist');
  cy.wait(500).get(fieldCss).clear({ force: isForce }).type(text, { force: isForce });
});

Cypress.Commands.add('clearTextField', (fieldCss, isForce = false) => {
  cy.get(fieldCss).should('be.visible').clear({ force: isForce });
});

Cypress.Commands.add('clearTextFieldAtPosition', (fieldCss, position, isForce = false) => {
  cy.get(fieldCss).eq(position).should('be.visible').clear({ force: isForce });
});

Cypress.Commands.add(
  'inputTextFieldAtPosition',
  (fieldCss, text, position = undefined) => {
    if (position !== undefined) {
      cy.get(fieldCss).eq(position).should('exist').clear()
        .type(text);
    } else {
      cy.get(fieldCss).should('exist').clear().type(text);
    }
  },
);

Cypress.Commands.add('inputTextFieldAndRemoveReadonly', (fieldCss, text) => {
  cy.get(fieldCss).should('exist').clear().type(text);
});

Cypress.Commands.add('inputTextByLabel', (label, text) => {
  cy.get('label').contains(label).parent().find('input')
    .type(text);
});

Cypress.Commands.add('selectOptionByValue', (option, value, isForce = true) => {
  cy.get(option).parent().find('span').contains(value)
    .click({ force: isForce });
});

Cypress.Commands.add('selectOptionByValueV2', (selector, value) => {
  cy.get(selector)
    .select(value);
});

Cypress.Commands.add('clickSubmitButton', () => {
  cy.get('[type="submit"]').should('exist').click();
});

Cypress.Commands.add('clickClosePopup', () => {
  cy.get('.icon-close').should('exist').click();
});

Cypress.Commands.add('goToHomePage', () => {
  cy.fixture('test-data').then((testData) => {
    cy.visit(testData.url);
  });
});

Cypress.Commands.add(
  'verifyElementContainsText',
  (selector, text, position) => {
    if (position !== undefined) {
      cy.get(selector).eq(position).contains(text).should('exist');
    } else {
      cy.get(selector).contains(text).should('exist');
    }
  },
);

Cypress.Commands.add(
  'verifyElementHaveText',
  (selector, text, position) => {
    if (position !== undefined) {
      cy.get(selector).eq(position).should('have.text', text);
    } else {
      cy.get(selector).should('have.text', text);
    }
  },
);

Cypress.Commands.add(
  'verifyElementNotContainsText',
  (selector, text, position) => {
    if (position !== undefined) {
      cy.get(selector).eq(position).contains(text).should('not.exist');
    } else {
      cy.get(selector).contains(text).should('not.exist');
    }
  },
);

Cypress.Commands.add('logOut', () => {
  cy.get('body').contains('Logout').click({ force: true });
});

Cypress.Commands.add('verifyElementHasClass', (locator, name, position = null) => {
  if (position === null) {
    cy.get(locator).should('have.class', name);
  } else {
    cy.get(locator).eq(position).should('have.class', name);
  }
});

Cypress.Commands.add('verifyTextExist', (text) => {
  cy.get('body').contains(text).should('exist');
});

Cypress.Commands.add('verifyTextExistNoWait', (text, isMatchCase = false) => {
  cy.get('body').contains(text, { matchCase: isMatchCase }).should('exist');
});

Cypress.Commands.add('verifyListTextExistNoWait', (list, isMatchCase = false) => {
  for (const text of list) {
    cy.get('body').contains(text, { matchCase: isMatchCase }).should('exist');
  }
});

Cypress.Commands.add('verifyListTextVisibleNoWait', (list, isMatchCase = false) => {
  for (const text of list) {
    cy.get('body').contains(text, { matchCase: isMatchCase }).should('be.visible');
  }
});

Cypress.Commands.add('verifyTextVisibleNoWait', (text) => {
  cy.get('body').contains(text).should('be.visible');
});

Cypress.Commands.add('verifyTextVisible', (text) => {
  cy
    .get('body').contains(text).should('be.visible');
});

Cypress.Commands.add('verifyElementExist', (element, timeOut = 500) => {
  cy.wait(timeOut);
  cy.get(element).should('exist');
});

Cypress.Commands.add('verifyElementExistNoWait', (element) => {
  cy.get(element).should('exist');
});

Cypress.Commands.add('verifyElementVisible', (element) => {
  cy.get(element).should('be.visible');
});

Cypress.Commands.add('verifyElementNotExist', (element) => {
  cy.get(element).should('not.exist');
});

Cypress.Commands.add('verifyElementNotVisible', (element) => {
  cy.get(element).should('not.be.visible');
});

Cypress.Commands.add('clickOnText', (text) => {
  cy.get('body').contains(text).should('exist').click();
});

Cypress.Commands.add('clickElementOnText', (fieldCss, text, timeOut = 500, isForce = true) => {
  cy.wait(timeOut)
    .get(fieldCss).contains(text).should('exist')
    .click({ force: isForce })
    .wait(timeOut);
});

Cypress.Commands.add('clickElementOnTextWithPosition', (fieldCss, text, position = null, timeOut = 0) => {
  cy.wait(timeOut);
  cy.get(fieldCss).contains(text).eq(position).should('exist')
    .click({ force: true });
});

Cypress.Commands.add('clickElementOnTextNoWaitNoPosition', (fieldCss, text, isForce = false) => {
  cy.get(fieldCss).contains(text, { matchCase: false }).should('exist')
    .click({ force: isForce });
});

Cypress.Commands.add('clickElementOnTextNoWait', (fieldCss, text, isForce = false, position = null) => {
  if (position === null) {
    cy.get(fieldCss).contains(text, { matchCase: false }).trigger('mouseover');
    cy.get(fieldCss).contains(text, { matchCase: false }).should('exist')
      .click({ force: isForce });
  } else {
    cy.get(fieldCss).eq(position).contains(text, { matchCase: false }).trigger('mouseover');
    cy.get(fieldCss).eq(position).contains(text, { matchCase: false }).should('exist')
      .click({ force: isForce });
  }
});

Cypress.Commands.add('verifyTextNotExist', (text) => {
  cy.get('body').contains(text).should('not.exist');
});

Cypress.Commands.add('verifyTextNotVisible', (text) => {
  cy.get('body').contains(text).should('not.be.visible');
});

Cypress.Commands.add('verifyTextNotVisibleNoWait', (text) => {
  cy.get('body').contains(text).should('not.be.visible');
});

Cypress.Commands.add('isElementExisting', (selector) => {
  cy.get('body').then(($body) => !!$body.find(selector).length);
});

Cypress.Commands.add('verifyLoginSuccessfully', () => {
  cy.get('body').contains('Logout').should('exist');
});

Cypress.Commands.add('byPassAuthen', (
  user = data.username,
  pass = data.password,
) => {
  cy
    .get('body').then(($body) => {
      if (!!$body.find('form[name="cognitoSignInForm"]').length) {
        cy.log('Login Authencation')
          .inputTextField('.visible-xs input#signInFormUsername', user, true)
          .inputTextField('.visible-xs input#signInFormPassword', pass, true)
          .log('Click Sign in')
          .clickElement('.visible-xs input[name="signInSubmitButton"]', true)
          .log('Visit homepage')
          .forceVisit(data.url);
      }
    });
});

Cypress.Commands.add('getText', (selector, position = 0) => {
  cy
    .get(selector)
    .eq(position)
    .invoke('text')
    .then((text) => text);
});

Cypress.Commands.add('getTextByIndex', (selector, index = 0) => {
  cy
    .get(selector)
    .eq(index)
    .invoke('text')
    .then((text) => text);
});

Cypress.Commands.add('verifyCurrentyPageIsAtPagination', (text) => {
  cy.get('.pagination').find('.current').contains(text).should('exist');
});

Cypress.Commands.add('clickNextAtPagination', () => {
  cy.get('.pagination').eq(0).find('.next_page').click();
});

Cypress.Commands.add('verifyProfileContains', (text) => {
  cy.get('.user').contains(text).should('exist');
});

Cypress.Commands.add('verifyListOnlyContains', (text) => {
  cy.get('tbody tr').each(($each) => {
    cy.wrap($each).contains(text).should('exist');
  });
});

Cypress.Commands.add('getARandomDateBetweenPastDateAndNow', (pastDayFormat) => {
  const pastDay = Date.parse(pastDayFormat);
  const now = Date.now();
  const randomDate = Math.floor(Math.random() * (now - pastDay + 1) + pastDay);
  const d = new Date();
  d.setTime(randomDate);
  return format(d, 'dd/MM/yyyy');
});

Cypress.Commands.add('getToday', () => {
  const now = Date.now();
  return format(now, 'dd/MM/yyyy');
});

Cypress.Commands.add('closePopup', () => {
  cy.get('.popup-close').click();
});

Cypress.Commands.add('leaveEmptyField', (fieldCss, isForce = false) => {
  cy.get(fieldCss).should('be.visible').clear({ force: isForce });
});

Cypress.Commands.add('getValueOfInput', (fieldCss) => {
  cy
    .get(fieldCss)
    .invoke('val')
    .then((value) => value);
});

Cypress.Commands.add('getAttribute', (selector, type) => {
  cy
    .get(selector)
    .invoke(type)
    .then((text) => text);
});

Cypress.Commands.add('getAttributeAtPosition', (selector, type, position) => {
  cy
    .get(selector)
    .eq(position)
    .invoke(type)
    .then((text) => text);
});

Cypress.Commands.add('getPlaceholder', (selector) => {
  cy
    .get(selector)
    .invoke('attr', 'placeholder')
    .then((text) => text);
});

Cypress.Commands.add('checkAllPopups', () => {
  cy
    .wait(2000)
    .verifyTextExist('Help')
    .verifyTextExist('Call')
    .verifyTextExist('Logout')
    .verifyTextExist('Help centre')
    .waitAppLoaderNotVisible()
    .get('body')
    .then(($body) => {
      if ($body.find('.popup .content-section span.popup-title').length > 0) {
        cy.get('.popup .content-section span.popup-title')
          .invoke('text')
          .then((text) => {
            if (text === 'Weekly availability update') {
              cy.get('.popup-content input[type="submit"]')
                .should('exist')
                .click();
            }
          });
      }

      if ($body.find('mat-dialog-actions button:contains(Close)').length > 0) {
        cy.log('Click close btn')
          .clickElementOnText(
            'mat-dialog-actions button',
            'Close',
          );
      }

      if ($body.find('mat-dialog-container button:contains("Later")').length > 0) {
        cy.clickElementOnText('mat-dialog-container button', 'Later');
      }
    });
});

Cypress.Commands.add('verifyHrefExist', (href) => {
  cy
    .get('body')
    .invoke('attr', 'href')
    .should('be.have', href);
});

Cypress.Commands.add('verifyHrefExistObjList', (obj) => {
  const list = Object.values(obj);
  for (const item of list) {
    cy
      .log(`Verify Href: ${item}`)
      .get('body')
      .invoke('attr', 'href')
      .should('be.have', item);
  }
});

Cypress.Commands.add('verifyElementListVisible', (...elements) => {
  const args = [...elements];
  for (const element of args) {
    cy.get(element).should('be.visible');
  }
});

Cypress.Commands.add('verifyObjectListVisible', (obj) => {
  const args = Object.values(obj);
  for (const element of args) {
    cy.get(element).should('be.visible');
  }
});

Cypress.Commands.add('verifyTextObjectsVisible', (obj) => {
  const args = Object.values(obj);
  for (const items of args) {
    cy.get('body').contains(items).should('be.visible');
  }
});

Cypress.Commands.add('verifyElementContainsTextList', (element = 'body', ...text) => {
  const args = [...text];
  for (const item of text) {
    cy.get(element).contains(item).should('be.visible');
  }
});

Cypress.Commands.add('verifyElementContainsTextObjectList', (element = 'body', obj) => {
  const args = Object.values(obj);
  for (const item of args) {
    if (item !== null) {
      cy.get(element).contains(item).should('exist');
    }
  }
});

Cypress.Commands.add('verifyElementContainsTextNotExistObjectList', (element = 'body', obj) => {
  const args = Object.values(obj);
  for (const item of args) {
    if (item !== null) {
      cy.get(element).contains(item).should('not.exist');
    }
  }
});

Cypress.Commands.add('inputTextArrField', (fieldCss, textArr, isForce = false) => {
  for (const text of textArr) {
    cy.get(fieldCss).clear({ force: isForce }).type(text, { force: isForce });
  }
});

Cypress.Commands.add('verifyTextNotExistOrVisible', (locator, text) => {
  cy.get('body')
    .then($body => {
      if ($body.find(`${locator}:contains(${text})`).length > 0) {
        cy.verifyTextNotVisible(text);
      } else {
        cy.verifyTextNotExist(text);
      }
    });
});

Cypress.Commands.add('verifyElementContainsMultipleText', (element = 'body', ...text) => {
  const args = [...text];
  cy.get(element)
    .children()
    .should('contain', args[0])
    .and('contain', args[1]);
});

Cypress.Commands.add('verifyMultipleHreftList', (element = 'body', ...links) => {
  const args = [...links];
  for (const item of links) {
    cy.get(element)
      .find(`[href="${item}"]`)
      .should('be.visible');
  }
});

Cypress.Commands.add(
  'verifyElementContainsTextNotExist',
  (selector, text, position) => {
    if (position !== undefined) {
      cy.get(selector).eq(position).contains(text).should('not.exist');
    } else {
      cy.get(selector).contains(text).should('not.exist');
    }
  },
);

Cypress.Commands.add(
  'verifyUpdateDueStatDecNotExist',
  () => {
    cy.xpath(
      '//div[contains(@class,\'updateDue\')]//div[contains(.,\'Statutory declaration due\')]',
    ).should('not.exist');
  },
);

Cypress.Commands.add('verifyTextLinkHaveHref', (text, href) => {
  cy
    .xpath(`//a[contains(.,'${text}')]`)
    .should('have.attr', 'href').and('include', `${href}`);
});

Cypress.Commands.add('verifyAndUncheckCheckbox', (selector) => {
  cy
    .get('body')
    .then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector)
          .click({ force: true });
      }
    });
});

Cypress.Commands.add('verifyElementHaveLengthAleast', (selector, number) => {
  cy
    .get(selector)
    .its('length')
    .should('be.gte', number);
});

Cypress.Commands.add('verifyElementHaveClass', (selector, position = 0, className) => {
  cy
    .get(selector)
    .eq(position)
    .should('have.class', className);
});

Cypress.Commands.add('verifyElementHaveNoClass', (selector, position = 0, className) => {
  cy
    .get(selector)
    .eq(position)
    .should('not.have.class', className);
});

Cypress.Commands.add('hoverElement', (selector, pos = 0) => {
  cy.get(selector)
    .eq(pos)
    .trigger('mouseover');
});

Cypress.Commands.add('checkButtonWithTextContainsLink', (buttonSelector, text, link) => {
  cy
    .get(buttonSelector)
    .contains(text, { matchCase: false })
    .parents('a[href]')
    .invoke('attr', 'href')
    .should('contain', link);
});

Cypress.Commands.add('verifyListTextExistNoWaitV2', (arrOrObject, isMatchCase = false) => {
  // the first argument can be object, list of objects, list of strings

  // for the first argument is object
  if (typeof arrOrObject === 'object') {
    for (const key in arrOrObject) {
      cy.get('body').contains(arrOrObject[key], { matchCase: isMatchCase }).should('exist');
    }

    return;
  }

  const list = [...arrOrObject];
  // for the first argument is list of strings
  if (typeof list[0] === 'string') {
    for (const string of list) {
      cy.get('body').contains(string, { matchCase: isMatchCase }).should('exist');
    }

    return;
  }

  // for the first argument is list of objects
  for (const item of list) {
    for (const key in item) {
      cy.get('body').contains(item[key], { matchCase: isMatchCase }).should('exist');
    }
  }
});

Cypress.Commands.add('checkATagWithTextContainsLink', (text, link) => {
  cy
    .get('a')
    .contains(text)
    .invoke('attr', 'href')
    .should('contain', link);
});

Cypress.Commands.add('checkLogout', () => {
  cy
    .wait(2000)
    .get('body')
    .then($body => {
      if ($body.find('mat-dialog-container').length > 0) {
        cy.clickElementOnText('mat-dialog-container button', 'Close');
      }
      if ($body.find('.mable-application [href="/users/sign_out"]').length > 0) {
        cy.get('.mable-application [href="/users/sign_out"]').first().click({ force: true });
      }
    })

    .get('body')
    .then(($body) => {
      if ($body.find('.headerItemsContainer button').length > 0) {
        cy.logOut()
          .wait(1000);
      }
    });
});

Cypress.Commands.add('loginToDashboard', (email, password) => {
  cy.log('Remove the current session')
    .checkLogout()

    .log('Check login page')
    .verifyCurrentURL('/login')
    .verifyElementVisible('app-login')
    .verifyElementContainsText(
      'app-login h1',
      'Login',
    )
    .verifyElementContainsText(
      'app-login h2',
      'Login to manage your Mable account.',
    )
    .verifyElementVisible('#loginForm')

    .log('Input email')
    .inputTextField(
      "input[type='email']",
      email,
    )

    .log('Input password')
    .inputTextField(
      "input[type='password']",
      password,
    )

    .log('Submit login')
    .clickElement('#loginBtn')

    .checkAllPopups();
});
