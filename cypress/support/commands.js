// // ***********************************************
// // This example commands.js shows you how to
// // create various custom commands and overwrite
// // existing commands.
// //
// // For more comprehensive examples of custom
// // commands please read more here:
// // https://on.cypress.io/custom-commands
// // ***********************************************
// //
// //
// // -- This is a parent command --
// // Cypress.Commands.add("login", (email, password) => { ... })
// //
// //
// // -- This is a child command --
// // Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
// //
// //
// // -- This is a dual command --
// // Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
// //
// //
// // -- This will overwrite an existing command --
// // Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// // Cypress.LocalStorage.clear = function(keys, ls, rs) {
// //     // eslint-disable-next-line no-useless-return
// //     return;
// // };

Cypress.Commands.add('forceVisit', (url) => {
  cy.get('body').then((body$) => {
    const appWindow = body$[0].ownerDocument.defaultView;
    const appIframe = appWindow.parent.document.querySelector('iframe');
    return new Promise((resolve) => {
      appIframe.onload = () => resolve();
      appWindow.location = url;
    });
  });
});

// import 'cypress-localstorage-commands';

// const Auth = require('aws-amplify').Auth;

// const username = 'staginguser';
// const password = 'ao&FvBv8pxpskWorRdgmBLnm';
// const userPoolId = 'ap-southeast-2_6ikULBtzl';
// const clientId = '5iiu9maj2g15shg9cde35pbumd';

// const awsconfig = {
//   aws_user_pools_id: userPoolId,
//   aws_user_pools_web_client_id: clientId,
// };

// Auth.configure(awsconfig);

// Cypress.Commands.add('signInAWS', () => {
//   cy.then(() => Auth.signIn(username, password)).then((cognitoUser) => {
//     const idToken = cognitoUser.signInUserSession.idToken.jwtToken;
//     const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;

//     const makeKey = (name) =>
//       `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.${cognitoUser.username}.${name}`;

//     cy.setLocalStorage(makeKey('accessToken'), accessToken);
//     cy.setLocalStorage(makeKey('idToken'), idToken);
//     cy.setLocalStorage(
//       `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
//       cognitoUser.username,
//     );
//   });
//   cy.saveLocalStorage();
// });
