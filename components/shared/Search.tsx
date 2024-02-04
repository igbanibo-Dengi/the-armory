"use client";

import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { SearchCheck } from "lucide-react";

const Search = ({ placeholder = "Search weapon name...", }: { placeholder?: string }) => {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            let newUrl = "";
            if (query) {
                newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "query",
                    value: query,
                });
            } else {
                newUrl = removeKeysFromQuery({
                    params: searchParams.toString(),
                    keysToRemove: ["query"],
                });
            }

            router.push(newUrl, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, searchParams, router]);

    return (
        <div className="flex items-center border rounded-md w-full px-3 md:max-w-[500px]">
            <SearchCheck />
            <Input
                type="text"
                placeholder={placeholder}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
        </div>
    );
};

export default Search;
