"use client";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {sidebarLinks} from "@/constant/constant";

const NavContent = () => {
    const pathname = usePathname();
    return (
        <section className="flex h-full flex-col gap-6 pt-16">
            {sidebarLinks.map((item) => {
                const isActive =
                    (pathname.includes(item.route) && item.route.length > 1) ||
                    pathname === item.route;
                return (
                    <SheetClose asChild key={item.route}>
                        <Link
                            href={item.route}
                            className={`${
                                isActive
                                    ? "primary-gradient rounded-lg text-light-900"
                                    : "text-dark300_light900"
                            } flex items-center justify-start gap-4 bg-transparent p-4`}>
                            <Image
                                src={item.imgURL}
                                alt={item.label}
                                width={20}
                                height={20}
                                className={`${isActive ? "" : "invert-colors"}`}
                            />
                            <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                                {item.label}
                            </p>
                        </Link>
                    </SheetClose>
                );
            })}
        </section>
    );
};

const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Image
                    src="/assets/icons/hamburger.svg"
                    width={36}
                    height={36}
                    alt="Menu"
                    className="invert-colors sm:hidden"
                />
            </SheetTrigger>
            <SheetContent
                side="left"
                className="background-light900_dark200 border-none">
                <Link href="/" className="flex items-center gap-1">
                    <Image
                        src="/assets/images/site-logo.svg"
                        width={23}
                        height={23}
                        alt="DevFlow"
                    />
                    <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
                        Dev<span className="text-primary-500">Overflow</span>
                    </p>
                </Link>
                <div className="flex flex-col">
                    <SheetClose asChild>
                        <NavContent />
                    </SheetClose>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;
