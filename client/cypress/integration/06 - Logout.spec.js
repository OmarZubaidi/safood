describe('Logout tests', () => {
  it('should log out properly', () => {
    cy.contains('Profile')
      .click();
    cy.contains('Log Out')
      .click();

    cy.url()
      .should('include', '/login');
  });
});
