"use client";
import React, { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
const FilterHeader = () => {
    const HomePageFilters: any = [
        { name: "Newest", value: "newest" },
        { name: "oldest", value: "oldest" },
        {name : "Most viewed", value : "most-viewed"}
    ];
    const searchParams = useSearchParams();
    const router = useRouter();
    const formUrlQuery = ({ params, key, value }: any) => {
        const currentUrl = qs.parse(params);
        currentUrl[key] = value;
        return qs.stringifyUrl(
            {
                url: window.location.pathname,
                query: currentUrl,
            },
            { skipNull: true }
        );
    };
    const [active, setActive] = useState("");
    const handleTypeClick = useCallback(
        (item: string) => {
            if (active === item) {
                setActive("");
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "filter",
                    value: null,
                });
                router.push(newUrl, { scroll: false });
            } else {
                setActive(item);
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "filter",
                    value: item.toLowerCase(),
                });
                router.push(newUrl, { scroll: false });
            }
        },
        [active, router, searchParams]
    );
    return (
        <div className="mt-2 flex-wrap gap-3 flex max-md:justify-center">
            {HomePageFilters.map((item : any) => (
                <Button
                    key={item.value}
                    onClick={() => {}}
                    onClickCapture={() => handleTypeClick(item.value)}
                    className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
                        active === item.value
                            ? "bg-primary-100 text-primary-500 hover:bg-light-800 dark:hover:bg-dark-300"
                            : "bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400"
                    }`}
                >
                    {item.name}
                </Button>
            ))}
        </div>
    );
};
export default FilterHeader;
