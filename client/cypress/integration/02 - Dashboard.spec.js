describe('Dashboard tests', () => {
  it('should render 4 recipes', () => {
    cy.viewport(1000, 2000);

    cy.url()
      .should('include', '/main');

    for (let i = 0; i < 4; i++) {
      cy.get(`#recipe-${i}`)
        .should('contain', 'Prep-time');
    }
  });

  it('should render the other user(s)', () => {
    cy.viewport(1000, 2000);

    cy.get('#users-container')
      .children()
      .should('exist');
    cy.get('#users-container > .col > .card > .card-title');
    // Assuming bye@bye.com exists
    cy.get('#users-container > .col > .card > .card-title')
      .should('contain', 'About me');
    cy.get('#users-container > .col > .card > .card-body')
      .should('contain', 'bye');
  });
});
