import { faker } from '@faker-js/faker'

describe('User registration', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('BASE_URL') +'/customer/account/create/')
  })

  it('should show error if required fields are empty', () => {
    cy.get('button[title="Create an Account"]').click()

    cy.get('#firstname-error').should(
      'contain.text',
      'This is a required field.'
    )
    cy.get('#lastname-error').should(
      'contain.text',
      'This is a required field.'
    )
    cy.get('#email_address-error').should(
      'contain.text',
      'This is a required field.'
    )
    cy.get('#password-error').should(
      'contain.text',
      'This is a required field.'
    )
    cy.get('#password-confirmation-error').should(
      'contain.text',
      'This is a required field.'
    )
  })

  it('should successfully register a new user (with intercept)', () => {
    const fakeEmail = faker.internet.email({ provider: 'example.com' })
    const fakePassword = faker.internet.password({length: 20})
    // const password = 'Test1234!'

    cy.intercept('GET', '**/customer/account/').as('register')
    // cy.intercept('POST', '**/account/createpost/').as('createPost')
    // cy.wait('@createPost').then((fullResponse) => {
    //   expect(fullResponse.response?.statusCode).to.be.equal(302)
    // })


    cy.fillRegistrationForm('Test', 'Tester', fakeEmail, fakePassword)

    cy.wait('@register').then((interception) => {
      expect(interception.response?.statusCode).to.be.oneOf([200, 201])
    })

    cy.url().should('include', '/customer/account')
    cy.get('.message-success').should(
      'contain.text',
      'Thank you for registering'
    )
  })

  it('should show error for invalid email', () => {
    cy.fillRegistrationForm('Kate', 'Wooaaaa', 'invalid-email', 'Test1234!')
    cy.get('button[title="Create an Account"]').click()

    cy.get('#email_address-error').should(
      'contain.text',
      'Please enter a valid email address'
    )
  })
})
