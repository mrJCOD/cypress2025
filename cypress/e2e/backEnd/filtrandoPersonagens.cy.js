/// reference types='cypress' />

describe('Filtrando Personagem', () => {
    it('Filtra personagens por nome e status - Sucesso', () => {
        const baseUrl = 'https://rickandmortyapi.com/api/';
     cy.request({
        method: 'GET',
        url: baseUrl + 'character',
        headers: { 'Accept-language': 'en-us' },
     }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).is.not.null
        expect(response.body.results[0].name).to.eq('Rick Sanchez')
        expect(response.body.results[0].status).to.eq('Alive')
        console.log(response.body.results[0].name);
        
        });
    });
});