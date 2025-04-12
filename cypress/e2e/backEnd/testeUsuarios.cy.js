/// <reference types="cypress" />

const { expect } = require("chai");

const baseUrl = 'http://localhost:3000/usuarios'
let idd
let idd2

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

    describe('Cadastrar usuario', () => {
        it('Cadastrar usuario - SUCESSO', () => {
            cy.api({
                method: 'POST',
                url: baseUrl,
                headers: { 'Accept-Language': 'en-us', },
                body:{
                    "nome": "Mauro R Junior",
                    "email": "mauro@qa.com.br",
                    "password": "brisa",
                    "administrador": "true"
                }
            }).then((response) =>{
                expect(response.status).to.eq(201);
                expect(response.body.message).to.eq('Cadastro realizado com sucesso');
                expect(response.body._id).is.not.null;
                idd = response.body._id;
                cy.log(idd);
                
            })
        });

        it('Cadastrar usuario existente - FALHA', () => {
            cy.api({
                method: 'POST',
                url: baseUrl,
                headers: { 'Accept-Language': 'en-us', },
                failOnStatusCode: false,
                body:{
                    "nome": "Mauro R Junior",
                    "email": "mauro@qa.com.br",
                    "password": "brisa",
                    "administrador": "true"
                }
            }).then((response) =>{
                expect(response.status).to.eq(400);
                expect(response.body.message).to.eq('Este email já está sendo usado');

            })

            
        });

        describe('Alterar dados do usuário', () => {
            it('Alterar dados do usuario valido - SUCESSO', () => {
             cy.api({
                method: 'PUT',
                url: baseUrl + '/' + idd,
                headers: { 'Accept-Language': 'en-us', },
                body:{
                    "nome": "Mauro Rodrigues Junior",
                    "email": "mauroAlterado@qa.com.br",
                    "password": "testeAlterado",
                    "administrador": "true"
                  }
             }).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq('Registro alterado com sucesso');
             })
            });

            it('Alterar dados do usuario com ID inexistente - SUCESSO', () => {
                cy.api({
                    method: 'PUT',
                    url: baseUrl + '/' + '0uxuPY0cbmQhpEz121',
                    headers: { 'Accept-Language': 'en-us', },
                    body:{
                        "nome": "Maria Carolina",
                        "email": "maria@qa.com.br",
                        "password": "brisa",
                        "administrador": "true"
                    }
                }).then(response => {
                    expect(response.status).to.eq(201)
                    expect(response.body.message).to.eq('Cadastro realizado com sucesso')
                    expect(response.body._id).is.not.null
                    idd2 = response.body._id
                })
            });

            it('Alterar dados do usuario para um email ja existente - FALHA', () => {
                cy.api({
                    method: 'PUT',
                    url: baseUrl + '/' + '0uxuPY0cbmQhpEz1211',
                    headers: { 'Accept-Language': 'en-us', },
                    failOnStatusCode: false,
                    body:{
                        "nome": "Maria Carolina",
                        "email": "maria@qa.com.br",
                        "password": "brisa",
                        "administrador": "true"
                    }
                }).then(response => {
                    expect(response.status).to.eq(400)
                    expect(response.body.message).to.eq('Este email já está sendo usado')
                })
            });
        });

        describe('Remover usuario', () => {
            it('Remover usuario cadastrado', () => {
                cy.api({
                    method: 'DELETE',
                    url: 'http://localhost:3000/usuarios/' + idd,
                    headers: { 'Accept-Language': 'en-us', },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq('Registro excluído com sucesso');
                })
            });
    
            it('Remover usuario cadastrado', () => {
                cy.api({
                    method: 'DELETE',
                    url: 'http://localhost:3000/usuarios/' + idd2,
                    headers: { 'Accept-Language': 'en-us', },
                }).then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body.message).to.eq('Registro excluído com sucesso');
                })
            });
        });
    });
});