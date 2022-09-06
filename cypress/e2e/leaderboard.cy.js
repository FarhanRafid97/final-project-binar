describe('Leaderboard', () => {
  it('Successfully login', () => {
    cy.visit('http://localhost:3000/dashboard')

    // cy.contains('Login').click()
    cy.url().should("include", "/login");
    cy.get("input[name=email]").type("player1@app.com");
    cy.get("input[name=password]").type("player1");
    cy.get("form").submit();
  })
  
  it('Check Leaderboard', () => {
    cy.visit('http://localhost:3000/leaderboard')

    // cy.contains('Leaderboard').click()
    cy.url().should("include", "/leaderboard");
    // cy.get("input[name=email]").type("player1@app.com");
    // cy.get("input[name=password]").type("player1");
    // cy.get("form").submit();
    cy.get("h2").should("have.text", "World Leaderboard");
  })


})

