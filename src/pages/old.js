import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'
import { MDXRenderer } from 'gatsby-plugin-mdx'

export const query = graphql`
  query IndexQuery {
    allMdx(sort: { fields: [fileAbsolutePath], order: DESC }) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
            year
          }
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
        }
      }
    }
  }
`

export default ({ data }) => {
  return (
    <Layout title="Blog">
      {data.allMdx.edges.map(({ node }, idx) => (
        <div className="post" key={idx}>
          <Link to={node.fields.slug}>
            <h3 className="post-title">
              {node.frontmatter.title} ({node.fields.year})
            </h3>
          </Link>
          <span className="post-date">{node.frontmatter.date}</span>
          {/* For some reason, the excerpt is not HTML with mdx. Oh well. */}
          <p>{node.excerpt}</p>
        </div>
      ))}
      <p>
        Conversion of old Jekyll posts was based on{' '}
        <a href="https://web.archive.org/web/20171212143144/http://unlikenesses.com/2017-11-06-migrating-blog-to-gatsby/">
          this tutorial
        </a>
      </p>
    </Layout>
  )
}
