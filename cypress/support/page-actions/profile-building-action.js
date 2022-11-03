const route = {
  'Bank account': 'a[href="/profile-building/bank-account"]',
  'Rates and availability': 'a[href="/profile-building/availability"]',
  Experience: 'a[href="/profile-building/experience"]',
  'Work history': 'a[href="/profile-building/work-history"]',
  'Education & training': 'a[href="/profile-building/education-training"]',
  'NDIS Worker Screening': 'a[href="/profile-building/ndis-worker-screening"]',
  Badges: 'a[href="/profile-building/badges"]',
  Immunisation: 'a[href="/profile-building/Immunisation"]',
  Languages: 'a[href="/profile-building/languages"]',
  'Cultural background': 'a[href="/profile-building/cultural-background"]',
  Religion: 'a[href="/profile-building/religion"]',
  'Interests & hobbies': 'a[href="/profile-building/interests-hobbies"]',
  'About me': 'a[href="/profile-building/about-me"]',
  'My preferences': 'a[href="/profile-building/my-preferences"]',
};

export function checkMarkIcons(section, isComplete) {
  const expected = isComplete ? '9.58V9.61Z' : '4 12 4Z';
  const sectionChecked = route[section];

  if (sectionChecked !== undefined) {
    cy.get(sectionChecked)
      .siblings('app-icon')
      .find('svg path')
      .invoke('attr', 'd')
      .should('include', expected);
  }
}

export function chooseSection(section) {
  const sectionChecked = route[section];

  if (sectionChecked !== undefined) {
    cy.get(route[section])
      .click();
  }
}
