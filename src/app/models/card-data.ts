import { Project, Book, Now } from "./card-interface";

export const projects: Project[] = [
    {
        order: 2,
        title: 'Project • Daily reflections',
        icon: 'github',
        description: 'Een digitaal dagboek, gebouwd met Angular en Firebase.',
        imgUrl: '../../assets/dailyreflections.gif',
        url: 'https://dailyreflections.netlify.app/'
    },
    {
        order: 5,
        title: 'Project • Drinkz',
        icon: 'coffee',
        description: 'Een digitale slijterij. Shopify eCommerce.',
        imgUrl: '../../assets/drinkz-demo.gif',
        url: 'https://drinkz.nl/'
    },
    {
        order: 4,
        title: 'Project • PokeAPI',
        icon: 'play',
        description: 'De Angular Tour of Heroes, maar dan met Pokemons.',
        imgUrl: '../../assets/pokeapi.png',
        url: 'https://gonnacatchemall.netlify.app/'
    },
    {
        order: 8,
        title: 'Project • Shopify Storefront',
        icon: 'shopping-bag',
        description: 'Een Headless Shopify door Storefront API.',
        imgUrl: '../../assets/storefront-demo.gif',
        url: 'https://github.com/jordihoven/storefront'
    },
    {
        order: 6,
        title: 'Project • IMDb Scraper',
        icon: 'film',
        description: 'De bekende filmbibliotheek, in een versimpeld jasje.',
        imgUrl: '../../assets/scraper-demo.gif',
        url: 'https://imdbscraper.netlify.com'
    }
]

export const books: Book[] = [
    {
        order: 3,
        title: 'Boek • Meditations',
        icon: 'book',
        author: 'Een inzicht in het persoonlijke dagboek van de machtigste man op de planeet.',
        coverImgUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421618636i/30659.jpg'
    },
    {
        order: 7,
        title: "Boek • Daily Stoic",
        icon: 'book',
        author: "Ryan Holiday",
        coverImgUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1462161080i/29093292.jpg'
    }
]

export const nows: Now[] = [
    {
        order: 1,
        name: 'jordi hoven --',
        now: 'doing something.'
    }
]