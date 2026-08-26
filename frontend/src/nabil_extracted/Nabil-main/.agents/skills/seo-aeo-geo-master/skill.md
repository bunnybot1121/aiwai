---
name: seo-aeo-geo-master
description: Skill especializada em SEO (Search Engine Optimization), AEO (Answer Engine Optimization), GEO (Generative Engine Optimization) e AI Optimization Files (llms.txt, ai.txt, TDMRep). Use esta skill quando o usuário precisar de orientações sobre otimização para mecanismos de busca tradicionais, motores de resposta AI (ChatGPT, Perplexity, Claude), mecanismos generativos, ou implementação de arquivos de otimização para IA. Inclui estratégias técnicas de SEO, Core Web Vitals, E-E-A-T, schema markup, voice search, video SEO, link building, llms.txt, ai.txt, TDM Reservation Protocol e todas as melhores práticas atualizadas para 2025.
license: MIT
version: 2.1
last_updated: 2025-10-27
---

# SEO/AEO/GEO Master Skill

Skill completa para dominar Search Engine Optimization (SEO), Answer Engine Optimization (AEO), Generative Engine Optimization (GEO) e AI Optimization Files em 2025.

**Última Atualização:** Outubro 2025 - Validado com pesquisas web e fontes oficiais (Google Developers, W3C, KDD 2024, market data).

## Quando Usar Esta Skill

Use esta skill quando o usuário solicitar:

**SEO Tradicional:**
- Orientações sobre otimização para mecanismos de busca (Google, Bing)
- Melhoria de Core Web Vitals e performance técnica
- Implementação de schema markup e dados estruturados
- Estratégias de link building e autoridade de domínio
- Entity-based SEO e Knowledge Graph

**AEO (Answer Engine Optimization):**
- Estratégias para aparecer em respostas de IA (ChatGPT, Perplexity, Claude, Gemini)
- Otimização para AI Overviews e featured snippets
- Otimização para voice search e busca por voz
- Video SEO e otimização de conteúdo multimídia

**GEO (Generative Engine Optimization):**
- Aumentar citações em respostas geradas por IA
- Otimizar para ChatGPT Search, Perplexity, Claude
- Análise de SERP features e como ranquear nelas

**AI Optimization Files:**
- Implementação de llms.txt para guiar LLMs
- Criação de llms-full.txt para documentação
- Configuração de ai.txt (controle granular)
- Setup de TDM Reservation Protocol (.well-known/tdmrep.json)
- Gerenciamento de AI crawlers (GPTBot, ClaudeBot, etc)

## Conceitos Fundamentais

### SEO (Search Engine Optimization)
Otimizar para mecanismos de busca tradicionais focando em rankings orgânicos, tráfego do site e melhorar CTR nos resultados de pesquisa.

### AEO (Answer Engine Optimization)
Otimizar para motores de resposta alimentados por IA focando em visibilidade em AI Overviews, featured snippets e respostas diretas. Plataformas-alvo: ChatGPT, Perplexity, Claude, Meta AI, Google AI Overviews, Bing Copilot.

### GEO (Generative Engine Optimization)
Otimizar para mecanismos generativos focando em citações e menções em respostas geradas por IA, aumentando visibilidade em conteúdo AI-generated.

### AI Optimization Files
Novos padrões emergentes (2024-2025) para controlar como Large Language Models interagem com conteúdo web. Inclui llms.txt (guia de conteúdo), ai.txt (controle granular), e TDMRep (proteção legal).

## Como Usar Esta Skill

### Para Implementação de llms.txt

Quando o usuário solicitar orientações sobre llms.txt ou otimização para AI engines:

1. **Estruturar llms.txt seguindo formato padrão:**
   - H1 único com nome do site
   - Blockquote com descrição breve (1-2 sentenças)
   - H2 para seções (Products, Documentation, Resources)
   - Links com URLs completas e descrições concisas
   - Seção "Optional" para conteúdo secundário

