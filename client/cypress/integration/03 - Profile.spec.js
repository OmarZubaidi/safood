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
});
