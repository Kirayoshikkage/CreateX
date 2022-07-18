describe('Тестирование бургер меню', () => {
  beforeEach(() => {
    cy.viewport(320, 568);
    cy.visit('http://localhost:3000/');
  });

  it('Открытие бургер меню', () => {
    cy.get('.burger-trigger').click();
    cy.get('.burger-menu').should('be.visible');
  });

  it('Закрытие бургер меню', () => {
    cy.get('.burger-trigger').click();
    cy.get('.burger-trigger').click();
    cy.get('.burger-menu').should('not.be.visible');
  });

  it('Тестирование бургер меню при ресайзе', () => {
    cy.get('.burger-trigger').click();
    cy.get('.burger-menu').should('be.visible');
    cy.viewport(1920, 1080);
    cy.get('.burger-menu').should('not.be.visible');
  });
});
