'use client';
import getNewNews, { Article } from '@/hooks/NewsApi/getNewNew';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const CollaborationPage = () => {
    const [newsArticles, setNewsArticles] = useState<Article[]>([]);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const data = await getNewNews();
                setNewsArticles(data.articles);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className='flex flex-row'>
            <div>
                <h2>Trending Topics</h2>
                <ul>
                    {newsArticles.map((article, index) => (
                        <li key={index}>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">
                                <h3 className='text-2xl'>{article.title}</h3>
                                <p>{article.description}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                
            </div>
        </div>
    );
};

export default CollaborationPage;
