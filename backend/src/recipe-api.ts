import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.API_KEY;

export const searchRecipes = async (searchTerm: string, page: number) => {
    if(!apiKey) {
        throw new Error("API key not found");
    }

    const baseURL = "https://api.spoonacular.com/recipes/complexSearch";
    const url = new URL(baseURL);

    const queryParams = {
        apiKey: apiKey,
        query: searchTerm,
        number: '10',
        offset: ((page - 1) * 10).toString(),
    };

    url.search = new URLSearchParams(queryParams).toString();

    try {
        const searchResponse = await fetch(url.toString());
        const resultsJson = await searchResponse.json();
        return resultsJson;
    } catch (error) {
        console.error(error);
    }
};