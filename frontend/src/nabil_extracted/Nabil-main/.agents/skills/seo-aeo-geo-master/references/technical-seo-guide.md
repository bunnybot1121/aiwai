# Technical SEO Guide - Referência Completa

## Core Web Vitals 2025

### LCP - Largest Contentful Paint
**Target: ≤ 2.5 segundos**

O que mede: Tempo para carregar o maior elemento visível da página.

**Como melhorar:**
- Otimize imagens (WebP, lazy loading, responsive images)
- Use CDN para servir assets
- Minimize CSS/JS crítico
- Implemente caching efetivo
- Use preload para recursos importantes
- Otimize servidor e hosting
- Reduza tempo de resposta do servidor

### INP - Interaction to Next Paint
**Target: ≤ 200 milissegundos**

O que mede: Tempo de resposta a interações do usuário (substitui FID).

**Como melhorar:**
- Minimize JavaScript de longa execução
- Use Web Workers para tarefas pesadas
- Otimize event handlers
- Reduza main thread blocking
- Split code (code splitting)
- Defer non-critical JavaScript
- Use requestIdleCallback

### CLS - Cumulative Layout Shift
**Target: ≤ 0.1**

O que mede: Estabilidade visual - mudanças inesperadas no layout.

**Como melhorar:**
- Defina dimensões para imagens e vídeos
- Reserve espaço para ads e embeds
- Evite inserir conteúdo acima do existente
- Use transform animations (não top/left)
- Carregue web fonts corretamente (font-display)
- Evite flash of unstyled content (FOUC)

## Mobile-First Indexing

Google usa versão mobile do seu site para indexação e ranking.

**Checklist:**
- ✅ Design responsivo (não mobile separado)
- ✅ Mesma conteúdo em mobile e desktop
- ✅ Structured data em ambas versões
- ✅ Meta tags idênticas
- ✅ Imagens otimizadas para mobile
- ✅ Teste com Google Mobile-Friendly Test
- ✅ Viewport meta tag configurada
- ✅ Touch targets adequados (mínimo 48x48px)
- ✅ Evite pop-ups intrusivos em mobile

## HTTPS e Segurança

**Por que é crítico:**
- Fator de ranking do Google
- Necessário para HTTP/2 e HTTP/3
- Confiança do usuário
- Segurança de dados

