describe('Log in tests', () => {
  it('should not log in with incorrect details', () => {
    cy.visit('http://127.0.0.1:3000/');

    cy.get('#email > .form-control')
      .type('hi@hi.com')
      .should('have.value', 'hi@hi.com');
    cy.get('#password > .form-control')
      .type('12345')
      .should('have.value', '12345');
    cy.get('form > .w-100')
      .click();

    cy.url()
      .should('include', '/login');
    cy.get('#alert')
      .should('exist');
  });

  it('should log in', () => {
    cy.visit('http://127.0.0.1:3000/');

    cy.get('#email > .form-control')
      .type('hi@hi.com')
      .should('have.value', 'hi@hi.com');
    cy.get('#password > .form-control')
      .type('123456')
      .should('have.value', '123456');
    cy.get('form > .w-100')
      .click();

    cy.url()
      .should('include', '/main');
  });
});
