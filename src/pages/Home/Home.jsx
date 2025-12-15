import React from 'react';
import Banner from '../../components/HomePageDesign/Banner';
import Hero from '../../components/HomePageDesign/Hero';
import FeaturedClubs from '../../components/HomePageDesign/FeaturedClubs';
import Works from '../../components/HomePageDesign/Works';
import TopCategories from '../../components/HomePageDesign/TopCategories';

const Home = () => {
    return (
        <div>
             <Hero></Hero>
             <Banner></Banner>
             <FeaturedClubs></FeaturedClubs>
             <Works></Works>
             <TopCategories></TopCategories>
                </div>
    );
};

export default Home;