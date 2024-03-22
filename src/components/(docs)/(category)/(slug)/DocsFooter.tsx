interface DocsFooterProps {
    prevLink: string;
    nextLink: string;
}

const DocsFooter: React.FC<DocsFooterProps> = ({ prevLink, nextLink }) => (
    <>
        <div className="group relative mt-8 w-full">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-50 blur transition duration-500 group-hover:opacity-100"></div>
            <div className="relative rounded-lg bg-black px-7 py-4 text-white">
                This site is open source. <a className="link" href="https://github.com/pranshu05/DataStructures" target="_blank">Improve this page</a>
            </div>
        </div>
        <div className="flex justify-between mt-8">
            {prevLink && (<a className="link" href={prevLink}>&lt; Previous</a>)}
            {nextLink && (<a className="link" href={nextLink}>Next &gt;</a>)}
        </div>
    </>
);

export default DocsFooter;