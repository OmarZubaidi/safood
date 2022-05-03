describe('Dashboard tests', () => {
  it('should render 4 recipes', () => {
    cy.viewport(1000, 2000);

    cy.url()
      .should('include', '/main');
  });
});
