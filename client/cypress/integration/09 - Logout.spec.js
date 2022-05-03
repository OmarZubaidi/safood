describe('Logout tests', () => {
  it('should log out properly', () => {
    cy.viewport(1000, 2000);

    cy.contains('Profile')
      .click();
    cy.contains('Log Out')
      .click();

    cy.url()
      .should('include', '/login');
  });
});
