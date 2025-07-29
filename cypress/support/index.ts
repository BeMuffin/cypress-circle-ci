import './commands'

declare global {
  namespace Cypress {
    interface Chainable {
      loginUser(username: string, password: string): Chainable<void>
    }
    interface Chainable {
      fillRegistrationForm(
        firstName: string,
        lastName: string,
        email: string,
        password: string
      ): Chainable<void>
    }
  }
}
