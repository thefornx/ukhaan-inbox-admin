import { ChevronsUpDown } from "lucide-react";
import Image from "next/image";

export default function TopNavigation() {
    const fullName = "John Doe";
    const initials = fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <nav className="bg-base-100 border-b border-base-300 flex items-center justify-between p-2">
            <div className="flex items-center gap-3">
                {/* Ukhaan logo */}
                <Image
                    src="/assets/ukhaan-white-logo.png"
                    alt="Ukhaan logo"
                    width={28}
                    height={28}
                    priority
                />

                {/* Company dropdown */}
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn btn-primary btn-soft border-0 btn-sm">
                        <div className="flex gap-1 items-center">
                            <div className="avatar avatar-placeholder">
                                <div className="bg-neutral text-neutral-content w-5 rounded">
                                    <span className="text-xs"></span>
                                </div>
                            </div>
                            <div>COMPANY</div>
                            <div>
                                <ChevronsUpDown className="w-4 h-4 opacity-50" />
                            </div>
                        </div>
                    </div>
                    <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li>
                            <a>
                                <div className="flex gap-1 items-center">
                                    <div className="avatar avatar-placeholder">
                                        <div className="bg-neutral text-neutral-content w-5 rounded">
                                            <span className="text-xs"></span>
                                        </div>
                                    </div>
                                    <div>COMPANY</div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
