describe('Register', () => {
  it('Register failed', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Register').click()
    cy.url().should("include", "/register");
    cy.get("input[name=username]").type("player1");
    cy.get("input[name=email]").type("player1@app.com");
    cy.get("input[name=password]").type("player1{enter}");
    // cy.get(".chakra-alert").should("have.text", "Failed Create Account");
    // cy.get(".chakra-alert");
    // cy.contains('#toast', data.err.response.data.msg)  
    // cy.get("#toast").should("have.text", "Failed Create Account");
    cy.get('#toast-1-title').should('have.text', 'Failed Create Account');
    
  })


//   it("should display error when username or password is incorrect", () => {
//       cy.get('a[href*="login"]').click();
//       cy.url().should("include", "/login");
//   cy.get("input[name=username]").type("abcdef");
//   cy.get("input[name=password]").type("abcdef{enter}");
//   cy.get(".alert").should("have.text", "Username atau Password salah!");
// })
})

