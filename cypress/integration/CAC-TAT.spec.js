describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html');
    });

    it('Verifica o titulo da aplicação', () => {
         cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });

    it.only('Preenche os campos obrigatórios e envia o formulário', () => {
        const text = 'lorem ipsum dolor sit amet lorem Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla aliquam consequat arcu, vel tincidunt ante lacinia nec. Morbi lacinia lorem a sem sollicitudin vestibulum. Mauris ut lorem id dolor mollis elementum sed a dui. In lacinia, nulla non volutpat auctor, purus felis tempor metus, id ultrices dolor metus non urna. Ut tempus, mauris eu varius tincidunt, diam leo sagittis tellus, ut molestie nisl lorem quis est. Duis purus eros, luctus vitae ultricies vitae, lacinia eu eros. Vestibulum eget fermentum lorem, ac venenatis ante. Fusce mattis condimentum leo in sodales. Aliquam nec tempor sapien. Donec tincidunt semper felis vel posuere.';
        cy.get('#firstName').type('Fulano');
        cy.get('#lastName').type('de Tal');
        cy.get('#email').type('fulano@exemplo.com');
        cy.get('#open-text-area').type(text, {delay: 5});
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible');
    });

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('#firstName').type('Fulano');
        cy.get('#lastName').type('de Tal');
        cy.get('#email').type('fulanoexemplo.com');
        cy.get('#open-text-area').type('lorem ipsum dolor sit amet');
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    });

    it.only('campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone').type('abc')
          .type('{enter}')
          .should('have.value', '');
    });

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone').type('123')
          .type('{enter}');
        cy.get('.error').should('be.visible');
    });

    it.only('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName').type('Fulano').clear().should('have.value', '');
        cy.get('#lastName').type('de Tal').clear().should('have.value', '');
        cy.get('#email').type('fulano@exemplo.com').clear().should('have.value', '');
        cy.get('#phone').type('123').clear().should('have.value', '');
    });

    it.only('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
        cy.get('button[type="submit"]').click();
        cy.get('.error').should('be.visible');
    });

    it.only('envia o formuário com sucesso usando um comando customizado', () => {
        cy.fillMandatoryFieldsAndSubmit();
        cy.get('.success').should('be.visible');
    });

    it.only('seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product').select('YouTube');
        cy.get('#product').should('have.value', 'youtube');
    });

    it.only('seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product').select('mentoria');
        cy.get('#product').should('have.value', 'mentoria');
    });

    it.only('seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product').select('Blog');
        cy.get('#product').should('have.value', 'blog');
    });

    it.only('marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"]').check('feedback');
        cy.get('input[type="radio"]').should('be.checked');
    });

    it.only('marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(($el) => {
            cy.wrap($el).check().should('be.checked');
            cy.wrap($el).should('have.value', $el.val());
        });
    });

    it.only('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]').check().should('be.checked');
        cy.get('input[type="checkbox"]').eq(1).uncheck().should('not.be.checked');
    });

    it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#phone').type('123')
          .type('{enter}');
        cy.get('.error').should('be.visible');
    });

    it.only('seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json');
    });

    it.only('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', 'application/json');
    });

    it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('file');
        cy.get('input[type="file"]').selectFile('@file');
    });

    it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('a').should('have.attr', 'target', '_blank');
    });

    it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('a').invoke('removeAttr', 'target').click();
        cy.url().should('include', 'privacy');
    });

    it.only('testa a página da política de privacidade de forma independente', () => {
        cy.visit('./src/privacy.html');
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de privacidade');
    });    
});
