# JIFC

Protótipo estático do JIFC (Jogos do Instituto Federal Catarinense).

## Executar

Abra `index.html` diretamente no navegador. O projeto não requer instalação,
build nem servidor local. As imagens de demonstração são carregadas do Unsplash.

## Organização dos arquivos

### Entrada e documentação

- `index.html`: estrutura comum da aplicação e ordem de carregamento dos scripts.
- `app.js`: inicialização, mensagens, tema e eventos globais de navegação.
- `styles.css`: ponto de entrada que importa as folhas de estilo.
- `README.md`: instruções de execução e referência da estrutura do projeto.
- `.vscode/settings.json`: configuração de aprovação automática dos comandos
  usados no terminal do VS Code.

### Imagens

- `assets/media.js`: catálogo centralizado de imagens e aplicação dos recursos
  visuais.

### JavaScript compartilhado

- `js/data.js`: dados demonstrativos e estado selecionado da interface.
- `js/storage.js`: persistência no `localStorage`, escape de HTML, classificação
  de medalhas e utilitários compartilhados.
- `js/pages.js`: nomes, opções compartilhadas e roteador das telas.
- `js/auth.js`: modais, login demonstrativo e detalhes de atletas.
- `js/editor.js`: estado, salvamento e eventos do painel de edição.

### Telas públicas

- `js/screens/home.js`: visão geral, indicadores e destaques.
- `js/screens/athletes.js`: lista, cartões e filtros de atletas.
- `js/screens/calendar.js`: programação e filtro de jogos.
- `js/screens/athletics.js`: provas e destaques do atletismo.
- `js/screens/podiums.js`: pódio e classificação de medalhas.
- `js/screens/campuses.js`: cartões e informações dos campus.
- `js/screens/modalities.js`: lista e busca de modalidades.
- `js/screens/modality-details.js`: grupos, eliminatórias e detalhes de uma
  modalidade.

### Edição

- `js/editor/fields.js`: construtores de campos, seletores e formulários.
- `js/editor/server.js`: tela de edição de atletas do perfil de servidor.
- `js/editor/admin.js`: painel administrativo e formulários de cada seção.

### Estilos

- `css/base.css`: variáveis, navegação, estrutura e estilos básicos.
- `css/home.css`: hero, indicadores, painéis e elementos da visão geral.
- `css/cards.css`: cartões, tabelas, pódios, campus e detalhes de modalidades.
- `css/editor.css`: modais, formulários e componentes de edição.
- `css/themes.css`: cores e ajustes do tema escuro.
- `css/responsive.css`: regras de layout para diferentes larguras de tela.

## Dados locais

As alterações do editor são guardadas na chave `ifc-editor-data` do
`localStorage`. A preferência de tema fica em `ifc-theme`. Esses dados são
locais ao navegador e fazem parte da demonstração, não de um serviço remoto.

Os scripts são carregados em `index.html` como scripts clássicos, na ordem
necessária para manter a compatibilidade com a abertura direta do arquivo.

## Programação e dados de atletas

O calendário apresenta dois eventos por modalidade em cada dia, de 25 a 27
de junho, e permite filtrar a programação por dia e modalidade. As posições e
estatísticas do cadastro de atletas dependem do esporte; por exemplo, futsal
usa gols e assistências, enquanto vôlei usa pontos. Notas de atletas não são
mantidas, inclusive na migração de dados antigos do navegador.

A demonstração inclui os 15 campi participantes e um atleta de cada campus,
distribuídos entre as modalidades cadastradas. Dados adicionados ao protótipo
são preservados ao migrar informações salvas no navegador.

As modalidades guardam categoria (individual/coletiva), naipes e status.
As provas de Atletismo são submodalidades com naipe e status próprios; o
Tênis de mesa registra disputas individuais e em duplas.
