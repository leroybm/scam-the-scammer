Recebi a seguinte mensagem dia 07/11/2020, de um celular de código de área 11

```
C A I X A  I'NFORMA: 4898805**** Incompatibilidade_no_registro_da_sua_conta smsmobile.atualizacliente.com Atualize-se_EVITE_BLOQUEIO_PREVENTIVO
```

Ao acessar o site vi que era uma replica de um login da caixa, preenchi umas informações falsas e notei o comportamento

 * É enviado uma request para um endpoint com UUID especifico da pessoa que logou
 * Funciona somente em celulares
 * É criado uma sessão setando cookies pelo backend
 * Ao logar, é mandado um POST para um endpoint, que retorna sempre 422 se ocorreu sucesso

Infelizmente não consigo resetar o cookie de autenticação para enviar requests direto pelo console do navegador, então fiz um loop pelo pupeteer que abre um navegador fingindo ser um iPhone 6, conseguindo uma nova autenticação sempre e gerando CPF e senha falsa para enviar pro backend.

Um passo a mais seria enviar a request sempre de um IP diferente via proxy, pra garantir que não possa ocorrer nenhum profiling da minha parte.

Uso:
`yarn && node index.js` ou `npm install && node index.js`