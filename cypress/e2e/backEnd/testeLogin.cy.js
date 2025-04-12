/// reference types='cypress' />

const baseUrl = 'http://localhost:3000/login'
const email = 'fulano@qa.com'
const password = 'teste'

describe('Login de usuario - Sucesso', () => {
    it('Tenta realizar login com sucesso', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us', },
            body:{
                 "email": email,
                 "password": password
            }
        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.message).to.eq('Login realizado com sucesso');
            expect(response.body.authorization).is.not.null;
            console.log(response.body.authorization);
            const authorization = response.body.authorization;
        });
    });

    it('Tenta realizar login com usuario invalido', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
            body:{
                "email":"fulano1@qa.com",
                "password": password
            }
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.eq('Email e/ou senha inválidos');
        })
        });
        
    });

    it('Tenta realizar login com senha invalida', () => {
        cy.api({
            method: 'POST',
            url: baseUrl,
            headers: { 'Accept-Language': 'en-us', },
            failOnStatusCode: false,
            body:{
                "email": email,
                "password":"teste1"
            }
        }).then((response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message).to.eq('Email e/ou senha inválidos');
        })
    
        
    });