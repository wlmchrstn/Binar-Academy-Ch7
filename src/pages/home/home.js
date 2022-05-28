import React from 'react';
import styles from './home.module.scss';

// Modules
import Hero from '../../modules/hero/hero';
import OurServices from '../../modules/our-services/our-services';
import WhyUs from '../../modules/why-us/why-us';
import Banner from '../../modules/banner/banner';
import DataViz from '../../modules/data-viz/data-viz';

const HomePage = () => {
    return (
        <div className={styles.root}>
            <Hero />
            <OurServices />
            <WhyUs />
            <Banner />
            <DataViz />
        </div>
    )
};

export default HomePage;
