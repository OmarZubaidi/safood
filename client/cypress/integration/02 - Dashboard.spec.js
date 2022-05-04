describe('Dashboard tests', () => {
  it('should render 4 recipes', () => {
    cy.url()
      .should('include', '/main');

    for (let i = 0; i < 4; i++) {
      cy.get(`#recipe-${i}`)
        .should('contain', 'Prep-time');
    }
  });

  it('should render the other user(s)', () => {
    cy.get('#users-container')
      .children()
      .should('exist');
    cy.get('#users-container > .col > .card > .card-title');
    // Assuming bye@bye.com exists
    cy.contains('About me')
      .should('exist');
    cy.contains('Nick')
      .should('exist');
  });
});