2. **Recomendar priorização de 20-50 páginas mais importantes**

3. **Orientar sobre localização:** `yoursite.com/llms.txt`

4. **Sugerir configuração de robots.txt** com referências aos arquivos AI

5. **Fornecer exemplos** específicos baseados no tipo de site (SaaS, E-commerce, Docs, Blog)

Consultar `references/llms-txt-detailed-guide.md` para exemplos completos e casos de uso avançados.

### Para Otimização Técnica de SEO

Quando o usuário precisar melhorar aspectos técnicos:

1. **Avaliar Core Web Vitals** usando targets 2025:
   - LCP (Largest Contentful Paint): ≤ 2.5s
   - INP (Interaction to Next Paint): ≤ 200ms  
   - CLS (Cumulative Layout Shift): ≤ 0.1

2. **Verificar checklist técnico essencial** (mobile-first, HTTPS, sitemap, robots.txt)

3. **Recomendar ferramentas** apropriadas (Google Search Console, PageSpeed Insights, Screaming Frog)

4. **Implementar schema markup** adequado ao tipo de conteúdo

Consultar `references/technical-seo-guide.md` para guia técnico detalhado.

### Para Otimização de Conteúdo (AEO/GEO)

Quando o usuário quiser otimizar conteúdo para AI engines:

1. **Aplicar framework E-E-A-T:** Experience, Expertise, Authoritativeness, Trustworthiness

2. **Estruturar conteúdo com:**
   - Resposta direta primeiro (40-60 palavras)
   - Pirâmide invertida (mais importante primeiro)
   - Headers como perguntas (What is X? How to Y?)
   - Blocos snippable (fáceis de extrair)
   - Seções FAQ dedicadas

3. **Implementar métodos GEO:**
   - Cite Sources (adicionar citações)
   - Statistics Addition (incluir dados)
   - Quotation Addition (citações de especialistas)
   - Fluency Optimization (melhorar legibilidade)

4. **Otimizar para plataformas AI:** ChatGPT Search, Perplexity AI, Claude, Gemini

Consultar `references/content-optimization-guide.md` e `references/aeo-geo-strategies.md` para estratégias detalhadas.

### Para Schema Markup

Quando o usuário precisar implementar dados estruturados:

1. **Identificar tipos de schema apropriados:**
   - Article/NewsArticle para blog posts
   - FAQPage para seções FAQ (essencial para AEO)
   - HowTo para tutoriais
   - Product para e-commerce
   - LocalBusiness para negócios locais
   - Person/Organization para Entity SEO

2. **Usar formato JSON-LD** (preferido pelo Google)

3. **Validar com ferramentas:** Google Rich Results Test, Schema Markup Validator

Consultar `references/schema-markup-examples.md` para exemplos prontos de todos os tipos principais de schema.

### Para AI Crawler Management

Quando o usuário precisar gerenciar crawlers de IA:

1. **Diferenciar entre tipos de crawlers:**
   - **Training crawlers:** GPTBot, Google-Extended, CCBot (coletam para treino)
   - **Search/Inference crawlers:** ChatGPT-User, ClaudeBot, PerplexityBot (busca real-time)

2. **Configurar robots.txt apropriadamente:**
   - Permitir search/inference crawlers benéficos
   - Bloquear training crawlers se houver preocupações IP
   - Adicionar referências a llms.txt e TDMRep

3. **Monitorar atividade** via server logs

4. **Testar acessibilidade AI** com ferramentas (Andi Search, Firecrawl)

### Para TDM Reservation Protocol

Quando o usuário precisar proteger direitos legais (especialmente EU):

1. **Criar** `/.well-known/tdmrep.json` com:
   ```json
   {
     "tdm-reservation": true,
     "tdm-policy": "https://yoursite.com/tdm-policy"
   }
   ```

2. **Desenvolver tdm-policy page** contendo:
   - Declaração de reserva de direitos
   - Informações de contato
   - Processo de licensing
   - Base legal (EU CDSM Directive Article 4)

