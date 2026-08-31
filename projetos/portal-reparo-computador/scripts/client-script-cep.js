/**
 * Client Script (onChange) — Preenchimento automático de endereço por CEP (RN002)
 * Campo: CEP · Tabela: variáveis do Catalog Item "Solicitar Reparo de Computador"
 *
 * ⚠️ IMPLEMENTAÇÃO DE REFERÊNCIA — não é o código-fonte original.
 * O registro do Client Script não foi capturado no Update Set (PRC-03A ficou com
 * status "in progress" e não exportou as customizações) e nenhum screenshot mostra
 * o código-fonte real — só o resultado funcionando (docs/screenshots/11, 12 e
 * 13-prc-03a-*.png). O script abaixo reproduz o comportamento documentado em
 * docs/regras-negocio.md (RN002), chamando o Script Include real recuperado em
 * script-include-viacep.js.
 */
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    // Aceita apenas CEP com 8 dígitos numéricos
    var cep = newValue.replace(/\D/g, '');
    if (cep.length !== 8) {
        return;
    }

    var ga = new GlideAjax('ViaCEPIntegration');
    ga.addParam('sysparm_name', 'getEnderecoPorCEP');
    ga.addParam('sysparm_cep', cep);
    ga.getXML(preencherEndereco);

    function preencherEndereco(response) {
        var answer = response.responseXML.documentElement.getAttribute('answer');
        var endereco = JSON.parse(answer);

        if (endereco.erro) {
            g_form.addErrorMessage('Erro ao consultar ViaCEP.');
            return;
        }

        g_form.setValue('rua', endereco.rua);
        g_form.setValue('bairro', endereco.bairro);
        g_form.setValue('cidade', endereco.cidade);
        g_form.setValue('uf', endereco.uf);
    }
}
