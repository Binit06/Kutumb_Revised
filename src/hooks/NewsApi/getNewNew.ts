export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface NewsApiResponse {
    status: string;
    totalResults: number;
    articles: Article[];
}

const getNewNews = async (): Promise<NewsApiResponse> => {
    const response = await fetch('https://newsapi.org/v2/everything?q=SocialWork&from=2024-02-29&language=en&sortBy=publishedAt&apiKey=6db75ae1535e48ae8be11f2311cc9d39');
    const data = await response.json();
    return data as NewsApiResponse;
}

export default getNewNews;
