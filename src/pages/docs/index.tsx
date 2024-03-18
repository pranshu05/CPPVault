import { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import DocsPageHeader from '@/components/(docs)/DocsPageHeader';
import CategoryList from '@/components/(docs)/CategoryList';

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

const DocsIndex: React.FC<{ categories: string[] }> = ({ categories }) => {
    return (
        <div className='w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto'>
            <DocsPageHeader />
            <CategoryList categories={categories} />
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
                category: data.category || 'Uncategorized',
            },
        };
    });

    const categories = Array.from(new Set(docs.map(doc => doc.frontmatter.category)));

    return { props: { categories } };
}

export default DocsIndex;