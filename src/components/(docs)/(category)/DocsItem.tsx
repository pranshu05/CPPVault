import Link from 'next/link';

interface DocsItemProps {
    slug: string;
    title: string;
    description: string;
    img: string;
    category: string;
}

const DocsItem: React.FC<DocsItemProps> = ({ slug, title, description, img, category }) => (
    <div className="group relative">
        <div className="absolute -inset-[1.5px] rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
        <div className='relative rounded-lg bg-black px-7 py-4 text-white'>
            <Link href={`/docs/${encodeURIComponent(category)}/${slug}`} passHref className='w-full flex flex-col'>
                <h2 className='mb-3 text-2xl font-semibold'>{title}</h2>
                <p className='m-0 text-sm opacity-50'>{description}</p>
            </Link>
        </div>
    </div>
);

export default DocsItem;