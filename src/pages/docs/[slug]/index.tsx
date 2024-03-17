import { useEffect, useState } from 'react';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from 'rehype-prism';
import fs from 'fs';
import path from 'path';
import MetaInfo from '@/components/(docs)/(slug)/MetaInfo';
import DocsContent from '@/components/(docs)/(slug)/DocsContent';
import { getViewCount, incrementViewCount } from '../../../lib/ViewsData';
import matter from 'gray-matter';
import 'prism-themes/themes/prism-atom-dark.css';

interface Frontmatter {
    title: string;
    date: string;
    description: string;
    readTime: number;
    img: string;
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
    const { slug, title, date, description, readTime, img } = frontMatter;
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
                <h1 className="text-6xl font-bold text-zinc-100">{title}</h1>
                <p className="text-xl text-zinc-100">{description}</p>
            </div>
            <hr className='mt-8 mb-4' />
            <DocsContent mdxSource={mdxSource} />
        </div>
    );
};

export async function getStaticPaths() {
    const docs = path.join(process.cwd(), 'src', 'docs');
    const paths = fs.readdirSync(docs).map((fileName) => ({
        params: { slug: fileName.replace(/\.mdx$/, '') },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const filePath = path.join(process.cwd(), 'src', 'docs', `${slug}.mdx`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data: frontMatter, content } = matter(fileContent);

    const mdxSource = await serialize(content, {
        mdxOptions: { rehypePlugins: [[rehypePrism, { ignoreMissing: true, aliases: {} }] as any] },
    });

    return { props: { frontMatter: { ...frontMatter, slug }, mdxSource } };
}

export default Docs;