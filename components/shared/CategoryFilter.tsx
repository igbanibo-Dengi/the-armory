'use client'

import React, { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";

const CategoryFilter = () => {

    const [categories, setCategories] = useState<ICategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();


    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();

            categoryList && setCategories(categoryList as ICategory[])
        }

        getCategories();
    }, [])


    const onSelectCategory = (category: string) => {
        let newUrl = "";

        if (categories && category !== "All") {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "category",
                value: category,
            });
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ["category"],
            });
        }

        router.push(newUrl, { scroll: false });
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by weapon type" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All">All</SelectItem>
                {categories.map((category) => {
                    return (
                        <SelectItem key={category._id} value={category.name}>
                            {category.name}
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

export default CategoryFilter;
