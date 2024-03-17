/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';

interface DocsItemProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    viewCount: number;
    img: string;
}

const DocsItem: React.FC<DocsItemProps> = ({ slug, title, date, description, viewCount, img }) => (
    <Link href={`/docs/${slug}`} passHref className='flex flex-col border border-zinc-700 rounded-md p-4'>
        <div className='w-full flex flex-col mt-2'>
            <div className='w-full flex justify-between mb-2'>
                <span className='text-zinc-400 text-sm'>{date}</span>
                <span className='text-zinc-400 text-sm'>{viewCount} views</span>
            </div>
            <span className='text-xl font-bold'>{title}</span>
            <span className='text-zinc-400'>{description}</span>
        </div>
    </Link>
)


export default DocsItem;