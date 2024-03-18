import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getViewCount } from '@/lib/ViewsData';
import DocsList from '@/components/(docs)/(category)/DocsList';

interface Frontmatter {
    title: string;
    date: string;
    description: string;
    readTime: number;
    img: string;
    category: string;
}

interface Docs {
    slug: string;
    frontmatter: Frontmatter;
}

const CategoryDocs: React.FC<{ category: string; docs: Docs[] }> = ({ category, docs }) => {
    const [viewCounts, setViewCounts] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fetchViewCounts = async () => {
            const counts = await Promise.all(docs.map(({ slug }) => getViewCount(slug)));
            setViewCounts(Object.fromEntries(docs.map((docs, i) => [docs.slug, counts[i]])));
        };

        fetchViewCounts();
    }, [docs]);

    return (
        <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto'>
            <h1 className="text-5xl font-bold text-center">{category}</h1>
            <DocsList docs={docs} viewCounts={viewCounts} />
        </div>
    );
};

export async function getStaticPaths() {
    const docs = fs.readdirSync(path.join(process.cwd(), 'src', 'docs')).map((fileName) => {
        const filePath = path.join(process.cwd(), 'src', 'docs', fileName);
        const { data } = matter(fs.readFileSync(filePath, 'utf-8'));

        return {
            slug: fileName.replace(/\.mdx$/, ''),
            category: data.category || 'Uncategorized', 
        };
    });

    const categories = Array.from(new Set(docs.map(doc => doc.category))); 

    const paths = categories.map((category) => ({
        params: { category },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { category: string } }) {
    const { category } = params;

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
                category: data.category || 'Uncategorized', 
            },
        };
    }).filter(doc => doc.frontmatter.category === category);

    docs.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

    return { props: { category, docs } };
}

export default CategoryDocs;