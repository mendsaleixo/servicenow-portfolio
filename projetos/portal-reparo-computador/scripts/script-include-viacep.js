/**
 * ViaCEPIntegration (Script Include)
 *
 * Consome a API pública do ViaCEP para resolver um CEP em endereço completo.
 * Habilitado para GlideAjax — é chamado pelo Client Script de preenchimento
 * automático de endereço (RN002, ver docs/regras-negocio.md).
 *
 * Origem: recuperado a partir de docs/screenshots/09 e 10-prc-03a-*.png (as duas
 * imagens mostram o mesmo trecho de código, linhas 10-30). As ~9 linhas iniciais
 * (boilerplate de Script Include + assinatura da função) não aparecem em nenhum
 * screenshot e foram reconstruídas no padrão ServiceNow — o corpo abaixo, a partir
 * de "var request", é fiel ao print.
 */
var ViaCEPIntegration = Class.create();
ViaCEPIntegration.prototype = {
    initialize: function() {},

    getEnderecoPorCEP: function(cep) {

        var request = new sn_ws.RESTMessageV2();

        request.setEndpoint(
            'https://viacep.com.br/ws/' + cep + '/json/'
        );

        request.setHttpMethod('GET');

        var response = request.execute();

        var endereco = JSON.parse(
            response.getBody()
        );

        return JSON.stringify({
            erro: false,
            rua: endereco.logradouro || '',
            bairro: endereco.bairro || '',
            cidade: endereco.localidade || '',
            uf: endereco.uf || ''
        });
    },

    type: 'ViaCEPIntegration'
};