3. **Implementar alternativas** via HTTP headers ou HTML meta tags se necessário

## Pilares de Otimização - Visão Geral

### 1. Technical SEO
Focar em Core Web Vitals 2025, mobile-first indexing, HTTPS, sitemaps, robots.txt, arquitetura de site, URLs amigáveis, linking interno, crawlability, schema markup, canonical tags, hreflang.

**Ferramentas:** Google Search Console, PageSpeed Insights, Screaming Frog, GTmetrix

### 2. Content Optimization
Aplicar E-E-A-T, estruturar para AEO (resposta direta primeiro, pirâmide invertida), usar LSI keywords, criar topic clusters, otimizar readability.

**Ferramentas:** Surfer SEO, Clearscope, MarketMuse, Frase

### 3. Schema Markup
Implementar Article, FAQ, HowTo, Product, LocalBusiness, Person/Organization, Breadcrumb, Review schemas usando JSON-LD.

**Ferramentas:** Schema Markup Validator, Google Rich Results Test

### 4. Voice Search
Focar em keywords conversacionais, queries baseadas em perguntas, buscas locais, mobile-first, page speed, featured snippets, long-tail keywords.

### 5. AI Overviews & AEO
Estruturar conteúdo claramente, usar listas, target keywords baseadas em perguntas, responder concisamente, formatar com headers apropriados, incluir schema markup, liderar com resposta.

**Plataformas:** Google AI Overviews, ChatGPT Search, Perplexity AI, Claude, Meta AI, Bing Copilot

### 6. GEO (Generative Engine Optimization)
Citar fontes, melhorar fluency, adicionar estatísticas, incluir citações de especialistas, usar linguagem clara, manter tom autoritativo.

**Combinações efetivas:** Fluency + Statistics (+27% visibility), Cite Sources + Quotations (+24%)

### 7. Video SEO
Otimizar título, descrição detalhada, tags relevantes, thumbnail atraente, video schema, transcrições, video sitemap, formato MP4.

**Plataformas:** YouTube (essencial), Vimeo, Wistia

### 8. Link Building 2025
Executar Digital PR, HARO, Guest Posting, Broken Link Building, Original Research, Case Studies. Priorizar qualidade > quantidade, white-hat techniques, backlinks relevantes.

### 9. Entity-Based SEO
Construir internal knowledge graph, conectar ao Google's Knowledge Graph, usar entity-based internal linking, manter NAP consistente, implementar Person/Organization schema.

### 10. SERP Features
Target featured snippets, PAA boxes, local pack, knowledge panel, image pack, video carousel, rich snippets, sitelinks.

### 11. AI Optimization Files

#### llms.txt - AI Content Guide
**Propósito:** Guiar LLMs ao conteúdo mais importante do site.

**Status em Outubro 2025:** Adoção limitada e controversa. Apenas ~1,000 sites implementaram globalmente. Nenhuma grande plataforma AI (OpenAI, Google, Anthropic, Meta) parseia oficialmente llms.txt ainda. Google indexa mas não usa para ranking. Considerar como "hedge" para futuro.

**Localização:** `yoursite.com/llms.txt`

**Estrutura Básica:**
```markdown
# Nome do Site

> Breve descrição (1-2 sentenças)

## Produtos
- [Produto 1](https://site.com/produto1): Descrição concisa
- [Produto 2](https://site.com/produto2): Descrição concisa

## Documentação
- [Getting Started](https://site.com/docs/start): Guia inicial
- [API Reference](https://site.com/api): Documentação completa

## Optional
- [Blog](https://site.com/blog): Conteúdo secundário
```

**Best Practices:**
- Use H1 único (nome do site)
- Blockquote para descrição breve
- H2 para seções principais
- URLs completas, não relativas
- Descrições concisas (< 100 chars)
- Priorizar conteúdo importante primeiro
- Seção "Optional" para conteúdo secundário
- Atualizar trimestralmente

