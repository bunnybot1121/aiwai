import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { BlogPost } from "@/lib/blog-posts"

interface SeriesNavigationProps {
  prev: BlogPost | null
  next: BlogPost | null
  position?: "top" | "bottom"
}

export function SeriesNavigation({ prev, next, position = "bottom" }: SeriesNavigationProps) {
  if (!prev && !next) return null

  if (position === "top") {
    return (
      <div className="fixed top-8 right-8 z-10 flex gap-2">
        {prev && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <Link href={`/blog/${prev.slug}`}>
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Prev</span>
            </Link>
          </Button>
        )}
        {next && (
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1"
          >
            <Link href={`/blog/${next.slug}`}>
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-12">
      {prev ? (
        <Card className="p-6 hover:border-muted-foreground/50 transition-all duration-300">
          <Link href={`/blog/${prev.slug}`} className="block space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ChevronLeft className="h-4 w-4" />
              <span>Previous Chapter</span>
            </div>
            <h3 className="font-medium hover:text-muted-foreground transition-colors">
              {prev.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{prev.excerpt}</p>
          </Link>
        </Card>
      ) : (
        <div />
      )}
      
      {next && (
        <Card className="p-6 hover:border-muted-foreground/50 transition-all duration-300">
          <Link href={`/blog/${next.slug}`} className="block space-y-2">
            <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
              <span>Next Chapter</span>
              <ChevronRight className="h-4 w-4" />
            </div>
            <h3 className="font-medium text-right hover:text-muted-foreground transition-colors">
              {next.title}
            </h3>
            <p className="text-sm text-muted-foreground text-right line-clamp-2">{next.excerpt}</p>
          </Link>
        </Card>
      )}
    </div>
  )
}
