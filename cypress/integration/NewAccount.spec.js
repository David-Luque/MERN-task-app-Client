///<reference types="cypress" />

describe('<NewAccount />', ()=>{
    it('<NewAccount /> - Validation, alerts and create new account', ()=>{
        cy.visit('/new-account');
        //submit click with empty form
        cy.get('[data-cy="signup-submit"]').click()
        //check alert
        cy.get('[data-cy="alert"]')
          .should('exist')
          .should('have.class', 'alert-error')
          .invoke('text').should('eq', 'All fields are required')

        //form fill
        cy.get('[data-cy="name-input"]').type('David')
        cy.get('[data-cy="email-input"]').type('q@q.com')
        cy.get('[data-cy="password-input"]').type('qqq')
        cy.get('[data-cy="second-password-input"]').type('qqqqqq')
        //submit click
        cy.get('[data-cy="signup-submit"]').click()
        //check alert
        cy.get('[data-cy="alert"]')
          .should('exist')
          .should('have.class', 'alert-error')
          .invoke('text').should('eq', 'Password must be longer than 6 characters')

        //fill form with different passwords
        cy.get('[data-cy="password-input"]').type('123456')
        //with ".type()" again, cypress add new text after the previous tipped text.
        //to clear input:
        cy.get('[data-cy="password-input"]')
          .clear().type('wewewe')
        //submit click
        cy.get('[data-cy="signup-submit"]').click()
        //check alert
        cy.get('[data-cy="alert"]')
          .should('exist')
          .should('have.class', 'alert-error')
          .invoke('text').should('eq', 'Both passwords must be identical')

        //fill form with correct passwords
        cy.get('[data-cy="second-password-input"]')
          .clear().type('qqqqqq')
        //submit click
        cy.get('[data-cy="signup-submit"]').click()

        //check for new page title
        cy.get('[data-cy="select-title"]')
          .should('exist')
          .invoke('text').should('eq', 'Select any project')

        //logout click
        cy.get('[data-cy="btn-logout"]').click()
        // cy.get('[data-cy="login-title"]')
        //   .should('exist')

    });

    it('<NewAccount /> - Check for duplicate users', ()=>{
        cy.visit('/new-account');

        //form fill
        cy.get('[data-cy="name-input"]').type('David')
        cy.get('[data-cy="email-input"]').type('q@q.com')
        cy.get('[data-cy="password-input"]').type('qqqqqq')
        cy.get('[data-cy="second-password-input"]').type('qqqqqq')
        //submit click
        cy.get('[data-cy="signup-submit"]').click()

        //check alert
        cy.get('[data-cy="alert"]')
        .should('exist')
        .invoke('text').should('eq', 'User already exist')
    });
});