**Exemplos Específicos:**

Para **SaaS:** Incluir Products, Documentation, Resources, Support
Para **E-commerce:** Incluir Categories, Information, Customer Service
Para **Documentation Site:** Incluir Getting Started, API Reference, Guides, Examples
Para **Blog:** Incluir Popular Posts, Categories, About

#### llms-full.txt - Conteúdo Completo
**Propósito:** Fornecer TODO o conteúdo importante em arquivo único.

**Quando Usar:**
- Sites de documentação técnica
- Conteúdo bem estruturado
- < 50 páginas importantes
- Quer fornecer contexto máximo

**Quando Evitar:**
- Sites muito grandes (> 100 páginas)
- Conteúdo muda frequentemente  
- Arquivo ficaria > 5MB

#### ai.txt - Controle Granular (Experimental)
**Propósito:** Controle por tipo de ação (Train, Summarize, Extract) e elemento HTML.

**Status:** Experimental, não amplamente adotado ainda (2025)

**Sintaxe:**
```
# Site Name

User-agent: *
Disallow: Train *
Allow: Summarize *.md

User-agent: GPTBot
Disallow: *
```

**Actions:** Train, Summarize, Extract, Index, Modify, Crop, Display

**Quando Implementar:**
- Conteúdo altamente proprietário
- Preocupações legais com AI training
- Early adopter mindset
- Recursos técnicos disponíveis

#### TDMRep (.well-known/tdmrep.json)
**Propósito:** Reservar direitos de Text and Data Mining legalmente.

**Localização:** `yoursite.com/.well-known/tdmrep.json`

**Status:** W3C Standard oficial (conformidade EU CDSM Directive Article 4, EU AI Act)

**Formato:**
```json
{
  "tdm-reservation": true,
  "tdm-policy": "https://yoursite.com/tdm-policy"
}
```

**Path-specific:**
```json
{
  "/": {
    "tdm-reservation": false
  },
  "/premium/": {
    "tdm-reservation": true,
    "tdm-policy": "https://yoursite.com/premium-policy"
  }
}
```

**Alternativas:** HTTP Headers (`TDM-Reservation: 1`), HTML meta tags

**Quando Implementar:**
- Operando na UE
- Conteúdo protegido por copyright
- Concerns sobre AI training em conteúdo proprietário
- Publishers, academia, research institutions

#### Configuração Completa robots.txt

```
# robots.txt

# Arquivos AI para LLMs
AI-crawlers: /llms.txt
AI-crawlers-full: /llms-full.txt
LLMs-txt: https://yoursite.com/llms.txt

# TDM Reservation Protocol
TDM-Policy: /.well-known/tdmrep.json

# Permitir AI search/inference crawlers
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: PerplexityBot
User-agent: AndiBot
User-agent: FirecrawlAgent
Allow: /

# Bloquear AI training crawlers (opcional)
User-agent: GPTBot
User-agent: Google-Extended
User-agent: CCBot
Disallow: /

# Permitir search engines tradicionais
User-agent: Googlebot
User-agent: Bingbot
Allow: /

# Sitemaps
Sitemap: https://yoursite.com/sitemap.xml
```

#### AI Crawlers User-Agents (Outubro 2025)

⚠️ **IMPORTANTE:** Alguns crawlers (Perplexity 2024, Anthropic 2024) foram documentados ignorando robots.txt. Sempre monitore logs para verificar compliance.

**Training Crawlers** (coletam dados para treino de modelos):
- `GPTBot` - OpenAI (30% market share em 2025, cresceu de 5%)
- `Google-Extended` - Google Gemini training
- `Google-CloudVertexBot` - Google Cloud AI services
- `CCBot` - Common Crawl (caiu para 7% em 2025)
- `anthropic-ai` - Anthropic training (deprecated, ver ClaudeBot)
- `Bytespider` - ByteDance/TikTok LLM (caiu de 42% para 7%)
- `Omgilibot` - Omgili
- `Cohere-Ai` - Cohere language models
- `DeepseekBot` - Deepseek AI
- `xAI-Bot` - X/Twitter AI (Grok)
- `Amazonbot` - Amazon AI

