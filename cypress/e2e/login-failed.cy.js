describe('Login', () => {
  it('Successfully login', () => {
    cy.visit('http://localhost:3000/dashboard')

    // cy.contains('Login').click()
    cy.url().should("include", "/login");
    cy.get("input[name=email]").type("player1@app.com");
    cy.get("input[name=password]").type("123");
    cy.get("form").submit();
    cy.get('#toast-1-title').should('have.text', 'Username Or Password invalid');

  })



})

