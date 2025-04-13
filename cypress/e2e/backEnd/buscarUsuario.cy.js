/// <reference types="cypress" />

const baseUrl = 'http://localhost:3000/usuarios/'
const idUsuario = '0uxuPY0cbmQhpEz1'

describe('Buscar Usuario por ID', () => {
    it('Buscar usuario por ID correto - SUCESSO', () => {
        cy.request({
            method: '',
            url: baseUrl + 'usuarios/' + idUsuario,
            headers: { 'Accept-Language': 'en-us', },
        }).then((response) =>{
            expect(response.status).to.eq(200);
            expect(response.body._id).to.eq(idUsuario);
        })
    });

    it('Buscar usuario por ID incorreto - FALHA', () => {
        cy.request({
            method: '',
            url: baseUrl + 'usuarios/0uxuPY0cbmQhpEz0',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) =>{
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('Usuário não encontrado');
        })
    });

    it('Buscar usuario por ID com menos de 16 caracteres - FALHA', () => {
        cy.request({
            method: '',
            url: baseUrl + 'usuarios/0uxuPY0cbmQhpEz',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) =>{
            expect(response.status).to.eq(400);
            expect(response.body.id).to.eq('id deve ter exatamente 16 caracteres alfanuméricos');
        })
    });

    it('Buscar usuario por ID com menos de 16 caracteres - FALHA', () => {
        cy.request({
            method: '',
            url: baseUrl + 'usuarios/0uxuPY0cbmQhpEz01',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) =>{
            expect(response.status).to.eq(400);
            expect(response.body.id).to.eq('id deve ter exatamente 16 caracteres alfanuméricos');
        })
    });
});