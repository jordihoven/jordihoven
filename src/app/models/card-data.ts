import { Project } from "./card-interface";

export const projects: Project[] = [
    {
        title: 'Project • Daily reflections',
        icon: 'github',
        description: 'Een digitaal dagboek, gebouwd met Angular en Firebase.',
        imgUrl: '../../assets/dailyreflections.gif',
        url: 'https://dailyreflections.netlify.app/'
    },
    {
        title: 'Project • Drinkz',
        icon: 'coffee',
        description: 'Een digitale slijterij. Shopify eCommerce.',
        imgUrl: '../../assets/drinkz-demo.gif',
        url: 'https://drinkz.nl/'
    },
    {
        title: 'Project • PokeAPI',
        icon: 'play',
        description: 'De Angular Tour of Heroes, maar dan met Pokemons.',
        imgUrl: '../../assets/pokeapi.png',
        url: 'https://gonnacatchemall.netlify.app/'
    },
    {
        title: 'Project • Shopify Storefront',
        icon: 'shopping-bag',
        description: 'Een Headless Shopify door Storefront API.',
        imgUrl: '../../assets/storefront-demo.gif',
        url: 'https://github.com/jordihoven/storefront'
    },
    {
        title: 'Project • IMDb Scraper',
        icon: 'film',
        description: 'De bekende filmbibliotheek, in een versimpeld jasje.',
        imgUrl: '../../assets/scraper-demo.gif',
        url: 'https://imdbscraper.netlify.com'
    }
]