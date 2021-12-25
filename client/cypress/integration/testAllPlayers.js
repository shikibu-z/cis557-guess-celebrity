/*
 * @Description : This is the end-to-end test with cypress. User will try to
 * access all the users and their score.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-09 20:12:56
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-09 21:03:06
 */

describe('[Cypress] Test getting all user info', () => {
  it('[Cypress] User login and click game stats button', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
    cy.get('#loginb').contains('Login');
    cy.get('#username').type('junyong').should('have.value', 'junyong');
    cy.get('#loginb').click();
    cy.wait(1500);
    cy.get('#logoutb').contains('Logout');
    cy.get('#statsb').click();
    cy.get('#alluser').contains('junyong');
  });
});
