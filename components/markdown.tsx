"use client"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeSlug from "rehype-slug"

interface MarkdownProps {
  content: string
}

export default function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeSlug]}
      className="prose prose-invert prose-headings:text-white prose-a:text-purple-400 max-w-none"
      components={{
        h1: ({ node, ...props }) => {
          const id = props.children
            ? props.children
                .toString()
                .toLowerCase()
                .replace(/[^\w\s]/g, "")
                .replace(/\s+/g, "-")
            : ""
          return <h1 id={id} {...props} />
        },
        h2: ({ node, ...props }) => {
          const id = props.children
            ? props.children
                .toString()
                .toLowerCase()
                .replace(/[^\w\s]/g, "")
                .replace(/\s+/g, "-")
            : ""
          return <h2 id={id} {...props} />
        },
        h3: ({ node, ...props }) => {
          const id = props.children
            ? props.children
                .toString()
                .toLowerCase()
                .replace(/[^\w\s]/g, "")
                .replace(/\s+/g, "-")
            : ""
          return <h3 id={id} {...props} />
        },
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
