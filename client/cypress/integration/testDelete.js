/*
 * @Description : This is the end-to-end test with cypress. The user will try to
 * get deleted from the database.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-09 20:12:56
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-09 21:02:52
 */

describe('[Cypress] User delete', () => {
  it('[Cypress] The user click delete user button', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
    cy.get('#loginb').contains('Login');
    cy.get('#username').type('junyong').should('have.value', 'junyong');
    cy.get('#loginb').click();
    cy.wait(1500);
    cy.get('#logoutb').contains('Logout');
    cy.get('#deleteb').click();
    cy.get('#loginb').contains('Login');
  });
});
