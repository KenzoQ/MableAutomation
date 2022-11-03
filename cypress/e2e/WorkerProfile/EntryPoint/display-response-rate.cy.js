import * as data from '../../../fixtures/test-data.json';

// outdated
describe('Display response rate', () => {
  beforeEach(() => {
    cy
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T1411. Check that the Worker response rate is 100%', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.craig.keeling.responserate+sw@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click User icon')
      .clickElement(data.workerProfileLocators.userIcon)

      .log('Check screen')
      .verifyTextVisible('Craig K')
      .verifyElementVisible(data.workerProfileLocators.starRating)
      .verifyElementVisible(data.workerProfileLocators.feedBack)
      .verifyElementVisible(data.workerProfileLocators.careType)

      .log('Check great response badge')
      .verifyElementContainsText(
        data.workerProfileLocators.responseRate,
        data.workerProfileContent.veryResponsive,
      )

      .log('Check response speed')
      .verifyTextVisible(data.workerProfileContent.reply24Hours)

      .log('Check edit profile')
      .verifyElementContainsText(
        data.workerProfileLocators.editProfile,
        'Edit Profile',
      )

      .log('Click Information icon')
      .clickElement(data.workerProfileLocators.inforIcon)

      .log('Verify screen')
      .verifyElementVisible(data.workerProfileLocators.inforPopup.container)
      .verifyTextVisible(data.workerProfileContent.inforPopup.title)

      .log('Check worker response rate')
      .verifyTextVisible(data.workerProfileContent.responseRate100)

      .log('Click Ok btn')
      .clickElementOnText(
        data.workerProfileLocators.inforPopup.button,
        data.workerProfileContent.inforPopup.okBtn,
      );
  });

  it('ES-T2544. Check that the Worker response rate is 80%', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.moises.mraz.responserate+sw@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click User icon')
      .clickElement(data.workerProfileLocators.userIcon)

      .log('Check screen')
      .verifyTextVisible('Moises M')
      .verifyElementVisible(data.workerProfileLocators.careType)
      .verifyElementVisible(data.workerProfileLocators.deliveredHours)

      .log('Check great responder badge')
      .verifyElementContainsText(
        data.workerProfileLocators.responseRate,
        data.workerProfileContent.veryResponsive,
      )

      .log('Check response speed')
      .verifyTextVisible(data.workerProfileContent.reply24Hours)

      .log('Check edit profile')
      .verifyElementContainsText(
        data.workerProfileLocators.editProfile,
        'Edit Profile',
      )

      .log('Click Information icon')
      .clickElement(data.workerProfileLocators.inforIcon)

      .log('Verify screen')
      .verifyElementVisible(data.workerProfileLocators.inforPopup.container)
      .verifyTextVisible(data.workerProfileContent.inforPopup.title)

      .log('Check worker response rate')
      .verifyTextVisible(data.workerProfileContent.responseRate80)

      .log('Click Ok btn')
      .clickElementOnText(
        data.workerProfileLocators.inforPopup.button,
        data.workerProfileContent.inforPopup.okBtn,
      );
  });

  it('ES-T1418. Check that the worker response rate is 66%', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.ute.dickinson.responserate+sw@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click User icon')
      .clickElement(data.workerProfileLocators.userIcon)

      .log('Check screen')
      .verifyTextVisible('Ute D')
      .verifyElementVisible(data.workerProfileLocators.careType)
      .verifyElementVisible(data.workerProfileLocators.deliveredHours)

      .log('Check great responder badge')
      .verifyElementContainsText(
        data.workerProfileLocators.responseRate,
        data.workerProfileContent.getResponsive,
      )

      .log('Check response speed')
      .verifyTextVisible(data.workerProfileContent.reply24Hours)

      .log('Check edit profile')
      .verifyElementContainsText(
        data.workerProfileLocators.editProfile,
        'Edit Profile',
      )

      .log('Click Information icon')
      .clickElement(data.workerProfileLocators.inforIcon)

      .log('Verify screen')
      .verifyElementVisible(data.workerProfileLocators.inforPopup.container)
      .verifyTextVisible(data.workerProfileContent.inforPopup.title)

      .log('Check worker response rate')
      .verifyTextVisible(data.workerProfileContent.responseRateLeast80)
      .verifyTextVisible('Your response rate is 66%')

      .log('Click Ok btn')
      .clickElementOnText(
        data.workerProfileLocators.inforPopup.button,
        data.workerProfileContent.inforPopup.okBtn,
      );
  });

  it('ES-T1412. Check that the Worker response rate is 50%', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.wilford.lynch.responserate+sw@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click User icon')
      .clickElement(data.workerProfileLocators.userIcon)

      .log('Check screen')
      .verifyTextVisible('Wilford L')
      .verifyElementVisible(data.workerProfileLocators.careType)
      .verifyElementVisible(data.workerProfileLocators.deliveredHours)

      .log('Check response badge')
      .verifyElementContainsText(
        data.workerProfileLocators.responseRate,
        data.workerProfileContent.getResponsive,
      )

      .log('Check response speed')
      .verifyTextVisible(data.workerProfileContent.reply24Hours)

      .log('Check edit profile')
      .verifyElementContainsText(
        data.workerProfileLocators.editProfile,
        'Edit Profile',
      )

      .log('Click Information icon')
      .clickElement(data.workerProfileLocators.inforIcon)

      .log('Verify screen')
      .verifyElementVisible(data.workerProfileLocators.inforPopup.container)
      .verifyTextVisible(data.workerProfileContent.inforPopup.title)

      .log('Check worker response rate')
      .verifyTextVisible(data.workerProfileContent.responseRateLeast80)
      .verifyTextVisible('Your response rate is 50%')

      .log('Click Ok btn')
      .clickElementOnText(
        data.workerProfileLocators.inforPopup.button,
        data.workerProfileContent.inforPopup.okBtn,
      );
  });

  it('ES-T1417. Check that the worker response rate is 33%', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.jewell.marks.responserate+sw@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click User icon')
      .clickElement(data.workerProfileLocators.userIcon)

      .log('Check screen')
      .verifyTextVisible('Jewell M')
      .verifyElementVisible(data.workerProfileLocators.careType)

      .log('Check response rate badge')
      .verifyElementContainsText(
        data.workerProfileLocators.responseRate,
        data.workerProfileContent.getResponsive,
      )

      .log('Check response speed')
      .verifyTextVisible(data.workerProfileContent.reply24Hours)

      .log('Check edit profile')
      .verifyElementContainsText(
        data.workerProfileLocators.editProfile,
        'Edit Profile',
      )

      .clickElement(data.workerProfileLocators.inforIcon)

      .log('Verify screen')
      .verifyElementVisible(data.workerProfileLocators.inforPopup.container)
      .verifyTextVisible(data.workerProfileContent.inforPopup.title)

      .log('Check worker response rate')
      .verifyTextVisible(data.workerProfileContent.responseRateLeast80)
      .verifyTextVisible('Your response rate is 33%')

      .log('Click Ok btn')
      .clickElementOnText(
        data.workerProfileLocators.inforPopup.button,
        data.workerProfileContent.inforPopup.okBtn,
      );
  });

  it('ES-T1419. Check that the Worker response rate is 25%', () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.scot.little.responserate+sw@donotuse.com.au ',
        'qaAutomation2021',
      )

      .log('Click User icon')
      .clickElement(data.workerProfileLocators.userIcon)

      .log('Check screen')
      .verifyTextVisible('Scot L')
      .verifyElementVisible(data.workerProfileLocators.careType)
      .verifyElementVisible(data.workerProfileLocators.deliveredHours)

      .log('Check response badge')
      .verifyElementContainsText(
        data.workerProfileLocators.responseRate,
        data.workerProfileContent.getResponsive,
      )

      .log('Check response speed')
      .verifyTextVisible(data.workerProfileContent.reply24Hours)

      .log('Click Information icon')
      .clickElement(data.workerProfileLocators.inforIcon)

      .log('Verify screen')
      .verifyElementVisible(data.workerProfileLocators.inforPopup.container)
      .verifyTextVisible(data.workerProfileContent.inforPopup.title)

      .log('Check worker response rate')
      .verifyTextVisible(data.workerProfileContent.responseRateLeast80)
      .verifyTextVisible('Your response rate is 25%')

      .log('Click Ok btn')
      .clickElementOnText(
        data.workerProfileLocators.inforPopup.button,
        data.workerProfileContent.inforPopup.okBtn,
      );
  });

  it("ES-T2859. Display of response speed on empty state profile (worker's view)", () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.leilani.cronin.responserate+sw@donotuse.com.au',
        'qaAutomation2021',
      )

      .log('Click User icon')
      .clickElement(data.workerProfileLocators.userIcon)

      .log('Check screen')
      .verifyTextVisible('Leilani C')
      .verifyElementVisible(data.workerProfileLocators.careType)

      .log('Check statement')
      .verifyTextVisible('Respond to clients when they send you a direct message or a private job to get your response status')

      .log('Check no response rate badge')
      .verifyTextNotExist(
        data.workerProfileContent.veryResponsive,
      )
      .verifyTextNotExist(
        data.workerProfileContent.getResponsive,
      )

      .log('Check no response speed')
      .verifyElementNotExist(
        data.workerProfileLocators.responseSpeed,
      );
  });

  it("ES-T2573. Display of response speed on profile - Not very responsive (client's view in Invited workers page)", () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.bonoy.gonzaga.responserate+client@donotuse.com.au ',
        'qaAutomation2021',
      )

      .log('Navigate to invite workers page')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Check Invite worker')
      .verifyTextVisible('Invited workers')
      .verifyTextVisible('Workers you have invited')

      .log('Click Jewell Marks')
      .clickElementOnText(
        'a',
        'Jewell Marks',
      )

      .log('Check screen object')
      .verifyTextVisible('Jewell M')
      .verifyElementVisible(data.workerProfileLocators.careType)

      .log('Check no response rate badge')
      .verifyTextNotExist(
        data.workerProfileContent.veryResponsive,
      )
      .verifyTextNotExist(
        data.workerProfileContent.getResponsive,
      )

      .log('Check response speed')
      .verifyTextVisible(data.workerProfileContent.reply24Hours);
  });

  it("ES-T2803. Display of response speed on empty state profile (client's view)", () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.bonoy.gonzaga.responserate+client@donotuse.com.au ',
        'qaAutomation2021',
      )

      .log('Navigate to invite workers page')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Check Invite worker')
      .verifyTextVisible('Invited workers')
      .verifyTextVisible('Workers you have invited')

      .log('Click Leilani Cronin')
      .clickElementOnText(
        'a',
        'Leilani Cronin',
      )

      .log('Check screen object')
      .verifyTextVisible('Leilani C')
      .verifyElementVisible(data.workerProfileLocators.careType)

      .log('Check no response rate badge')
      .verifyTextNotExist(
        data.workerProfileContent.veryResponsive,
      )
      .verifyTextNotExist(
        data.workerProfileContent.getResponsive,
      )

      .log('Check no response speed')
      .verifyTextNotExist(data.workerProfileContent.reply24Hours);
  });

  it("ES-T2566. Display of response rate & response speed on profile - Very responsive (client's view in Invited workers page)", () => {
    cy
      .log('Login as worker')
      .loginToDashboard(
        'automation.bonoy.gonzaga.responserate+client@donotuse.com.au ',
        'qaAutomation2021',
      )

      .log('Navigate to invite workers page')
      .navigateByLeftMenuInDashboard('Invite workers')

      .log('Check Invite worker')
      .verifyTextVisible('Invited workers')
      .verifyTextVisible('Workers you have invited')

      .log('Click Craig Keeling')
      .clickElementOnText(
        'a',
        'Craig Keeling',
      )

      .log('Check screen object')
      .verifyTextVisible('Craig K')
      .verifyElementVisible(data.workerProfileLocators.careType)

      .log('Check great response badge')
      .verifyElementContainsText(
        data.workerProfileLocators.responseRate,
        data.workerProfileContent.veryResponsive,
      )

      .log('Check response speed')
      .verifyTextVisible(data.workerProfileContent.reply24Hours)

      .log('Click Information icon')
      .clickElement(data.workerProfileLocators.inforIcon)

      .log('Check new popup')
      .verifyElementContainsText(
        'app-consumer-response-rate-dialog h1',
        'Very responsive',
      )

      .log('Click Ok btn')
      .clickElementOnText(
        data.workerProfileLocators.inforPopup.button,
        data.workerProfileContent.inforPopup.okBtn,
      );
  });
});
