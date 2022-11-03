import * as data from '../../../fixtures/test-data.json';

describe('Post a Last Minute Job - part 2', () => {
  const clientEmail2 = 'automation_verona.lmj+client@donotuse.com.au';
  const clientPass2 = 'qaAutomation2021';

  const profaneWords = {
    sensitive: ['FUCK',
      // '',
      // 'fcuk',
      // 'fuk',
      // 'shit',
      // 'ass+(es)?',
      // 'asshol',
      // 'bastards?',
      // 'bitch',
      // 'cunt',
      // 'fag',
      // 'blow ?job',
      // 'fellat',
      // 'felch',
      // 'fuck',
      // 'wank',
      // 'cocks?',
      // 'cock suck',
      // 'poll ?smok',
      // 'dicks?',
      // 'fudge ?pack',
      // 'rim ?job',
      // 'knob ?gobbl',
      // 'anal',
      // 'rectums?',
      // 'ass+',
      // 'as*hole',
      // 'ballsacks?',
      // 'scrotums?',
      // 'bollocks',
      // 'penis(es)?',
      // 'boners?',
      // 'pricks?',
      // 'knobends?',
      // 'manhoods?',
      // 'wieners?',
      // 'breasts?',
      // 'tit(t(ie|y))?s?',
      // 'boob',
      // 'honkers?',
      // 'cleavages?',
      // 'vagina',
      // 'puss(y|ies|ee)',
      // 'muffs?',
      // 'cunt',
      // 'twats?',
      // 'clit',
      // 'quims?',
      // 'labias?',
      // 'buttplugs?',
      // 'dildos?',
      // 'heteros?',
      // 'homos?',
      // 'sluts?',
      // 'whor',
      // 'skank',
      // 'g+h?[ae]ys?',
      // 'dykes?',
      'fag',
      'cumm?(ing|er)?',
      'jizz',
      'pubes?',
      'puberty',
      'pubic',
      'smegma',
      'boy ?butter'],
  };

  before(() => {});

  beforeEach(() => {
    cy
      .clearCookies()
      .clearLocalStorage()
      .visit('/')
      .byPassAuthen();
  });

  it('ES-T3320. Create last minute job with profane words on fields', () => {
    const profaneList = profaneWords.sensitive;

    cy.log('Login as client')
      .loginToDashboard(clientEmail2, clientPass2)

      .log('Navigate to the Post a job')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job"')
      .clickElementOnText('.action button', 'Post a job')

      .log('Check "Learn more about job types"')
      .verifyElementContainsText(
        data.postAJob.learnText,
        'Learn more about job types',
      )
      .clickElement(data.postAJob.learnBtn)
      .verifyElementVisible(data.postAJob.learnExpand)

      .log('Close the expanded information')
      .clickElement(data.postAJob.learnBtn)
      .verifyElementNotVisible(data.postAJob.learnExpand)

      .log('Click Last Minute Job')
      .clickElementOnText(data.postAJob.typeJob, 'Last Minute job')
      .verifyTextVisible('How Last Minute jobs work')

      .log('Click "Create a Last Minute job" button')
      .clickElementOnText(
        data.postAJob.lastMinuteJob.howItWorkButton,
        'Create a Last Minute job',
      )

      .log('Select suburb')
      .inputTextField(data.postAJob.lastMinuteJob.suburbInput, 2000)
      .wait(1000)
      .clickElement('.suggestions .resultsList div', true, 0)

      .log('Select "When do you require support"')
      .clickElement(data.postAJob.lastMinuteJob.whenSuportRadio, true, 1)

      .log('Select "Start time"')
      .log('Select hours')
      .selectDropdown(data.postAJob.lastMinuteJob.startTimeSelect, '10', 0)
      .log('Select minutes')
      .selectDropdown(data.postAJob.lastMinuteJob.startTimeSelect, '00', 1)

      .log('Input duration')
      .inputTextField(data.postAJob.lastMinuteJob.durationInput, 4)

      .log('Select gender')
      .selectDropdown(data.postAJob.lastMinuteJob.genderSelect, 'Male')

      .log('Select service')
      .clickElement(data.postAJob.lastMinuteJob.serviceCheckbox, true, 1)

      .CheckProfaneWordList(profaneList);
  });

  it('ES-T4677. Access last minute job creation page', () => {
    cy.log('Login as client')
      .loginToDashboard(clientEmail2, clientPass2)

      .log('Navigate to the Post a job')
      .navigateByLeftMenuInDashboard('Jobs')

      .log('Click "Post a job"')
      .clickElementOnText('.action button', 'Post a job')

      .log('Check "Learn more about job types"')
      .verifyElementContainsText(
        data.postAJob.learnText,
        'Learn more about job types',
      )
      .clickElement(data.postAJob.learnBtn)
      .verifyElementVisible(data.postAJob.learnExpand)

      .log('Close the expanded information')
      .clickElement(data.postAJob.learnBtn)
      .verifyElementNotVisible(data.postAJob.learnExpand)

      .log('Click Last Minute Job')
      .clickElementOnText(data.postAJob.typeJob, 'Last Minute job')
      .verifyTextVisible('How Last Minute jobs work')

      .log('Click "Create a Last Minute job" button')
      .clickElementOnText(
        data.postAJob.lastMinuteJob.howItWorkButton,
        'Create a Last Minute job',
      )

      .verifyElementVisible('app-post-last-minutes-jobs');
  });
});
