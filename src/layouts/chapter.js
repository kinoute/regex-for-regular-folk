import React from "react";
import { MDXProvider } from "@mdx-js/react";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { graphql } from "gatsby";
import Example from "../components/example";
import { Note, Warning, Tip, Support } from "../components/boxes";
import SEO from "../components/seo";
import * as meta from "../../meta.json";

const shortcodes = { Example, Note, Warning, Tip, Support };

export default (props) => {
    const { mdx } = props.data;
    const { title } = mdx.frontmatter;
    const { excerpt } = mdx;

    const slugifiedTitle = mdx.fields.slug.split("/")[1];

    const prevIndex = meta.chapters.indexOf(slugifiedTitle) - 1;
    const nextIndex = meta.chapters.indexOf(slugifiedTitle) + 1;

    const prev = prevIndex >= 0 ? meta.chapters[prevIndex] : undefined;
    const next =
        nextIndex < meta.chapters.length ? meta.chapters[nextIndex] : undefined;

    let prevItem = <></>;
    let nextItem = <></>;

    if (prev !== undefined) {
        prevItem = (
            <li>
                <a href={`/chapters/${prev}`}>Previous</a>
            </li>
        );
    }

    if (next !== undefined) {
        nextItem = (
            <li>
                <a href={`/chapters/${next}`}>Next</a>
            </li>
        );
    }

    return (
        <>
            <SEO title={title} description={excerpt} />

            <header>
                <a href="/" className="title">
                    Regular Expressions For Regular Folk
                </a>
            </header>

            <main>
                <article>
                    <h1>{title}</h1>

                    <MDXProvider components={shortcodes}>
                        <MDXRenderer>{mdx.body}</MDXRenderer>
                    </MDXProvider>
                </article>

                <nav>
                    <ul>
                        {prevItem} {nextItem}
                    </ul>
                </nav>
            </main>

            <footer>
                <ul>
                    <li>
                        <a href="https://github.com/shreyasminocha/regex-for-regular-folk">
                            Source Code
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/shreyasminocha/regex-for-regular-folk#license">
                            <code>CC-BY-SA 4.0</code>*
                        </a>
                    </li>

                    <li>
                        <a href="https://shreyasminocha.me">Shreyas Minocha</a>
                    </li>
                </ul>
            </footer>
        </>
    );
};

export const query = graphql`
    query($id: String!) {
        mdx(fields: { id: { eq: $id } }) {
            frontmatter {
                title
            }
            excerpt
            body
            id
            fields {
                slug
            }
        }
    }
`;
