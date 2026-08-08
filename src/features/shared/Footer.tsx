import { ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <a
            href="https://github.com/hibiki-shibata/stock-profit-calculation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1 text-slate-400 pt-25 pb-10 text-sm"
        >
            <ExternalLink size={11} /> Source Code
        </a>
    )
}