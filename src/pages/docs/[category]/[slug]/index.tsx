import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight';
import { useRouter } from 'next/router';

import MetaInfo from '@/components/(docs)/(category)/(slug)/MetaInfo';
import DocsContent from '@/components/(docs)/(category)/(slug)/DocsContent';
import DocsFooter from '@/components/(docs)/(category)/(slug)/DocsFooter';
import { getViewCount, incrementViewCount } from '../../../../lib/ViewsData';

import langCPP from "highlight.js/lib/languages/cpp"
import 'highlight.js/styles/github-dark.css'

export const languages = {
    cpp: langCPP,
}

interface Frontmatter {
    title: string;
    date: string;
    description: string;
    readTime: number;
    img: string;
    category: string;
}

interface DocsProps {
    frontMatter: Frontmatter & { slug: string };
    mdxSource: {
        compiledSource: string;
        renderedOutput: string;
        scope: Record<string, unknown>;
        frontmatter: unknown;
    };
}

const Docs: React.FC<DocsProps> = ({ frontMatter, mdxSource }) => {
    const { slug, title, date, description, readTime, img, category } = frontMatter;

    const [viewCount, setViewCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchViewCount = async () => {
            try {
                await incrementViewCount(slug);
                setViewCount(await getViewCount(slug));
            } catch (error) {
                console.error('Error getting view count:', error);
            }
        };

        fetchViewCount();
    }, [slug]);

    return (
        <div className="w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto">
            <div className="py-28 text-center">
                <MetaInfo date={date} readTime={readTime} viewCount={viewCount} />
                <h1 className="text-6xl font-bold text-zinc-100 mb-4">{title}</h1>
                <p className="text-xl text-zinc-400">{description}</p>
            </div>
            <hr className='mt-8 mb-4' />
            <DocsContent mdxSource={mdxSource} />
            <DocsFooter />
        </div>
    );
};

export async function getStaticPaths() {
    const docsDirectory = path.join(process.cwd(), 'src', 'docs');
    const docs = fs.readdirSync(docsDirectory);

    const paths = docs.map((doc) => {
        const fileName = doc.replace(/\.mdx$/, '');
        const filePath = path.join(docsDirectory, doc);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data } = matter(fileContent);

        const category = encodeURIComponent(data.category || 'Uncategorized');
        return {
            params: { category, slug: fileName },
        };
    });

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { category: string; slug: string } }) {
    const { category, slug } = params;
    const filePath = path.join(process.cwd(), 'src', 'docs', `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
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

    return { props: { frontMatter: { ...frontMatter, slug }, mdxSource } };
}

export default Docs;