/*
 * @Description : This is the end-to-end test with cypress. User will type
 * username and poped with next view when login successfully.
 * @Author      : Junyong Zhao (junyong@seas.upenn.edu)
 * @Date        : 2021-11-09 20:12:56
 * @LastEditors : Junyong Zhao (junyong@seas.upenn.edu)
 * @LastEditTime: 2021-11-09 21:02:42
 */

describe('[Cypress] Login and go to next view', () => {
  it('[Cypress] Type username and click login button', () => {
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:3000/');
    cy.get('#loginb').contains('Login');
    cy.get('#username').type('junyong').should('have.value', 'junyong');
    cy.get('#loginb').click();
    cy.wait(1500);
    cy.get('#logoutb').contains('Logout');
  });
});
