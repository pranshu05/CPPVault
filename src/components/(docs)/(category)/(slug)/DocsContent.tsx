import { MDXRemote } from "next-mdx-remote";

interface DocsContentProps {
    mdxSource: {
        compiledSource: string;
        renderedOutput: string;
        scope: Record<string, unknown>;
        frontmatter: unknown;
    };
}

const components = {};

const DocsContent: React.FC<DocsContentProps> = ({ mdxSource }) => (
    <div className="post break-words w-full p-0 m-0">
        <MDXRemote {...mdxSource} components={components} />
    </div>
);

export default DocsContent;