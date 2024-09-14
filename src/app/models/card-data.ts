import { Project, Book } from './card-interface';

export const projects: Project[] = [
  {
    order: 1,
    title: 'Daily reflections',
    icon: 'github',
    description: 'Een digitaal dagboek, gebouwd met Angular en Firebase.',
    imgUrl: '../../assets/dailyreflections.gif',
    url: 'https://dailyreflections.netlify.app/',
  },
  {
    order: 2,
    title: 'Cinemagnet',
    icon: 'film',
    description: 'Film zoekmachine, gebouwd met Vue3 en Netlify functions.',
    imgUrl: '../../assets/cinemagnet.png',
    url: 'https://cinemagnet.netlify.app',
  },
  {
    order: 3,
    title: 'PokeAPI',
    icon: 'play',
    description: 'De Angular Tour of Heroes, maar dan met Pokemons.',
    imgUrl: '../../assets/pokeapi.png',
    url: 'https://gonnacatchemall.netlify.app/',
  },
  {
    order: 4,
    title: 'Drinkz',
    icon: 'coffee',
    description: 'Een digitale slijterij. Shopify eCommerce.',
    imgUrl: '../../assets/drinkz-demo.gif',
    url: 'https://drinkz.nl/',
  },
  {
    order: 5,
    title: 'Shopify Storefront',
    icon: 'shopping-bag',
    description: 'Een Headless Shopify door Storefront API.',
    imgUrl: '../../assets/storefront-demo.gif',
    url: 'https://github.com/jordihoven/storefront',
  },

];

export const books: Book[] = [
  {
    order: 6,
    title: 'Meditations',
    icon: 'book',
    author: 'Een inzicht in het persoonlijke dagboek van de machtigste man op de planeet.',
    coverImgUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1421618636i/30659.jpg',
    url: 'https://www.goodreads.com/book/show/30659.Meditations',
  },
  {
    order: 7,
    title: 'Daily Stoic',
    icon: 'book',
    author: 'Ieders dagelijkse hoeveelheid stoicisme, verpakt in een boek met 365 wijze lessen.',
    coverImgUrl: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1462161080i/29093292.jpg',
    url: 'https://www.goodreads.com/book/show/29093292-the-daily-stoic',
  },
];
