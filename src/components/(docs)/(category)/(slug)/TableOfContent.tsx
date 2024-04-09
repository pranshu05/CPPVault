import { useState, useEffect } from 'react';

const TableOfContents = ({ headings }) => {
    const [activeHeading, setActiveHeading] = useState<number | null>(null);
    const [topPosition, setTopPosition] = useState(88);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            let activeHeadingIndex: number | null = null;

            for (let i = 0; i < headings.length; i++) {
                if (headings[i].top > scrollPosition + 88) {
                    activeHeadingIndex = i === 0 ? 0 : i - 1;
                    break;
                }
            }

            setActiveHeading(activeHeadingIndex);
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [headings]);

    useEffect(() => {
        if (activeHeading !== null) {
            const newTopPosition = 88 - activeHeading * 24;
            setTopPosition(newTopPosition);
        }
    }, [activeHeading]);

    return (
        <div className="fixed right-0 px-4 w-0 scale-0 xl:scale-100 xl:w-1/6 2xl:w-1/4 transition-all delay-300" style={{ top: `${topPosition}px` }}>
            <p className='text-zinc-200 underline text-lg mb-2'>Table of Content</p>
            <ul>
                {headings.map((heading, index) => (
                    <li key={index} className={heading.type == 'h2' ? 'ml-0' : 'ml-5'}>
                        <a className={index === activeHeading ? 'text-white' : 'text-zinc-400'}>
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;