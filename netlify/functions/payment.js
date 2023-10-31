const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token: 'TEST-2506414406949781-103113-dd9133377db83384b97e1023102c99ad-1454532839'
});

let payment_data = {
  transaction_amount: 2,
  description: 'Descrição do Produto',
  payment_method_id: 'pix',  // O valor exato pode variar
  payer: {
    email: 'comprador@email.com'  // Este e-mail seria coletado no frontend
  }
};

mercadopago.payment.save(payment_data)
  .then(function(response) {
    console.log("Pagamento bem-sucedido!", response);
    alert("Pagamento bem-sucedido! Verifique o console para mais detalhes.");
    // Aqui você pode adicionar qualquer código para redirecionar o usuário para uma página de sucesso ou atualizar o estado da interface do usuário.
  })
  .catch(function(error) {
    console.error("Ocorreu um erro durante o pagamento:", error);
    alert("Ocorreu um erro durante o pagamento. Verifique o console para mais detalhes.");
    // Aqui você pode adicionar qualquer código para informar o usuário sobre o erro, como exibir uma mensagem na interface do usuário.
  });


