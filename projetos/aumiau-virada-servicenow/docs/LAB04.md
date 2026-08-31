# LAB 04 — Portal & Ouvidoria

## O que era esperado

Criar e personalizar a vitrine digital voltada para o cliente final da AuMiau no **Service Portal** (`/aumiau`), enxugando menus de navegação, aplicando a identidade visual da marca por meio do _Branding Editor_ e estruturando a página inicial com widgets customizados.

---

## Como foi feito

1. **Missão 01 — Novo Portal (a vitrine da AuMiau):**
   - Criação do portal pelo _Service Portal Configuration_ (`sp_config`), o hub central de portais, páginas, widgets e temas.
   - Preenchimento do registro: `Title` = AuMiau Pet Shop, `URL suffix` = aumiau, `Homepage` = Index, `Application` = AuMiau Pet Shop, `Main menu` = SP Header Menu.
   - Upload do logotipo (`logo-aumiau.png`, com Logo Alt Text "AuMiau Pet Shop") e do ícone (`icon-aumiau.png`) direto no registro do portal, via _Upload an image_.
   - Validação navegando em `/aumiau`, já com logotipo e ícone da loja aplicados.
     ![Novo Portal — a vitrine da AuMiau](/projetos/aumiau-virada-servicenow/docs/screenshots/lab04_01.png)

2. **Missão 02 — Menu (só o essencial):**
   - Edição do `SP Header Menu` do portal, removendo os itens excedentes e mantendo apenas Base de Conhecimento e Requisições (além do ícone de perfil e do tour).
   - Renomeação dos labels para português: _Base de Conhecimento_ e _Requisições_.
     ![Menu — só o essencial](/projetos/aumiau-virada-servicenow/docs/screenshots/lab04_02.png)

3. **Missão 03 — Branding (a marca da AuMiau):**
   - Confirmação do logotipo (`logo-aumiau.png`) no _Branding Editor_, já anexado na Missão 01.
   - Ajuste da paleta de cores para a identidade da marca: marrom `#4A362A`, turquesa `#159AA6` e laranja `#F5A623`, sobre fundo creme.
   - Definição do ícone do portal e salvamento das alterações após revisão da pré-visualização.
     ![Branding — a marca da AuMiau](/projetos/aumiau-virada-servicenow/docs/screenshots/lab04_03.png)

4. **Missão 04 — Widgets (organizando a homepage):**
   - Montagem da Homepage no _Service Portal Designer_, com banner (`banner-aumiau.png`) definido como Background image do container do topo, com Background style `Cover`.
   - Edição do widget de busca via _Instance Options_ (Ctrl + botão direito no título do widget), configurando `Title` = "Como posso AUjudar?", `Short description` = "pesquise sua necessidade em nossa loja" e `Typeahead Search` = "Diga o que precisa aqui...".
   - Organização de containers e linhas para a home final (banner no topo, busca em destaque, atalhos abaixo) e salvamento.
     ![Widgets — organizando a homepage](/projetos/aumiau-virada-servicenow/docs/screenshots/lab04_04.png)

---
