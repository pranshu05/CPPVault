import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => (
    <footer className="flex flex-col font-medium w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2 mx-auto mb-4">
        <hr className="border-t-2 border-zinc-800" />
        <div className="flex items-center pt-2 justify-between">
            <p className="text-zinc-400">© {new Date().getFullYear()} </p>
            <a href="https://github.com/pranshu05/cppvault" target="_blank" rel="noopener noreferrer" className="link text-zinc-400 flex items-center">
                <FaGithub className="mr-2 text-lg" />
                <p className="text-lg">GitHub</p>
            </a>
        </div>
    </footer>
);

export default Footer;