**Search/Inference Crawlers** (buscam conteúdo real-time para respostas):
- `ChatGPT-User` - ChatGPT browsing (user-initiated)
- `ChatGPT-User/2.0` - Nova versão (rollout desde fev/2025)
- `OAI-SearchBot` - OpenAI Search index builder
- `ClaudeBot` - Anthropic Claude (substituiu anthropic-ai)
- `Claude-SearchBot` - Claude search index refinement
- `Claude-User` - Claude on-demand fetcher
- `Claude-Web` - Claude web access (deprecated)
- `PerplexityBot` - Perplexity AI index
- `Perplexity-User` - On-demand quando user clica citations
- `YouBot` - You.com AI search
- `AndiBot` - Andi Search
- `ExaBot` - Exa AI
- `PhindBot` - Phind
- `FirecrawlAgent` - Firecrawl
- `DuckAssistBot` - DuckDuckGo AI answers
- `MistralAI-User/1.0` - Le Chat by Mistral (desde março/2025)

**Meta/Facebook AI:**
- `meta-externalagent` - Meta AI (19% market share em 2025!)
- `FacebookBot` - Facebook social + AI features
- `facebookexternalhit/1.1` - Social previews e real-time retrieval

**Apple AI:**
- `Applebot` - Siri e Spotlight
- `Applebot-Extended` - Apple Intelligence training

**Microsoft:**
- `BingBot` - Bing + Copilot (usa mesmo bot para search e AI)

**Market Share 2025:** GPTBot (30%), Meta-ExternalAgent (19%), Bytespider (7%, em queda)

#### Workflow de Implementação AI Files

**Fase 1: Preparação**
1. Auditar conteúdo mais importante
2. Identificar 20-50 páginas prioritárias
3. Decidir política AI (allow/restrict)
4. Alocar recursos

**Fase 2: llms.txt**
1. Criar arquivo Markdown
2. Estruturar com H1, blockquote, H2
3. Listar páginas com links completos
4. Adicionar descrições breves
5. Upload para root directory
6. Testar acesso

**Fase 3: robots.txt Update**
1. Adicionar referências a llms.txt
2. Configurar AI crawler user-agents
3. Definir Allow/Disallow rules
4. Testar com validator

**Fase 4: llms-full.txt (Opcional)**
1. Converter conteúdo para Markdown limpo
2. Combinar em arquivo único
3. Verificar tamanho (< 1MB ideal)
4. Upload e teste

**Fase 5: TDMRep (Se Aplicável)**
1. Criar `/.well-known/tdmrep.json`
2. Escrever tdm-policy page
3. Implementar (JSON, headers, ou meta)
4. Testar compliance

**Fase 6: Monitoring**
1. Setup server log monitoring
2. Track AI crawler visits
3. Monitor citations em ChatGPT, Perplexity, Claude
4. Measure referral traffic
5. Quarterly review e update

#### Testing & Validation

**llms.txt:**
```bash
# Check accessibility
curl https://yoursite.com/llms.txt

# Check HTTP status (should be 200 OK)
curl -I https://yoursite.com/llms.txt
```

**AI Tools Testing:**
- **Andi Search:** Paste URL, check "Summarize" option
- **Firecrawl:** Test como AI agents veem seu site
- **Manual LLM:** Paste llms.txt em ChatGPT, perguntar "What is this site about?"

**Monitoring Crawlers:**
```bash
# Identify AI crawlers
tail -f /var/log/nginx/access.log | grep -E "GPTBot|ClaudeBot|PerplexityBot"

# Monitor llms.txt requests
grep "llms.txt" access.log | wc -l
```

#### Comparação de Arquivos AI

