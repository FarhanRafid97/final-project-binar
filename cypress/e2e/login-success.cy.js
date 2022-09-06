describe('Login', () => {
  it('Successfully login', () => {
    cy.visit('http://localhost:3000/dashboard')

    // cy.contains('Login').click()
    cy.url().should("include", "/login");
    cy.get("input[name=email]").type("player1@app.com");
    cy.get("input[name=password]").type("player1");
    cy.get("form").submit();
  })

  // it('Successfully logout', () => {

  //     // cy.get('data-testid="logout”').click();
  //     cy.get(".chakra-button").click()
  //     cy.get(".logout").click()

  //     // cy.contains('Logout').click()
  //     // cy.url().should("include", "/tentang-kami");

  //   })


//   it("should display error when username or password is incorrect", () => {
//       cy.get('a[href*="login"]').click();
//       cy.url().should("include", "/login");
//   cy.get("input[name=username]").type("abcdef");
//   cy.get("input[name=password]").type("abcdef{enter}");
//   cy.get(".alert").should("have.text", "Username atau Password salah!");
// })
})

