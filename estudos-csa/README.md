# Estudos — Certificação ServiceNow CSA

[← Voltar ao portfólio principal](../README.md)

Material de estudo organizado por bloco temático para a certificação **Certified System Administrator (CSA)**. Cada bloco reúne um checklist dos tópicos cobrados na prova, com links relativos para os artigos e entregáveis já produzidos neste repositório.

---

## Blocos

| Bloco                                                  | Tópico principal                     | Peso na prova | Status       |
| ------------------------------------------------------ | ------------------------------------ | ------------- | ------------ |
| [Bloco 1](bloco-1-platform-ui/README.md)               | The ServiceNow Platform & UI         | ~12%          | Não iniciado |
| [Bloco 2](bloco-2-database-architecture/README.md)     | The Database & Table Architecture    | ~15%          | Não iniciado |
| [Bloco 3](bloco-3-data-access-configuration/README.md) | Data, Access & Configuration         | ~42%          | Não iniciado |
| [Bloco 4](bloco-4-catalog-workflows-reports/README.md) | Service Catalog, Workflows & Reports | ~31%          | Não iniciado |

> Percentuais de referência conforme o _ServiceNow CSA Exam Blueprint_ mais recente; conferir sempre a versão vigente no momento do agendamento da prova, pois a distribuição de peso pode mudar entre versões do exame.

---

## Banco de Questões de Treino

Depois de estudar um bloco pelo checklist, pratique com questões reais de simulados/provas no `questoes-praticas.md` daquele bloco. Cada questão vem com as alternativas visíveis e a resposta certa (+ explicação de cada alternativa) escondida num bloco recolhível — marque o que você acha certo antes de abrir.

| Bloco                                   | Questões de treino                                                             |
| --------------------------------------- | ------------------------------------------------------------------------------ |
| Bloco 1 — Platform & UI                 | [questoes-praticas.md](bloco-1-platform-ui/questoes-praticas.md)               |
| Bloco 2 — Database & Table Architecture | [questoes-praticas.md](bloco-2-database-architecture/questoes-praticas.md)     |
| Bloco 3 — Data, Access & Configuration  | [questoes-praticas.md](bloco-3-data-access-configuration/questoes-praticas.md) |
| Bloco 4 — Catalog, Workflows & Reports  | [questoes-praticas.md](bloco-4-catalog-workflows-reports/questoes-praticas.md) |

### Como adicionar novas questões

Cole o texto bruto da questão (enunciado, alternativas e explicações — do jeito que aparece no simulado) e peça para formatar no arquivo do bloco correspondente. O padrão de cada questão é:

```markdown
### Qn — tema curto

Enunciado da pergunta.

- [ ] Alternativa 1
- [ ] Alternativa 2
- [ ] Alternativa 3

<details>
<summary>💡 Ver resposta e explicação</summary>

✅ **Alternativa correta** — por que está certa
❌ Alternativa errada — por que está errada

</details>

---
```

Questões que não se encaixam claramente em nenhum bullet do checklist (ex: CMDB, Knowledge Management) entram no bloco mais próximo, com uma nota explicando a conexão.

---

## Estrutura

```text
estudos-csa/
├── README.md                              ← este arquivo
├── bloco-1-platform-ui/
│   ├── README.md
│   └── questoes-praticas.md
├── bloco-2-database-architecture/
│   ├── README.md
│   └── questoes-praticas.md
├── bloco-3-data-access-configuration/
│   ├── README.md
│   └── questoes-praticas.md
└── bloco-4-catalog-workflows-reports/
    ├── README.md
    └── questoes-praticas.md
```