| Arquivo | Propósito | Status (Out/2025) | Prioridade |
|---------|-----------|--------|-----------|
| **llms.txt** | Guiar LLMs ao conteúdo importante | Adoção limitada (~1k sites) | ⭐⭐ Considerar como hedge |
| **llms-full.txt** | Fornecer conteúdo completo | Experimental | ⭐⭐ Considerar |
| **ai.txt** | Controle granular de ações AI | Experimental | ⭐ Monitorar evolução |
| **tdmrep.json** | Reservar direitos TDM/training | W3C Standard (adotado) | ⭐⭐⭐⭐ Implementar se UE |

## Workflow de Otimização Completa

### Fase 1: Auditoria e Análise
Executar audit técnico completo, análise Core Web Vitals, keyword research, competitor analysis, content gap analysis, backlink profile audit.

### Fase 2: Technical SEO
Fix Core Web Vitals issues, mobile optimization, HTTPS implementation, XML sitemap optimization, robots.txt configuration, internal linking structure, schema markup implementation, canonical tags setup.

### Fase 3: Content Optimization
E-E-A-T improvement, topic cluster creation, answer-first content structure, semantic keyword integration, FAQ sections addition, question-based headers, content refresh (6 meses), multimedia integration.

### Fase 4: Off-Page SEO
Link building campaign, Digital PR outreach, HARO responses, guest posting, social media amplification, brand mentions monitoring, influencer partnerships.

### Fase 5: AEO/GEO Optimization
AI Overview targeting, featured snippet optimization, voice search optimization, video SEO implementation, entity-based SEO, local SEO (se aplicável), SERP features targeting.

### Fase 6: AI Files Implementation
llms.txt creation, robots.txt AI configuration, llms-full.txt (opcional), TDMRep setup (se aplicável), AI crawler management.

### Fase 7: Monitoring & Iteration
Google Search Console tracking, Google Analytics 4 setup, rank tracking (daily/weekly), Core Web Vitals monitoring, backlink monitoring, AI citations tracking, llms.txt fetch rate, quarterly content refresh, monthly performance reports.

## Métricas-Chave para Acompanhar

**Traffic & Engagement:**
- Organic traffic (usuários e sessões)
- Click-through rate (CTR)
- Bounce rate, Time on page, Pages per session
- Conversion rate

**Technical:**
- Core Web Vitals scores (LCP, INP, CLS)
- Mobile usability score
- Page speed (desktop/mobile)
- Crawl errors, Index coverage

**Rankings:**
- Keyword rankings (posições)
- Featured snippet wins
- SERP feature appearances
- Voice search visibility
- AI Overview citations

**Authority:**
- Domain Authority (DA), Page Authority (PA)
- Backlink profile (quantidade e qualidade)
- Referring domains
- Brand mentions (linked/unlinked)

**AI Visibility:**
- llms.txt fetch rate
- AI crawler visit frequency
- Citation count em AI responses (ChatGPT, Perplexity, Claude)
- AI Overview appearance rate
- Referral traffic de AI platforms

## Ferramentas Essenciais

**Content Optimization:** Surfer SEO, Clearscope, MarketMuse, Frase
**Keyword Research:** Ahrefs, SEMrush, Google Keyword Planner, Answer The Public
**Technical SEO:** Google Search Console, Screaming Frog, PageSpeed Insights, Schema Markup Validator
**Analytics:** Google Analytics 4, Google Tag Manager, Hotjar, Microsoft Clarity
**Link Building:** Ahrefs, Moz Link Explorer, BuzzStream, HARO
**AI Optimization & Monitoring (2025):**
- **Goodie** - AI visibility tracking
- **Firecrawl** - Test como AI agents veem seu site
- **Andi Search** - Test AI accessibility
- **Pageradar.io** - AI User Agents monitoring
- **Momentic Marketing** - AI crawler tracking e analytics
- **GenRank** - GEO-specific optimization
- **OmniSEO** - AI citations tracking

