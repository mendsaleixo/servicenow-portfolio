# Desenvolvimento Client-Side — Client Scripts

**Status:** ✅ Concluído | **Tipo:** Fundamentos | **Módulo:** Client Scripts

Implementações práticas utilizando Client Scripts e UI Policies na plataforma ServiceNow para automação e comportamento dinâmico de formulários ITSM.

---

## Contexto do projeto

Automação e validação de formulários no módulo Incident Management,
reduzindo erros de preenchimento e melhorando a experiência do usuário
no Service Desk.

---

## Tecnologias e recursos utilizados

- Client Scripts
- UI Policies
- JavaScript aplicado ao ServiceNow
- APIs `g_form` e `g_user`
- Incident Management (ITSM)
- Update Sets

---

## Navegação

### Artigos Produzidos

- [Client Scripts: tipos e quando usar](artigos/01-client-script.md)
- [JavaScript para ServiceNow](artigos/02-%20JavaScript%20-para-ServiceNow.md)
- [onChange na prática](artigos/03-onChange.md)
- [Validação com onSubmit](artigos/04-onsubmit-pratica-impedir-salvamento-validacoes.md)
- [UI Policy vs Client Script](artigos/05-ui-policy-vs-client-script.md)

### Evidências

- [Screenshots das implementações](entregaveis/prints/)

### Update Set

- [Exportação XML](update-sets/ESTUDO-S02-Mendelson-UIScripts.xml)

---

## Implementações realizadas

### Client Scripts

| Tipo       | Implementação                                 |
| ---------- | --------------------------------------------- |
| onLoad     | Saudação dinâmica e preenchimento automático  |
| onChange   | Validação condicional por prioridade          |
| onChange   | Preenchimento automático baseado em categoria |
| onSubmit   | Validação antes do salvamento                 |
| onCellEdit | Validação inline em listas                    |

---

### UI Policies

- Obrigatoriedade condicional
- Exibição dinâmica de campos
- Comparação declarativo vs programático

---

## Conceitos aplicados

| Conceito  | Aplicação prática             |
| --------- | ----------------------------- |
| onLoad    | Inicialização dinâmica        |
| onChange  | Reatividade de formulário     |
| onSubmit  | Validação pré-envio           |
| g_form    | Leitura e escrita de campos   |
| g_user    | Dados e permissões do usuário |
| UI Policy | Regras declarativas           |

---

## Observações técnicas

- Uso de `isLoading` para evitar execuções desnecessárias
- Diferença prática entre `getValue()` e `getDisplayValue()`
- Uso de `addInfoMessage()` para feedback não intrusivo
- Separação de responsabilidades entre UI Policy e scripting

---

## Estrutura do diretório

```text
artigos/        -> documentação técnica
entregaveis/    -> screenshots e testes
update-sets/    -> exportações XML
```
