# Crawl Budget Management | Google Crawling Infrastructure

# Optimize your crawl budget


This guide describes how to optimize Google's crawling of very large and frequently updated sites.


If your site doesn't have a large number of pages that change rapidly, or if your pages seem
to be crawled the same day that they are published, you don't need to read this guide. For Google
Search specifically, merely
[keeping your sitemap up to date](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap) and
[checking your index coverage](https://support.google.com/webmasters/answer/7440203)
regularly is adequate.

## Who this guide is for

While the recommendations in this guide are generally good practices, this is an advanced guide intended primarily for the following types of sites:

- Large sites (1 million+ unique pages) with content that changes moderately often (once a week)
- Medium or larger sites (10,000+ unique pages) with very rapidly changing content (daily)
- Sites with a large portion of their total URLs classified by Search Console as [Discovered - currently not indexed](https://support.google.com/webmasters/answer/7440203#information-status)

> [!NOTE]
> The numbers given here are a **rough estimate** to help you classify your site. These are not exact thresholds.

## General theory of crawling

[Video](https://www.youtube.com/watch?v=am4g0hXAA8Q)

The web is a nearly infinite space, exceeding Google's ability to explore and index every
available URL. As a result, there are limits to how much time Google's crawlers can spend crawling any
single site, where a site is defined by the hostname. For example, `https://www.example.com/`
and `https://code.example.com/` are two different hostnames, and therefore have
separate crawl budgets. The amount of time and resources that Google devotes to crawling a site is
commonly called the site's *crawl budget* and it's determined by two main elements: *crawl capacity limit* and *crawl demand*.

> [!NOTE]
> For Google Search, not every page that is crawled will necessarily be indexed. After crawling, each page must be evaluated, [consolidated](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls), and assessed to determine its suitability for the index.

### Crawl capacity limit

Google wants to crawl your site without overwhelming your servers. To prevent this,
Google's crawlers calculate a *crawl capacity limit*, which is the maximum number of
simultaneous parallel connections that Google can use to crawl a site, as well as the time
delay between fetches. This is calculated to provide coverage of all your important content
without overloading your servers.

The crawl capacity limit can go up and down based on a few factors:

- **Crawl health:** If the site responds quickly for a while, the limit goes up, meaning more connections can be used to crawl. If the site slows down or responds with server errors, the limit goes down and Google crawls less.
- **Google's crawling limits**: Google has a lot of machines, but not infinite machines. We still need to make choices with the resources that we have.

### Crawl demand

Each crawler has its own "demand" when it comes to crawling the web. For example, AdsBot
generally has a higher demand when a site is running dynamic ad targets, Google Shopping has a
higher demand for products you have in your merchant feeds, and Googlebot's demand varies based
on a site's size, update frequency, page quality, and relevance, compared to other sites.

In general, the factors that play a significant role in determining crawl demand are:

- **Perceived inventory:** Without guidance from you, Google tries to crawl all or most of the URLs that it knows about on your site. If many of these URLs are duplicates, or you don't want them crawled for some other reason (removed, unimportant, and so on), this wastes a lot of Google crawling time on your site. This is the factor that you can positively control the most.
- **Popularity:** URLs that are more popular on the Internet tend to be crawled more often to keep them fresher in our systems.
- **Staleness:** Our systems want to recrawl documents frequently enough to pick up any changes.

Additionally, site-wide events like site moves may trigger an increase in crawl demand in
order to reprocess the content under the new URLs.

### In sum

Taking crawl capacity and crawl demand together, Google defines a site's crawl budget as the
set of URLs that Google can and wants to crawl. Even if the crawl capacity limit isn't
reached, if crawl demand is low, Google will crawl your site less.

## Best practices

To maximize your crawling efficiency, follow these best practices:

- **Manage your URL inventory:** Use the appropriate tools to tell Google which pages to crawl and which not to crawl. If Google spends too much time crawling URLs that it shouldn't, Google's crawlers might decide that it's not worth the time to look at the rest of your site (or increase your budget to do so).
  - **[Consolidate duplicate content](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).** Eliminate duplicate content to focus crawling on unique content rather than unique URLs.
  - [**Block crawling of URLs using robots.txt**.](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#hide_urls) Some pages might be important to users, but you don't necessarily want them to appear on Google surfaces or get reprocessed by Google's systems. For example, infinite scrolling pages that duplicate information on linked pages, or differently sorted versions of the same page. If you can't consolidate them as described in the first bullet, block these unimportant pages using [robots.txt](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt). Blocking URLs with robots.txt prevents Google from crawling them, and significantly decreases the chance the URLs will be processed by other Google systems (such as getting indexed by Google Search).

    > [!CAUTION]
    > **Don't use `noindex`** , as Google will still request, but then drop the page when it sees a `noindex` `meta` tag or header in the HTTP response, wasting crawling time. **Don't use robots.txt to temporarily reallocate crawl budget** for other pages; use robots.txt to block pages or resources that you don't want Google to crawl at all. Google won't shift this newly available crawl budget to other pages unless Google is already hitting your site's serving limit.

  - **Return a `404` or `410` status code for permanently removed pages.** Google won't forget a URL that it knows about, but a `404` status code is a strong signal not to crawl that URL again. Blocked URLs, however, will stay part of your crawl queue much longer, and will be recrawled when the block is removed.
  - **[Eliminate `soft
    404` errors](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#soft-404-errors).** `soft 404` pages will continue to be crawled, and waste your budget. Check the [Index
    Coverage report](https://support.google.com/webmasters/answer/7440203) for `soft 404` errors.
  - **Keep your sitemaps up to date.** Google reads your sitemap regularly, so be sure to include all the content that you want Google to crawl. If your site includes updated content, we recommend including the `<lastmod>` tag.
  - **Avoid long redirect chains**, which have a negative effect on crawling.
- **[Make your pages efficient to load](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#improve_crawl_efficiency).** If Google can load and render your pages faster, we might be able to read more content from your site.
- **[Debug issues with crawl budget](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors).** Check whether your site had any availability issues during crawling, and look for ways to make your crawling more efficient.

## How do I get more crawl budget?

There are two ways to increase crawl budget:

- **Add more server resources** : If your site can't be crawled because of server capacity on your end (for example, you're getting [**Hostload exceeded**](https://support.google.com/webmasters/answer/9012289#live_indexable&zippy=%2Cadditional-response-data%2Curl-status-live-test%2Csite-wide-availability-issues%2Cavailability-live-test) in the URL inspection tool), add more server resources if that makes sense for your business.
- **Optimize your content's quality for the Google product you're targeting**: Google determines the crawling resources allocated to each site by factoring in elements that are relevant to the specific Google product. For example, for Google Search, this includes things like popularity, overall user value, content uniqueness, and serving capacity.