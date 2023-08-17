export interface Project {
    order?: number;
    title: string;
    icon: string;
    description: string;
    imgUrl: string;
    url: string;
}

export interface Book {
    order?: number;
    icon: string;
    title: string;
    author: string;
    coverImgUrl: string;
}

export interface Quote {
    order?: number;
    quote: string;
    author: string;
}

export interface Now {
    order?: number;
    name: string;
    now: string;
}