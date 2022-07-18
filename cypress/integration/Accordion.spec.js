describe('Тестирование аккордиона', () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/interior-design.html');
  });

  it('Открытие аккордиона', () => {
    cy.get('[data-test=accordion-1-trigger]').click();
    cy.get('[data-test=accordion-1-content]').should('be.visible');
  });

  it('Закрытие аккордиона', () => {
    cy.get('[data-test=accordion-1-trigger]').click();
    cy.get('[data-test=accordion-1-trigger]').click();
    cy.get('[data-test=accordion-1-content]').should('not.be.visible');
  });

  it('При открытии аккордиона, активный закрывается', () => {
    cy.get('[data-test=accordion-1-trigger]').click();
    cy.get('[data-test=accordion-2-trigger]').click();
    cy.get('[data-test=accordion-1-content]').should('not.be.visible');
  });
});
