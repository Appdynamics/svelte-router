describe('hash router', { baseUrl: 'http://localhost:10001' }, () => {
  it('should render initial route', () => {
    cy.visit('#/')
    cy.get('h2').contains('Home').should('exist')
  })
  
  it('should change hash on route change', () => {
    cy.visit('#/')
    cy.get('a').contains('Null').click()
    cy.hash().should('eq', '#/null')
    cy.get('h2').contains('404').should('exist')
  })

  it('should handle nested routes', () => {
    cy.visit('#/profile/123')
    cy.get('h2').contains('Profile').should('exist')
  })

  it('should handle programmatic navigation', () => {
    cy.visit('#/')
    cy.get('#profile-id').type('123')
    cy.get('#profile-button').click()
    cy.contains('Your ID is 123').should('exist')
    cy.hash().should('eq', '#/profile/123/welcome')
  })

  it('should handle param shorthand paths', () => {
    cy.visit('#/profile/123')
    cy.get('a').contains('Welcome').click()
    cy.contains('Your ID is 123').should('exist')
    cy.hash().should('eq', '#/profile/123/welcome')
  })

  it('should display correct href for link component', () => {
    cy.visit('#/profile/123')
    cy.get('a')
      .contains('Welcome')
      .should('have.attr', 'href')
      .and('eq', '#/profile/123/welcome')
  })

  it('should redirect', () => {
    cy.visit('#/secret')
    cy.hash().should('eq', '#/')
  })

  it('should not redirect if undefined', () => {
    cy.visit('#/profile/123/bio')
    cy.get('h3').contains('Bio').should('exist')
  })
})
