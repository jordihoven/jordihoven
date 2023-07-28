import { Component } from '@angular/core';
import { ProjectData } from '../models/project-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jordihoven';

  projects: ProjectData[] = [
    {
      title: 'Daily reflections',
      description: 'Een digitaal dagboek, gebouwd met Angular en Firebase.',
      imageLink: '../../assets/dailyreflections.gif',
      webLink: 'https://dailyreflections.netlify.app/'
    },
    {
      title: 'Drinkz',
      description: 'Een digitale slijterij. Shopify eCommerce.',
      imageLink: '../../assets/drinkz-demo.gif',
      webLink: 'https://drinkz.nl/'
    },
    {
      title: 'PokeAPI',
      description: 'De Angular Tour of Heroes, maar dan met Pokemons.',
      imageLink: '../../assets/pokeapi.png',
      webLink: 'https://gonnacatchemall.netlify.app/'
    },
    {
      title: 'Shopify Storefront',
      description: 'Een Headless Shopify door Storefront API.',
      imageLink: '../../assets/storefront-demo.gif',
      webLink: 'https://github.com/jordihoven/storefront'
    },
    {
      title: 'IMDb Scraper',
      description: 'De bekende filmbibliotheek, in een versimpeld jasje.',
      imageLink: '../../assets/scraper-demo.gif',
      webLink: 'https://imdbscraper.netlify.com'
    }
    // Add more projects here
  ];
}
