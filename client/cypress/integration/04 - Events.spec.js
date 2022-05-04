describe('Event tests', () => {
  it('should find the new event', () => {
    cy.url()
      .should('include', '/main');

    cy.contains('Lunch With Omar, Nick')
      .should('exist');
    cy.contains('2022-05-04 at 15:30')
      .should('exist');
    cy.contains('Menu:')
      .should('exist');
  });

  it('should navigate to the event\'s page', () => {
    cy.url()
      .should('include', '/main');

    cy.contains('2022-05-04 at 15:30')
      .click();

    cy.url()
      .should('include', '/events/');
  });

  it('should contain a relevant menu', () => {
    cy.contains('Lunch With Omar, Nick')
      .should('exist');
    cy.contains('2022-05-04 at 15:30')
      .should('exist');
    cy.contains('Menu:')
      .should('exist');

    for (let i = 0; i < 3; i++) {
      cy.get(`#recipe-${i}`)
        .should('contain', 'Prep-time');
    }

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
        .should('not.exist');
    });
  });
});
