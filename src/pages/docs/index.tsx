import { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getViewCount } from '../../lib/ViewsData';
import DocsPageHeader from '@/components/(docs)/DocsPageHeader';
import DocsList from '@/components/(docs)/DocsList';

interface Frontmatter {
    title: string;
    date: string;
    description: string;
    readTime: number;
    img: string;
}

interface Docs {
    slug: string;
    frontmatter: Frontmatter;
}

const Blog: React.FC<{ docs: Docs[] }> = ({ docs }) => {
    const [viewCounts, setViewCounts] = useState<{ [key: string]: number }>({});

    const docsByYear: { [year: string]: Docs[] } = docs.reduce((acc, docs) => {
        const year = docs.frontmatter.date.slice(-4);
        acc[year] = [...(acc[year] || []), docs];
        return acc;
    }, {});

    useEffect(() => {
        const fetchViewCounts = async () => {
            const counts = await Promise.all(docs.map(({ slug }) => getViewCount(slug)));
            setViewCounts(Object.fromEntries(docs.map((docs, i) => [docs.slug, counts[i]])));
        };

        fetchViewCounts();
    }, [docs]);

    return (
        <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto'>
            <DocsPageHeader />
            {Object.entries(docsByYear).map(([year, yeardocs]) => (
                <div key={year}>
                    <DocsList docs={yeardocs} viewCounts={viewCounts} />
                </div>
            ))}

        </div>
    );
};

export async function getStaticProps() {
    const docs = fs.readdirSync(path.join(process.cwd(), 'src', 'docs')).map((fileName) => {
        const filePath = path.join(process.cwd(), 'src', 'docs', fileName);
        const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

        return {
            slug: fileName.replace(/\.mdx$/, ''),
            frontmatter: {
                title: data.title || '',
                date: data.date || '',
                description: data.description || '',
                readTime: data.readTime || 0,
                img: data.img || '',
            },
        };
    });

    docs.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

    return { props: { docs } };
}

export default Blog;