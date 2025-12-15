import React from 'react';
import Banner from '../../components/HomePageDesign/Banner';
import Hero from '../../components/HomePageDesign/Hero';
import FeaturedClubs from '../../components/HomePageDesign/FeaturedClubs';
import Works from '../../components/HomePageDesign/Works';
import TopCategories from '../../components/HomePageDesign/TopCategories';
import Stats from '../../components/HomePageDesign/Stats';
import Accoration from '../../components/HomePageDesign/Accoration';
import Footer from '../../components/Footer';

const Home = () => {
    return (
        <div>
             <Hero></Hero>
             <Banner></Banner>
            <Stats></Stats>






             <Works></Works>
             <TopCategories></TopCategories>
            
             <Accoration></Accoration>
         <FeaturedClubs></FeaturedClubs>
         <Footer></Footer>
                </div>
    );
};

export default Home;