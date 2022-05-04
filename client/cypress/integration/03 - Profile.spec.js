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
    cy.contains('Omar')
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

  // TODO have to manually delete allergens, make a back-end route for deleting
  // TODO specific allergens.
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

  // TODO have to manually delete events, make a back-end route for deleting.
  it('should be able to create a new event', () => {
    const currentTime = new Date();

    cy.get('#dropdown-type')
      .click();

    cy.contains('Lunch')
      .click();

    cy.get('#dropdown-users')
      .click();

    cy.contains('Nick')
      .click();

    cy.get('#date-input')
      .type('2022-05-04T15:30');

    cy.get('#create-event')
      .click();

    cy.url()
      .should('include', '/main');
  });
});
