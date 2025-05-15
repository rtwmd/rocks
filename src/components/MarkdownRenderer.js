import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'

// Custom plugin to extract id and class from markdown elements
const remarkCustomAttributes = () => {
  return (tree) => {
    visit(tree, ['heading', 'paragraph', 'image'], (node, index, parent) => {
      if (node.type === 'image') {
        // Extract id and class from the image's title attribute
        if (node.title) {
          const match = node.title.match(/\s*\{#?([\w-]*)?\s*(\.[\w\s.-]+)?\}$/)
          if (match) {
            node.title = node.title.replace(match[0], '').trim() // Remove attributes from title

            if (!node.data) node.data = {}
            if (!node.data.hProperties) node.data.hProperties = {}

            if (match[1]) {
              node.data.hProperties.id = match[1] // Set id
            }
            if (match[2]) {
              node.data.hProperties.className = match[2]
                .trim()
                .replace(/\./g, ' ') // Set class
            }
          }
        }
      } else if (node.children && node.children.length > 0) {
        const lastChild = node.children[node.children.length - 1]

        if (lastChild.type === 'text') {
          const match = lastChild.value.match(
            /\s*\{#?([\w-]*)?\s*(\.[\w\s.-]+)?\}$/
          )
          if (match) {
            const text = lastChild.value.replace(match[0], '').trim()
            lastChild.value = text // Remove the attribute part from visible text

            if (!node.data) node.data = {}
            if (!node.data.hProperties) node.data.hProperties = {}

            if (match[1]) {
              node.data.hProperties.id = match[1] // Set id
            }
            if (match[2]) {
              node.data.hProperties.className = match[2]
                .trim()
                .replace(/\./g, ' ') // Set class
            }
          }
        }
      }
    })
  }
}

export default function MarkdownRenderer({ file }) {
  const [markdown, setMarkdown] = useState('')

  useEffect(() => {
    fetch(file)
      .then((response) => response.text())
      .then((text) => setMarkdown(text))
  }, [file])

  return (
    <ReactMarkdown
      className="reactMarkdown"
      remarkPlugins={[remarkParse, remarkGfm, remarkCustomAttributes]}
      rehypePlugins={[rehypeRaw]}
      components={{
        h1: ({ node, children, ...props }) => (
          <h1
            {...props}
            id={node.properties?.id}
            className={node.properties?.className}
          >
            {children}
          </h1>
        ),
        h2: ({ node, children, ...props }) => (
          <h2
            {...props}
            id={node.properties?.id}
            className={node.properties?.className}
          >
            {children}
          </h2>
        ),
        h3: ({ node, children, ...props }) => (
          <h3
            {...props}
            id={node.properties?.id}
            className={node.properties?.className}
          >
            {children}
          </h3>
        ),
        h4: ({ node, children, ...props }) => (
          <h4
            {...props}
            id={node.properties?.id}
            className={node.properties?.className}
          >
            {children}
          </h4>
        ),
        h5: ({ node, children, ...props }) => (
          <h5
            {...props}
            id={node.properties?.id}
            className={node.properties?.className}
          >
            {children}
          </h5>
        ),
        h6: ({ node, children, ...props }) => (
          <h6
            {...props}
            id={node.properties?.id}
            className={node.properties?.className}
          >
            {children}
          </h6>
        ),
        p: ({ node, children, ...props }) => (
          <p
            {...props}
            id={node.properties?.id}
            className={node.properties?.className}
          >
            {children}
          </p>
        ),
        img: ({ node, ...props }) => (
          <img
            {...props}
            id={node.properties?.id}
            className={node.properties?.className}
          />
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  )
}
