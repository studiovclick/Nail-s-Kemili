# Guia do Projeto - Nail's Design de Cílios

## Objetivo

Este portal foi pensado para apresentar o serviço de design de cílios com um visual elegante, acolhedor e feminino, adequado para Porto Alegre e a região metropolitana.

## Estrutura do projeto

- `index.html`: página principal com todas as seções do site
- `styles.css`: visual do projeto, paleta e responsividade
- `script.js`: interações e calendário dinâmico
- `README.md`: instruções de uso e execução

## Observações importantes

- Os slides da hero alternam automaticamente a cada 5 segundos.
- Os cards de antes/depois possuem botão de troca entre visual inicial e final.
- O calendário mostra dias úteis e horários disponíveis.
- O formulário de agendamento valida campos obrigatórios.
- O site foi construído para funcionar em dispositivos móveis e desktop.

## Como manter e editar

### Alterar textos
Ajuste o conteúdo diretamente nos elementos do `index.html`.

### Alterar cores
Edite as variáveis globais em `:root` em `styles.css`.

### Alterar disponibilidade e horários
Modifique o mapa `freeDays` e os arrays de `availableDates` em `script.js`.

### Atualizar imagens
Troque as URLs das imagens no HTML, preferencialmente por imagens reais do serviço ou clientes.

## Direitos autorais e contato

- Nome do responsável: Vanderlei Strider
- Telefone: 51 9 8972-7254
- E-mail: studioc447@gmail.com

## Sugestões de expansão

- Inserir galeria de fotos reais do salão
- Adicionar integração com WhatsApp de conversão
- Implementar envio de agendamento com backend
- Incluir formulário de contato com ferramentas de automação
