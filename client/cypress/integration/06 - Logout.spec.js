describe('Logout tests', () => {
  it('should log out properly', () => {
    cy.get('#logout-button')
      .click();

    cy.url()
      .should('include', '/login');
  });
});
