

# Introdução

Seja bem-vindo a este repositório! Ele confere a um desafio front-end criado pela Hypetech e feito por mim. O desafio pode ser visitado nesse [link](https://github.com/hypetechgames/frontend-challenge).

A proposta do desafio é criar uma nova interface para um jogo web chamado **Motograu** e impletar em código utilizando React e Tailwind como principais ferramentas.

## Motograu - Novo Design

O **Motograu** é um jogo de categoria Crash, onde objetivo do jogador é **apostar no Motoqueiro e retirar sua aposta antes que o Cachorro Caramelo o derrube**.

Caso a aposta seja encerrada pelo jogador antes do Motoqueiro ser derrubado, o valor apostado é pago multiplicado pelo multiplicador do momento do cashout.

As rodadas são automáticas e os resultados são transmitidos ao vivo aos jogadores, fornecendo a todos os jogadores as mesmas probabilidades imparciais ao mesmo tempo, 24 horas por dia, 7 dias por semana.

![UI MotoGrau](https://i.ibb.co/xFvpPns/fullscreen.jpg)

## Menu Lateral (Topo)
![side-top](https://i.ibb.co/yqg8g5M/side-top.png)

- Logo em destaque e background com pattern diferente.
- Abas mais largas com icone para uma leitura visual mais fácil.
- Informações propriamente formatadas e estilizadas.
- Contagem de usuarios online.
<br />

## Menu Lateral (Info)
![side-mid](https://i.ibb.co/Dk15Ztj/side-mid.png)

- A aparencia de cada linha reflete a cor do multiplicador presente no jogo, dando coerência e diversidade visual. 
- O lucro também contém novos elementos visuais baseados na quantidade de dinheiro ganho, trazendo um destaque para ganhos altos.
- Fonte e espaçamento modificados para legibilidade.
<br />

## Menu Lateral (Footer)
![side-footer](https://i.ibb.co/zf87PYJ/side-footer.png)

- Footer integrado com a barra lateral, trazendo coerência visual.
- Fonte mais legível e texto propriamente formatado.
<br />

# EM CONSTRUÇÃO
Demostração e comparação de todos os elementos visuais ainda em construção. Abaixo segue as instruções de execução do projeto.

# Instruções técnicas

### 1. Clone o repositório:
```bash
git clone https://github.com/hypetechgames/frontend-challenge
```

### 2. Instale as dependências e inicie o projeto

Acesse a pasta do projeto:
```bash
cd hypetech-challenge
```

Instale as dependências do projeto:
```bash
yarn install
```

Inicie o projeto:
```bash
yarn dev
```

### 3. Obtendo um token de acesso ao jogo

Para acessar o jogo é necessário obter um token de acesso que cria uma sessão demonstrativa funcional para desenvolvimento.

Para obtê-lo:

**1 - Acesse a API de Demonstração:** 
 https://hypetech-demo-api-service-developer.up.railway.app/docs/

**2 - Obtenha um link de demonstração:**	

	{ "gameUrl": "https://hypetech-games-ui-developer.up.railway.app/44cdf4cec80508c531f71a1929d591c8" }

**3 - Extraia o token obtido:**
~~https://hypetech-games-ui-developer.up.railway.app/~~**44cdf4cec80508c531f71a1929d591c8**


Exemplo: https://i.ibb.co/fp07Mxs/Screen-Recording-2024-01-08-at-17-59-36.gif

 ```json
"game": "motograu",
"lang": "pt",
"currency": "BRL"
```

**4 - Acesse o jogo:**
Uma vez obtido o token, utilize-o no seu ambiente de desenvolvimento:

**Exemplo - URL do seu ambiente:** http://localhost:8000/
**Exemplo - URL do jogo no seu ambiente:** http://localhost:8000/2b29acad3f7a1e6b0995155668719e66

Caso encontre dificuldade em obter o token seguindo processo acima, você poderá utilizar o token público abaixo *(ciente que outras pessoas podem estar utilizando a mesma sessão ao mesmo tempo)*:

**Motograu:** 44cdf4cec80508c531f71a1929d591c8

Isso é tudo. A partir de agora você pode acessar o jogo e explorar todas as funcionalidades de forma completa.
