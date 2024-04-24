import React from 'react';
import Link from "next/link";
import drinkImg from './drink.jpg'
import Image from "next/image";

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const getSingleDrink = async (id) => {
    const res = await fetch(`${url}${id}`)
    if (!res.ok) {
        throw new Error('Problem getting drink')
    }
    return res.json()
}
const SingleDrinkPage = async ({params}) => {
    const data = await getSingleDrink(params.id)
    const title = data?.drinks[0]?.strDrink
    const imgSrc = data?.drinks[0]?.strDrinkThumb
    console.log(data)
    return (
        <div>
            <Link href={'/drinks'} className={'btn btn-primary mt-8 mb-12'}>back to drinks</Link>
            <Image src={drinkImg} className={"w-48 h-48 rounded-lg"} alt={"drink"} />
            <h1 className={'text-4xl mb-8'}>{title}</h1>
        </div>
    );
};

export default SingleDrinkPage;