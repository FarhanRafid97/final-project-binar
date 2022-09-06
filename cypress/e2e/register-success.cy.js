describe('Register', () => {
  it('Successfully register', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('Register').click()
    cy.url().should("include", "/register");
    cy.get("input[name=username]").type("player10");
    cy.get("input[name=email]").type("player10@app.com");
    cy.get("input[name=password]").type("player10{enter}");
  })

//   it('Successfully logout', () => {

//       // cy.get('data-testid="logout”').click();
//       cy.contains('Logout').click()
//       cy.url().should("include", "/tentang-kami");

//     })


//   it("should display error when username or password is incorrect", () => {
//       cy.get('a[href*="login"]').click();
//       cy.url().should("include", "/login");
//   cy.get("input[name=username]").type("abcdef");
//   cy.get("input[name=password]").type("abcdef{enter}");
//   cy.get(".alert").should("have.text", "Username atau Password salah!");
// })
})

