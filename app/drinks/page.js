import React from 'react';
import Link from "next/link";
import {list} from "postcss";
import DrinksList from "@/components/DrinksList";

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

const fetchDrinks = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error('Failed to fetch drinks')
    }
    return response.json()
}

const DrinksPage = async () => {
    const data = await fetchDrinks()
    return (
        <div>
            <h1 className={"text-7xl"}>DrinksPage</h1>
            <DrinksList drinks={data.drinks} />
        </div>
    );
};

export default DrinksPage;