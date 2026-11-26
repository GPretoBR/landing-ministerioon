# Landing page MinisterioOn

Página de vendas do MinisterioOn, um sistema de gestão para igrejas. A conversão principal é **abrir uma conversa no WhatsApp comercial**.

Stack: Next.js 16 (App Router, exportação estática), React 19, TypeScript, Tailwind CSS 4 e Lucide. Não há backend: `npm run build` gera a pasta `out/`, que pode ser publicada em qualquer hospedagem estática.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera out/
```

## Antes de publicar (obrigatório)

Crie um `.env.local` (ou configure as variáveis na hospedagem):

| Variável | Obrigatória | Para que serve |
|---|---|---|
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | não | Substitui o número comercial padrão (`5541998923109`, em `src/lib/config.ts`). Só dígitos, com DDI e DDD. |
| `NEXT_PUBLIC_SITE_URL` | sim | URL final da página. É usada no canonical, no Open Graph e no sitemap. |
| `NEXT_PUBLIC_GTM_ID` | não | Google Tag Manager |
| `NEXT_PUBLIC_GA4_ID` | não | GA4 direto. Só é usado se não houver GTM. |
| `NEXT_PUBLIC_META_PIXEL_ID` | não | Meta Pixel |
| `NEXT_PUBLIC_CLARITY_ID` | não | Microsoft Clarity |

Itens pendentes em `src/lib/config.ts`:

- **Dados institucionais**: razão social, CNPJ, e-mail, Instagram e YouTube. Campos vazios não aparecem no rodapé.
- **Depoimentos**: a seção de prova social só aparece quando houver depoimentos reais **e autorizados** na lista `testimonials`.
- **Mensagem sazonal** ("Comece 2027…"): revise ou desative (`seasonal.enabled = false`) depois de janeiro.
- **Logo**: `src/components/Logo.tsx` e `src/app/icon.svg` têm uma marca provisória. Troque pela marca oficial.
- **Política de privacidade** (`src/app/privacidade/page.tsx`): é um texto-base. Precisa de revisão jurídica e do canal do encarregado (DPO).

## Origem das informações

Tudo o que está na página foi tirado do próprio sistema, no ambiente de homologação, em 26/11/2026:

- **Planos e preços**: tela "Atualizar Plano". Valores em `src/lib/plans.ts`. As economias por ciclo (5%, 10%, 15%) são calculadas a partir desses valores.
- **Módulos**: menu lateral do sistema. A página avisa que os módulos variam conforme o plano.
- **Upgrade proporcional e downgrade na renovação**: textos da tela de planos.
- **Central de Ajuda e chamados**: tela `/central-ajuda/`.

Os painéis mostrados na página são reproduções em HTML, com dados fictícios e legenda informando isso. Nenhum número, cliente, depoimento ou garantia foi inventado.

Ainda não confirmado, e por isso fora da página: teste grátis, garantia, fidelidade e multa, prazo de implantação, limite de usuários de cada plano e preço do usuário adicional para todos os planos. Foi visto R$ 7,00/usuário/mês somente no plano Profissional.

## Eventos de medição

Todos vão para o `dataLayer`. Os scripts de terceiros só carregam depois que o visitante clica em **Aceitar medição** (LGPD).

| Evento | Quando | Parâmetros | Meta Pixel |
|---|---|---|---|
| `cta_click` | Clique em qualquer CTA | `location` | – |
| `whatsapp_click` | Abertura do WhatsApp | `location`, `plan?`, `cycle?` | `Contact` |
| `plan_select` | Clique em "Escolher {plano}" (equivale a início de checkout) | `plan`, `cycle`, `value` | `InitiateCheckout` |
| `form_start` | Primeiro foco no formulário | `form` | – |
| `generate_lead` | Envio válido do formulário | `form`, `units` | `Lead` |
| `scroll_depth` | 25, 50, 75 e 90% da página | `percent` | – |

Os parâmetros UTM, `gclid` e `fbclid` da primeira visita são guardados na sessão e enviados junto com cada evento. A compra acontece dentro do app (Minha Assinatura), então o evento `purchase` deve ser disparado lá.

## Sugestões de teste A/B

Nenhum destes testes foi rodado ainda. São hipóteses para validar com dados.

1. **Headline**: atual (lista de módulos + "num só painel") × foco na dor ("Pare de depender da planilha de uma pessoa só para saber quem é a sua igreja").
2. **CTA do hero**: "Conversar com a equipe" × "Ver o sistema funcionando no WhatsApp".
3. **Hero**: painel geral × Central de Filiais, para tráfego de campanhas voltadas a igrejas com filiais.
4. **Preços**: começar no ciclo anual (atual) × começar no mensal. Testar também 3 planos em destaque × os 5.
5. **Posição da oferta**: preços depois do diferencial de filiais (atual) × logo depois de "Como funciona".
6. **Prova social**: quando houver depoimentos, testar depoimento de secretário(a) × depoimento de pastor.
7. **Formulário**: 3 campos (atual) × só o botão direto para o WhatsApp.

## Verificação feita

- O build estático gera sem erros. A página não tem rolagem horizontal em 375 px.
- Lighthouse mobile (simulado, servidor local): Performance entre 88 e 96 conforme a execução, Acessibilidade 100, Boas práticas 100 e SEO 100.
- Lighthouse desktop: Performance 100.
- Foram testados a validação do formulário, a montagem da mensagem do WhatsApp, a troca de ciclo de preços e as abas de recursos.
