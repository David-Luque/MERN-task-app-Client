///<reference types="cypress" />


describe('<Forms />', ()=>{
  it('<Login/> - Verify login screen', ()=>{
      cy.visit('/');

      //verify title
      //cy.contains('h1', 'Login'); => NOT recomended, not enough specific
      cy.get('[data-cy="login-title"]')
        .invoke('text')
        .should('equal', 'Login')

      //verify form exist
      cy.get('[data-cy="login-form"]')
        .should('exist')

      //verify inputs
      cy.get('[data-cy="email-input"]')
        .should('exist')
      cy.get('[data-cy="password-input"]')
        .should('exist')

      //verify button
      cy.get('[data-cy="login-submit"]')
        .should('exist')
        .should('have.value', 'Login')
        .should('have.class', 'btn-primary').and('have.class', 'btn-block')

      //verigy signup link
      cy.get('[data-cy="signup-link"]')
        .should('exist')
        .should('have.prop', 'tagName').and('eq', 'A')

      cy.get('[data-cy="signup-link"]')
        .should('exist')
        .should('have.attr', 'href').and('eq', '/new-account')
      
      cy.visit('/new-account')
  });

  it('<NewAccount/> - Verify Signup component', ()=>{
    //verify component title
    cy.get('[data-cy="signup-title"]')
      .should('exist')
      .invoke('text').should('eq', 'Create account')
    
      //verify form exist
    cy.get('[data-cy="signup-form"]').should('exist')

    //verify inputs
    cy.get('[data-cy="name-input"]').should('exist')
    cy.get('[data-cy="email-input"]').should('exist')
    cy.get('[data-cy="password-input"]')
      .should('exist')
      .should('have.prop', 'type').and('eq', 'password')
    cy.get('[data-cy="second-password-input"]').should('exist')
    
    //verify submit button
    cy.get('[data-cy="signup-submit"]')
      .should('exist')
      .should('have.class', 'btn-primary')
      .should('have.value', 'Create account')
      .should('not.have.value', 'Signup')

    //verify login link
    cy.get('[data-cy="login-link"]')
      .should('exist')
      .should('have.attr', 'href').and('eq', '/')

      //go to home
      cy.visit('/')
  });

});