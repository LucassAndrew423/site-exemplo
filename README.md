# Site de exemplo: Barbearia Navalha Fina

Site de demonstração (Angular) para mostrar a clientes como fica um site de pequeno negócio. A barbearia, o endereço e os preços são **fictícios**.

Todos os botões levam ao WhatsApp de quem criou o site, pedindo "um site assim".

## Rodar

```bash
npm install
npm start
```

## Testes e build

```bash
npm test
npm run build
```

## Publicação

Todo push na `main` roda os testes e publica no GitHub Pages (`.github/workflows/deploy.yml`).

## O que o site mostra

- Poste de barbeiro animado (só `transform`, leve para a GPU)
- Cardápio de serviços e preços
- "Aberto agora / Fechado" calculado em tempo real, no fuso de Recife
- Botão de WhatsApp com mensagem pronta
- Carrega em poucos kB, sem bibliotecas de animação
