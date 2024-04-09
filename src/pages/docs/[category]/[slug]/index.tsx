import { useEffect, useState } from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import Head from "next/head";
import MetaInfo from "@/components/(docs)/(category)/(slug)/MetaInfo";
import DocsContent from "@/components/(docs)/(category)/(slug)/DocsContent";
import Authors from "@/components/(docs)/(category)/(slug)/Authors";
import DocsFooter from "@/components/(docs)/(category)/(slug)/DocsFooter";
import TableOfContents from "@/components/(docs)/(category)/(slug)/TableOfContent";
import { getViewCount, incrementViewCount } from "../../../../lib/ViewsData";
import langCPP from "highlight.js/lib/languages/cpp";
import "highlight.js/styles/github-dark.css";

const languages = { cpp: langCPP };

interface Frontmatter {
    title: string;
    description: string;
    readTime: number;
    category: string;
    authors: string[];
}

interface DocsPageProps {
    frontMatter: Frontmatter & { slug: string };
    mdxSource: {
        compiledSource: string;
        renderedOutput: string;
        scope: Record<string, unknown>;
        frontmatter: unknown;
    };
    prevLink: string;
    nextLink: string;
}

interface Heading {
    id: string;
    text: string;
    top: number;
    type: string;
}

const DocsPage: React.FC<DocsPageProps> = ({ frontMatter, mdxSource, prevLink, nextLink, }) => {
    const { slug, title, description, readTime, authors } = frontMatter;
    const [viewCount, setViewCount] = useState<number | null>(null);
    const [headings, setHeadings] = useState<Heading[]>([]);

    useEffect(() => {
        const fetchViewCount = async () => {
            try {
                await incrementViewCount(slug);
                setViewCount(await getViewCount(slug));
            } catch (error) {
                console.error("Error getting view count:", error);
            }
        };
        fetchViewCount();
    }, [slug]);

    useEffect(() => {
        const headings: Heading[] = Array.from(
            document.querySelectorAll<HTMLElement>('h2, h3')
        ).map((heading) => ({
            id: heading.id,
            text: heading.textContent || "",
            top: heading.offsetTop,
            type: heading.tagName.toLowerCase(),
        }));
        setHeadings(headings);
    }, []);


    return (
        <div className="w-full">
            <div className="w-full">
                <TableOfContents headings={headings} />
            </div>
            <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto my-10">
                <Head>
                    <title>CPPVault</title>
                    <meta name="og:title" content={`CPPVault // ${title}`} />
                    <meta name="og:description" content={`${description}`} />
                </Head>
                <div className="py-28 text-center">
                    <MetaInfo readTime={readTime} viewCount={viewCount} />
                    <h1 className="text-6xl font-bold text-zinc-100 mb-4">{title}</h1>
                    <p className="text-xl text-zinc-400">{description}</p>
                </div>
                <hr className="mt-8 mb-4" />
                <DocsContent mdxSource={mdxSource} />
                <Authors authors={authors} />
                <DocsFooter prevLink={prevLink} nextLink={nextLink} />
            </div>
        </div>
    );
};

export async function getStaticPaths() {
    const docsDirectory = path.join(process.cwd(), "src", "docs");
    const docs = fs.readdirSync(docsDirectory);

    const paths = docs.map(doc => {
        const fileName = doc.replace(/\.mdx$/, "");
        const filePath = path.join(docsDirectory, doc);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);

        const category = encodeURIComponent(data.category || "Uncategorized");
        return { params: { category, slug: fileName } };
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { category: string; slug: string } }) {
    const { category, slug } = params;
    const docsDirectory = path.join(process.cwd(), "src", "docs");
    const docs = fs.readdirSync(docsDirectory);
    const docsInCategory = docs.filter((doc) => {
        const filePath = path.join(docsDirectory, doc);
        const fileContent = fs.readFileSync(filePath, "utf-8");
        const { data } = matter(fileContent);
        return encodeURIComponent(data.category || "Uncategorized") === category;
    });

    const currentIndex = docsInCategory.findIndex(doc => doc.replace(/\.mdx$/, "") === slug);
    const prevSlug = currentIndex > 0 ? docsInCategory[currentIndex - 1].replace(/\.mdx$/, "") : null;
    const nextSlug = currentIndex < docsInCategory.length - 1 ? docsInCategory[currentIndex + 1].replace(/\.mdx$/, "") : null;
    const prevLink = prevSlug ? `/docs/${category}/${prevSlug}` : null;
    const nextLink = nextSlug ? `/docs/${category}/${nextSlug}` : null;

    const filePath = path.join(process.cwd(), "src", "docs", `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data: frontMatter, content } = matter(fileContent);

    const mdxSource = await serialize(content, {
        mdxOptions: {
            rehypePlugins: [[rehypeHighlight, {
                ignoreMissing: true,
                languages,
                aliases: {}
            }]] as any
        },
    });

    return { props: { frontMatter: { ...frontMatter, slug }, mdxSource, prevLink, nextLink } };
}

export default DocsPage;