## Tendências 2025 e Futuro (Validadas - Outubro 2025)

### Tendências Confirmadas em 2025:

1. **The Great Decoupling** - AI Overviews reduzem CTR em 30%+ mesmo com visibilidade aumentando. Desacoplamento entre impressões e clicks.

2. **Reddit & Forum Content Dominance** - Reddit se tornou 3º site mais visível no Google (August 2025 core update). Google priorizando conteúdo de fóruns e discussões reais.

3. **Zero-Click Searches Acelerado** - Google AI Overviews com 1.5 bilhões usuários/mês (Q1 2025). ChatGPT Search com 10M+ queries/dia. Respostas diretas dominando SERPs.

4. **Brand Signals Critical** - Branded searches = 44% das queries Google. Brand mentions e E-E-A-T mais importantes que backlinks tradicionais.

5. **AI-Powered Search Dominance** - ChatGPT ultrapassou Bing em visitantes diários (2024). IA cada vez mais presente nos resultados.

6. **E-E-A-T Obrigatório** - Google June 2025 Core Update reforçou: conteúdo expert-led ganhou, thin content perdeu massivamente (especialmente health, finance, e-commerce).

7. **Entity-Based SEO** - Entidades e relacionamentos de conceitos mais importantes que keywords exatas. Semantic optimization essencial.

8. **Mobile-First Non-Negotiable** - Mobile não é opção, é obrigatório para qualquer visibilidade.

9. **Voice Search & Conversational Queries** - Crescimento contínuo de busca por voz e queries em linguagem natural.

10. **Video Content Priority** - Vídeo como formato prioritário, especialmente para featured snippets.

11. **Local SEO Enhanced** - SEO local mais sofisticado com Google Business Profile crítico.

12. **Programmatic SEO at Scale** - Automação e escala de otimização para sites grandes.

### Tendências Controversas/Monitorar:

13. **llms.txt - Status Incerto** - Adoção limitada (~1k sites). Nenhuma grande plataforma AI parseia oficialmente ainda. Monitorar evolução mas não priorizar.

14. **AI-First Indexing** - Google e outros começando a priorizar conteúdo AI-readable, mas ainda em early stages.

### Estatísticas-Chave 2025:
- **AI Overviews:** 1.5B usuários mensais (Q1 2025)
- **ChatGPT Search:** 10M+ queries/dia (ultrapassou Bing)
- **CTR Impact:** -30% em queries com AI Overviews
- **GPTBot Growth:** 5% → 30% market share (2024-2025)
- **Branded Searches:** 44% de todas queries Google
- **Reddit Visibility:** 3º site mais visível (August 2025)

## Recursos Adicionais

Para informações detalhadas e referências completas, consultar:
- `references/technical-seo-guide.md` - Guia técnico detalhado
- `references/content-optimization-guide.md` - Estratégias de conteúdo
- `references/schema-markup-examples.md` - Exemplos de schema
- `references/aeo-geo-strategies.md` - Táticas AEO e GEO
- `references/llms-txt-detailed-guide.md` - Guia completo de llms.txt e AI files
- `references/seo_aeo_geo_data.json` - Dados estruturados completos

## Conclusão

Esta skill fornece framework completo para dominar SEO, AEO, GEO e AI Optimization Files em 2025. Usar como guia de referência para implementar estratégias de otimização que funcionam tanto para mecanismos de busca tradicionais quanto para plataformas de IA emergentes.

**Princípio fundamental:** Otimizar para humanos primeiro, mecanismos de busca segundo.

**Prioridades de Implementação:**
1. Technical SEO (foundation)
2. Content Optimization (valor)
3. llms.txt (AI visibility)
4. Schema Markup (rich results)
5. TDMRep (proteção legal, se aplicável)

Lembrar: llms.txt e arquivos AI são o futuro do SEO. Implementar agora dá vantagem competitiva antes que se tornem padrão universal.