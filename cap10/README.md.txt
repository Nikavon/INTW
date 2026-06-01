# Projeto — Recriação Responsiva

## Autor
Anna Vitória Soares Queiroz Vasconcelos

## Site Escolhido
COPEVE/UFAL - Comissão Permanente do Vestibular da Universidade Federal de Alagoas

## Link do Site Original
https://copeve.ufal.br/

## Objetivo Visual do Projeto
Criar uma versão própria e responsiva da homepage da COPEVE/UFAL, mantendo a identidade institucional (cores azul e verde) e a clareza na apresentação de editais e processos seletivos, com um layout moderno baseado em cards e totalmente adaptado para dispositivos móveis.

## Tecnologias Utilizadas
- HTML5
- CSS3
- Flexbox
- CSS Grid Layout
- Media Queries
- Variáveis CSS
- prefers-color-scheme (Dark Mode)
- clamp() para tipografia fluida
- Font Awesome para ícones

## Estratégia Responsiva Utilizada
Mobile-first. Todo o CSS foi desenvolvido inicialmente para telas pequenas (smartphones) e, em seguida, foram adicionados breakpoints com min-width para tablets e desktops.

## Breakpoints Implementados
- 640px (tablets pequenos)
- 768px (tablets)
- 1024px (desktops pequenos)
- 1280px (desktops largos)

## Principais Dificuldades
- Adaptar o menu de navegação para funcionar como menu hambúrguer no mobile sem usar bibliotecas externas.
- Manter o título "Comissão Permanente do Vestibular" em uma única linha em todos os tamanhos de tela.
- Implementar o suporte a dark mode com prefers-color-scheme cobrindo todas as variáveis de cor.
- Escolher a quantidade correta de colunas no grid de cards nos diferentes breakpoints.

## Principais Adaptações Realizadas em Relação ao Site Original
- O site original tem um layout tradicional baseado em tabelas; recriei uma estrutura moderna baseada em cards.
- Adicionei uma hero section com chamada principal que não existe no original.
- Simplifiquei o rodapé e unifiquei informações de contato.
- Utilizei CSS Grid para a área de links rápidos e contato.
- Utilizei Flexbox para o header e alinhamentos internos.
- Implementei dark mode automático seguindo a preferência do sistema operacional.
- Adicionei navegação superior com links principais.

## Capturas de Tela do Projeto

### Layout Mobile (smartphone)
![Layout Mobile](assets/images/screenshot-mobile.png)

### Layout Tablet
![Layout Tablet](assets/images/screenshot-tablet.png)

### Layout Desktop
![Layout Desktop](assets/images/screenshot-desktop.png)