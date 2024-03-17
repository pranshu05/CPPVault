import Link from 'next/link';

interface DocsItemProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    viewCount: number;
    img: string;
}

const DocsItem: React.FC<DocsItemProps> = ({ slug, title, date, description, viewCount, img }) => (
    <Link href={`/docs/${slug}`} passHref className='flex flex-col rounded-lg border border-neutral-700 p-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:bg-neutral-800/30'>
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