**Implementação:**
1. Obter certificado SSL (Let's Encrypt gratuito)
2. Instalar no servidor
3. Redirecionar HTTP para HTTPS (301)
4. Atualizar internal links para HTTPS
5. Atualizar canonical tags
6. Submeter sitemap HTTPS no Search Console
7. Testar com SSL Checker

## XML Sitemap

**O que incluir:**
- Todas URLs indexáveis
- Última modificação (lastmod)
- Frequência de mudança (changefreq)
- Prioridade (priority)

**O que excluir:**
- URLs com noindex
- Redirects
- URLs canônicas alternativas
- URLs de paginação (pode usar)
- URLs com parâmetros

**Formato:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://example.com/page</loc>
    <lastmod>2025-01-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Sitemaps Especializados:**
- Sitemap de vídeos
- Sitemap de imagens
- Sitemap de notícias
- Sitemap index (para sites grandes)

## Robots.txt

**Funções:**
- Controlar crawling de bots
- Prevenir sobrecarga do servidor
- Ocultar arquivos sensíveis
- Especificar localização do sitemap

**Exemplo:**
```
User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/

User-agent: Googlebot
Disallow: /temp/

Sitemap: https://example.com/sitemap.xml
```

**Boas práticas:**
- Não usar para conteúdo sensível (use noindex)
- Testar com Google Robots.txt Tester
- Permitir CSS e JS para rendering
- Especificar sitemap location

## URL Structure

**URLs SEO-friendly:**
- ✅ Curtas e descritivas
- ✅ Incluem keyword alvo
- ✅ Usam hífens (não underscores)
- ✅ Lowercase apenas
- ✅ Sem parâmetros desnecessários
- ✅ Estrutura hierárquica lógica

**Bom:** `example.com/blog/seo-guide-2025`
**Ruim:** `example.com/page?id=123&cat=4`

## Internal Linking Strategy

**Benefícios:**
- Distribui link equity (PageRank)
- Ajuda crawling e indexação
- Melhora experiência do usuário
- Estabelece hierarquia de informação
- Define topical authority

**Melhores práticas:**
- Use anchor text descritivo (não "clique aqui")
- Link para conteúdo relevante
- Mantenha links contextual (dentro do conteúdo)
- Use hierarquia (pillar → cluster)
- Evite orphan pages (páginas sem links internos)
- Limite links por página (max ~100)
- Use breadcrumbs para navegação

## Canonical Tags

Previne conteúdo duplicado especificando versão preferida.

**Quando usar:**
- Variações de URL (HTTP/HTTPS, www/non-www)
- URLs com parâmetros
- Paginação
- Versões print/mobile
- Conteúdo sindicado

**Implementação:**
```html
<link rel="canonical" href="https://example.com/original-page" />
```

## Hreflang (Sites Multilíngues)

Especifica idioma e região de páginas alternativas.

**Formato:**
```html
<link rel="alternate" hreflang="en" href="https://example.com/en/" />
<link rel="alternate" hreflang="pt-BR" href="https://example.com/pt-br/" />
<link rel="alternate" hreflang="es" href="https://example.com/es/" />
<link rel="alternate" hreflang="x-default" href="https://example.com/" />
```

## Redirects

**301 Redirect:** Permanente (passa 90-99% do link equity)
**302 Redirect:** Temporário (não passa link equity)

**Quando usar 301:**
- Migração de domínio
- Mudança permanente de URL
- Consolidação de conteúdo duplicado
- HTTP → HTTPS

**Como implementar:**
- .htaccess (Apache)
- nginx.conf (Nginx)
- Plugins (WordPress)
- Cloudflare Rules

## Error Pages

**404 Errors:**
- Página customizada e útil
- Links para páginas principais
- Search box
- Reportar no Search Console

**500 Errors:**
- Indica problemas de servidor
- Impacto negativo em SEO
- Monitorar e corrigir rapidamente

## Crawl Budget Optimization

Para sites grandes (10.000+ páginas).

**Como otimizar:**
- Remover páginas de baixo valor
- Consolidar conteúdo duplicado
- Usar noindex para páginas thin
- Otimizar velocidade do servidor
- Corrigir redirect chains
- Limpar soft 404s
- Priorizar páginas importantes no sitemap

## JavaScript SEO

**Desafios:**
- Client-side rendering pode não ser indexado
- Recursos bloqueados por robots.txt
- Conteúdo carregado após JavaScript não é visto

**Soluções:**
- Server-side rendering (SSR)
- Static site generation (SSG)
- Dynamic rendering para bots
- Prerendering
- Teste com Search Console URL Inspection
- Evite JavaScript crítico para conteúdo

## Structured Data Testing

**Ferramentas:**
- Google Rich Results Test
- Schema Markup Validator
- Google Search Console (Enhancement reports)

**Processo:**
1. Implementar schema markup
2. Testar com validador
3. Corrigir warnings e erros
4. Submit para indexação
5. Monitorar no Search Console
6. Verificar aparição em SERPs

## Log File Analysis

**O que analisar:**
- Quais páginas são crawladas
- Frequência de crawl
- Bots que visitam o site
- Status codes retornados
- Crawl budget usage

**Ferramentas:**
- Screaming Frog Log Analyzer
- Botify
- OnCrawl
- Google Search Console

## Checklist de Auditoria Técnica

**Crawling & Indexing:**
- [ ] Robots.txt otimizado
- [ ] XML sitemap atualizado
- [ ] Sem blocked resources
- [ ] Canonical tags corretos
- [ ] Sem redirect chains
- [ ] 404s gerenciados

**Performance:**
- [ ] Core Web Vitals passing
- [ ] Mobile optimization
- [ ] Image optimization
- [ ] CSS/JS minification
- [ ] Browser caching
- [ ] CDN implementation

**Security:**
- [ ] HTTPS implementado
- [ ] SSL certificate válido
- [ ] HSTS enabled
- [ ] Sem mixed content
- [ ] Security headers

**Structure:**
- [ ] URL structure clean
- [ ] Internal linking logical
- [ ] Breadcrumbs implemented
- [ ] Pagination handled
- [ ] Hreflang (se multilíngue)

**Schema:**
- [ ] Relevant schema types
- [ ] No validation errors
- [ ] Tested in validators
- [ ] Monitoring in GSC

Este guia cobre os fundamentos técnicos essenciais. Para troubleshooting específico, consulte documentação oficial do Google Search Central.
