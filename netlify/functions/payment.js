const mercadopago = require('mercadopago');
mercadopago.configure({
  access_token: 'TEST-2506414406949781-103113-dd9133377db83384b97e1023102c99ad-1454532839'
});

function initiatePayment(quantity) {
  // Prepara os dados do pagamento
  let payment_data = {
    transaction_amount: 2 * quantity,  // Preço unitário vezes a quantidade
    description: 'Raspadinha do Vale',
    payment_method_id: 'pix',
    payer: {
      email: 'comprador@email.com'  // Este e-mail seria coletado no frontend
    }
  };

  // Inicia o pagamento usando a SDK do Mercado Pago
  mercadopago.payment.save(payment_data)
    .then(function(response) {
      console.log("Pagamento bem-sucedido!", response);
      // Aqui você pode adicionar qualquer código para redirecionar o usuário para uma página de sucesso ou atualizar o estado da interface do usuário.
    })
    .catch(function(error) {
      console.error("Ocorreu um erro durante o pagamento:", error);
      // Aqui você pode adicionar qualquer código para informar o usuário sobre o erro, como exibir uma mensagem na interface do usuário.
    });
}
