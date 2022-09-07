const dataValueSelectableElement = 'interior-design';
const textContentSelectableElement = 'Interior Design';

describe('Tестирование селекта', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/select.html');
    cy.viewport(1920, 1080);
  });

  it('До взаимодействия с селектом, он скрыт', () => {
    cy.get('.select__content').should('not.be.visible')
  });

  it('Открытие селекта с помощью мыши', () => {
    cy.get('.select__trigger').click();
    cy.get('.select__content').should('be.visible')
  });

  it('Закрытие селекта с помощью мыши', () => {
    cy.get('.select__trigger').click();
    cy.get('.select__trigger').click();
    cy.get('.select__content').should('not.be.visible')
  });

  it('Открытие селекта с помощью клавиши Enter', () => {
    cy.get('.select__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.select__content').should('be.visible')
  });

  it('Закрытие селекта с помощью клавиши Enter', () => {
    cy.get('.select__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.select__trigger').trigger('keydown', { code: 'Enter' });
    cy.get('.select__content').should('not.be.visible')
  });

  it('Выбор элемента с помощью мыши', () => {
    cy.get('.select__trigger').click();
    cy.get(`[data-value=${dataValueSelectableElement}]`).click();
    cy.get('.select__content').should('not.be.visible')
    cy.get('.select__chosen').contains(`${textContentSelectableElement}`)
  });

  it('Выбор элемента с помощью клавиши Enter', () => {
    cy.get('.select__trigger').click();
    cy.get(`[data-value=${dataValueSelectableElement}]`).trigger('keydown', { code: 'Enter' });
    cy.get('.select__content').should('not.be.visible')
    cy.get('.select__chosen').contains(`${textContentSelectableElement}`)
  });

  it('Выбранный элемент нельзя выбрать еще раз', () => {
    cy.get('.select__trigger').click();
    cy.get(`[data-value=${dataValueSelectableElement}]`).click();
    cy.get('.select__trigger').click();
    cy.get(`[data-value=${dataValueSelectableElement}]`).click();
    cy.get('.select__content').should('be.visible')
  });
});