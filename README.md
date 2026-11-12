# JIFC 2026

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

- `js/data.js`: modalidades e estado selecionado da interface.
- `js/storage.js`: persistência no `localStorage`, escape de HTML, classificação
  de medalhas e utilitários compartilhados.
- `js/pages.js`: nomes, opções compartilhadas e roteador das telas.
- `js/auth.js`: login demonstrativo, solicitação de acesso e detalhes de atletas.
- `js/editor.js`: estado, salvamento e eventos do painel de edição.

### Telas públicas

- `js/screens/home.js`: visão geral, indicadores e destaques.
- `js/screens/athletes.js`: lista, cartões e filtros de atletas.
- `js/screens/calendar.js`: programação e filtro de jogos.
- `js/screens/athletics.js`: provas e destaques do atletismo.
- `js/screens/podiums.js`: pódios cadastrados e quadro de medalhas.
- `js/screens/campuses.js`: cartões e informações dos campus.
- `js/screens/modalities.js`: lista e busca de modalidades.
- `js/screens/modality-details.js`: detalhes e resultados de uma modalidade.

### Edição e acesso demonstrativo

- `js/editor/fields.js`: construtores de campos, seletores e formulários.
- `js/editor/admin.js`: painéis admin/servidor e formulários de cada seção.

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
O acesso abre uma demonstração sem autenticação real. O admin pode editar todas
as seções e analisar solicitações; o servidor aprovado pode editar os campos
existentes dos atletas vinculados ao campus aprovado, mas não pode alterar o
vínculo de campus nem editar outras seções. A solicitação pede e-mail
institucional, campus e atuação. Pedidos, aprovações e alterações ficam apenas
no `localStorage`; a senha do servidor é apenas ilustrativa e não é verificada.
Cada atleta é associado a uma única modalidade; no Atletismo, pode selecionar
até três provas, sem obrigatoriedade de preencher todas. As credenciais do admin da demonstração são
`admin@jifc.demo` / `jifc-demo-admin`. Não use este protótipo como sistema de
acesso restrito.

Os scripts são carregados em `index.html` como scripts clássicos, na ordem
necessária para manter a compatibilidade com a abertura direta do arquivo.

## Programação e dados de atletas

Os 15 campi do IFC são listados inicialmente com sigla e limite de 0 a 60
participantes por campus. A página de campus exibe contagens fictícias entre
48 e 60, sem criar cadastros individuais de atletas. A demonstração inclui seis
atletas, medalhas, pódios de modalidades que não são Atletismo e jogos/eventos
em todas as modalidades. O painel permite cadastrar e atualizar esses dados;
as alterações ficam no navegador. As fotos de atletas são enviadas como
arquivos de imagem (até 2 MB), sem precisar informar uma URL.
As siglas dos campus são exibidas com duas letras.
As posições e estatísticas do
cadastro de atletas dependem do esporte; por exemplo, futsal usa gols e
assistências, enquanto vôlei usa pontos.

As modalidades guardam categoria (individual/coletiva), naipes e status.
As provas de Atletismo incluem baterias demonstrativas; Basquetebol mostra
grupos e chave mata-mata; e Xadrez usa rodadas e classificação no formato
suíço. A data dos jogos e eventos pode ser escolhida pelo calendário do
formulário. O Tênis de mesa registra disputas individuais e em duplas.
