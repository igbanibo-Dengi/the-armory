"use client";

import { useEffect, useState } from "react";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "../ui/input";
import { SearchCheck, SearchX } from "lucide-react";

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
            <svg width="24" height="24" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
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
