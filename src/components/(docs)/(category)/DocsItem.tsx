import Link from 'next/link';

interface DocsItemProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    viewCount: number;
    img: string;
    category: string;
}

const DocsItem: React.FC<DocsItemProps> = ({ slug, title, date, description, viewCount, img, category }) => (
    <div className="group relative">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
        <div className='relative rounded-lg bg-black px-7 py-4 text-white'>
            <Link href={`/docs/${encodeURIComponent(category)}/${slug}`} passHref className='w-full flex flex-col'>
                <div className='w-full flex justify-between mb-2'>
                    <span className='text-zinc-400 text-sm'>{date}</span>
                    <span className='text-zinc-400 text-sm'>{viewCount} views</span>
                </div>
                <span className='text-xl font-bold'>{title}</span>
                <span className='text-zinc-400'>{description}</span>
            </Link>
        </div>
    </div>
);

export default DocsItem;