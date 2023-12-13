describe('join-text', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="cy-join-landing-title"]')
      .should('exist')
      .should('have.text', 'Join any Course');
  });
});

describe('free-text', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="cy-free-landing-title"]')
      .should('exist')
      .should('have.text', 'All for Free');
  });
});

describe('create-text', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="cy-create-landing-title"]')
      .should('exist')
      .should('have.text', 'Curate, Create & Share');
  });
});
