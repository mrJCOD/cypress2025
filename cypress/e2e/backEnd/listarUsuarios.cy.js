/// <reference types="cypress" />

const { expect } = require("chai");

const baseUrl = 'http://localhost:3000/usuarios'

describe('Listar usuarios cadastrados', () => {
    it('Listar usuarios cadastrados - Sucesso', () => {
        cy.api({
            method: 'GET',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us', },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
            expect(response.body.usuarios[0].nome).not.be.null;
            expect(response.body.usuarios[0].email).not.be.null;
            expect(response.body.usuarios[0].password).not.be.null;
            expect(response.body.administrador).not.be.null;
            expect(response.body._id).is.not.be.null;
        })
    });

    it('Listar usuarios cadastrados por ID - Sucesso', () => {
        cy.api({
            method: 'GET',
            url: baseUrl +'?_id=0uxuPY0cbmQhpEz1',
            headers: { 'Accept-Language': 'en-us', },
            accept: 'application/json',
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
            expect(response.body.usuarios[0].nome).to.eq('Fulano da Silva');
            expect(response.body.usuarios[0].email).to.eq('fulano@qa.com');
            expect(response.body.usuarios[0].password).to.eq('teste');
            expect(response.body.usuarios[0].administrador).to.eq('true');
        })
    });
    it('Buscar usuario por ID Inexistente - Falha', () => {
        cy.api({
            method: 'GET',
            url: baseUrl + '/0uxuPY0cbmQhpEz5',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.message).to.eq('Usuário não encontrado');
        })
    });

    it('Buscar usuario por Nome - Sucesso', () => {
        cy.api({        
            method: 'GET',
            url: baseUrl + '/usuarios?nome=Fulano%20da%20Silva',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
            expect(response.body.usuarios[0].nome).to.eq('Fulano da Silva');
        })
    });

    it('Buscar usuario por Nome Inexistente - FALHA', () => {
        cy.api({        
            method: 'GET',
            url: baseUrl + '/usuarios?nome=Fulanoo%20da%20Silva',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(0);
        })
    });

    it('Buscar usuario por E-mail - SUCESSO', () => {
        cy.api({        
            method: 'GET',
            url: baseUrl + '/usuarios?email=fulano%40qa.com',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
            expect(response.body.usuarios[0].email).to.eq('fulano@qa.com')
        })
    }); 

    it('Buscar usuario por E-mail invalido - FALHA', () => {
        cy.api({        
            method: 'GET',
            url: baseUrl + '/usuarios?email=heudis9d',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(400);
            expect(response.body.email).to.eq('email deve ser um email válido');
        })
    }); 

    it('Buscar usuario administradores - SUCESSO', () => {
        cy.api({        
            method: 'GET',
            url: baseUrl + '/usuarios?administrador=true',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
        })
    });
z
    it('Buscar usuario por senha - SUCESSO', () => {
        cy.api({        
            method: 'GET',
            url: baseUrl + '/usuarios?password=teste',
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.quantidade).to.eq(1);
        })
    });
});