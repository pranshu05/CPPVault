import Link from 'next/link';
import categoryDisplayNames from './CategoryDisplayNames';

interface CategoryListProps {
    categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
    return (
        <div className='group relative mt-10 w-full'>
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
            <div className="relative rounded-lg bg-black px-7 py-4 text-white">
                {categories.map((cat, index) => {
                    const categoryName = categoryDisplayNames[cat] || cat;
                    return (
                        <Link className='w-full flex flex-col' href={`/docs/${encodeURIComponent(cat)}`} key={index}>
                            <h2 className="mb-3 text-2xl font-semibold">{categoryName} {""}<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">-&gt;</span></h2>
                            <p className="m-0 text-sm opacity-50">Explore {categoryName} docs.</p>
                        </Link>
                    );
                })}
            </div> 
        </div>
    );
};

export default CategoryList;