describe('Search tests', () => {
  it('should navigate to the result page', () => {
    cy.url()
      .should('include', '/events/');

    cy.get('#search-input')
      .type('curry lime {enter}');

    cy.url()
      .should('include', '/result');
  });

  it('should display the correct results', () => {
    for (let i = 0; i < 2; i++) {
      cy.get(`#recipe-${i}`)
        .should('exist');
    }

    // Coconut Crusted Haddock
    cy.contains('Coconut Crusted Haddock')
      .should('exist');
    cy.contains('Butter, canola oil, coconut, cod fillets, curry powder, ground cinnamon, honey, lime juice, panko bread crumbs, pumpkin seeds, salt, strawberry fruit spread.')
      .should('exist');
    cy.contains('Prep-time: 45 minutes')
      .should('exist');

    // Pistachio Sea Bass with Crab Salad
    cy.contains('Pistachio Sea Bass with Crab Salad')
      .should('exist');
    cy.contains('Coconut, curry powder, egg white, fleur de sel, lime juice, lump crabmeat, pistachio oil, pistachios, scallions, sea-salt, sea bass, vegetable oil.')
      .should('exist');
    cy.contains('Prep-time: 45 minutes')
      .should('exist');
    cy.contains('glutenFree')
      .should('exist');
    cy.contains('dairyFree')
      .should('exist');
    cy.contains('whole30')
      .should('exist');
  });
});
