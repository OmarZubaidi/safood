describe('Profile tests', () => {
  it('should navigate to the profile page', () => {
    cy.url()
      .should('include', '/main');

    cy.contains('Profile')
      .click();
    cy.url()
      .should('include', '/profile');
  });

  it('should render the user\'s details', () => {
    cy.contains('hi')
      .should('exist');

    const allergens = [
      'tomato',
      'cheese',
      'dough',
      'basil',
      'oregano',
      'olive oil',
      'flour',
      'yeast',
    ];

    allergens.forEach(allergen => {
      cy.contains(allergen)
        .should('exist');
    });
  });

  it('should be able to add an allergen', () => {
    const currentTime = new Date().getTime();

    cy.get('#new-allergen-input')
      .type(currentTime)
      .should('have.value', currentTime);

    cy.contains('Add Allergen')
      .click();

    cy.get('#new-allergen-input')
      .should('have.value', '');

    cy.contains(currentTime)
      .should('exist');
  });

  it('should be able to create a new event', () => {
    const currentTime = new Date();

    cy.get('#dropdown-type')
      .click();

    cy.contains('Lunch')
      .click();

    cy.get('#dropdown-users')
      .click();

    cy.contains('bye')
      .click();

    cy.get('#date-input')
      .type('2022-05-04T15:30');

    cy.get('#create-event')
      .click();

    cy.url()
      .should('include', '/main');
  });
});
