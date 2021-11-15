///<reference types="cypress" />

describe('<Login />', ()=>{
    it('<Login /> - Validation, alerts, Authentication', ()=>{
        cy.visit('/')

        cy.get('[data-cy="login-submit"]').click()
        //check alert
        cy.get('[data-cy="alert"]')
          .should('exist')
          .should('have.class', 'alert-error')
          //.invoke('text').should('eq', 'All fields are required')

        //check user that not exist
        cy.get('[data-cy="email-input"]').type('someone@someone.com')
        cy.get('[data-cy="password-input"]').type('2134')
        cy.get('[data-cy="login-submit"]').click()

        cy.get('[data-cy="alert"]')
          .should('exist')
          .should('have.class', 'alert-error')
          //.invoke('text').should('eq', 'This user does not exist')

        //check wrong password
        cy.get('[data-cy="email-input"]').clear().type('deuvede@gmail.com')
        cy.get('[data-cy="password-input"]').clear().type('1qas')
        cy.get('[data-cy="login-submit"]').click()

        cy.get('[data-cy="alert"]')
          .should('exist')
          .should('have.class', 'alert-error')
          //.invoke('text').should('eq', 'Incorrect password')

        //authenticate user successfully
        cy.get('[data-cy="email-input"]').clear().type('q@q.com')
        cy.get('[data-cy="password-input"]').clear().type('qqqqqq')
        cy.get('[data-cy="login-submit"]').click()
        //check for new page title
        cy.get('[data-cy="select-title"]')
          .should('exist')
          .invoke('text').should('eq', 'Select any project')

        //session logout
        cy.get('[data-cy="btn-logout"]').click()
    })
});