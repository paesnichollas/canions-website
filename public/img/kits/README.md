# Imagens dos Kits do Atleta

Este diretório contém as imagens dos kits do atleta.

## Estrutura de Arquivos

Para que as imagens sejam exibidas corretamente, nomeie os arquivos conforme os IDs definidos em `shared/const.ts`:

- `kit-basico.jpg` - Imagem do Kit Básico
- `kit-premium.jpg` - Imagem do Kit Premium  
- `kit-vip.jpg` - Imagem do Kit VIP

## Formatos Suportados

- JPG/JPEG
- PNG
- WebP

## Tamanho Recomendado

- Largura: 400px
- Altura: 300px
- Proporção: 4:3

## Como Adicionar/Remover Kits

1. **Para adicionar um novo kit:**
   - Adicione um novo objeto no array `ATHLETE_KITS` em `shared/const.ts`
   - Adicione a imagem correspondente neste diretório
   - O grid se ajustará automaticamente

2. **Para remover um kit:**
   - Remova o objeto do array `ATHLETE_KITS` em `shared/const.ts`
   - Remova a imagem correspondente deste diretório
   - O grid se ajustará automaticamente

3. **Para desabilitar a imagem de um kit:**
   - Defina `image: undefined` ou remova a propriedade `image` do objeto do kit

## Grid Responsivo

O grid se ajusta automaticamente baseado na quantidade de kits:

- **1 kit:** Grid de 1 coluna, centralizado
- **2 kits:** Grid de 1 coluna no mobile, 2 colunas no desktop
- **3+ kits:** Grid de 1 coluna no mobile, 2 colunas no tablet, 3 colunas no desktop
