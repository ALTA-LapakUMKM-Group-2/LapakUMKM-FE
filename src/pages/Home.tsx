import React from 'react'
import Navbar from '../components/Navbar'
import Layout from '../components/Layout'
import FotoProfile from '../assets/photo_2023-03-16_20-34-20.jpg'
import ProdukCard from '../components/ProdukCard'

const Home = () => {
    return (
        <Layout>
            <Navbar 
            imgUser={FotoProfile}
            />
            <div className="h-full grid grid-cols-5 mx-20">
                <ProdukCard
                produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                location='jakarta'
                id={1}
                key={1}
                image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                rating={4.5}
                price={125000}
                />
                <ProdukCard
                produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                location='jakarta'
                id={1}
                key={1}
                image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                rating={4.5}
                price={125000}
                />
                <ProdukCard
                produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                location='jakarta'
                id={1}
                key={1}
                image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                rating={4.5}
                price={125000}
                />
                <ProdukCard
                produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                location='jakarta'
                id={1}
                key={1}
                image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                rating={4.5}
                price={125000}
                />
                <ProdukCard
                produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                location='jakarta'
                id={1}
                key={1}
                image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                rating={4.5}
                price={125000}
                />
                <ProdukCard
                produkName='Apple Watch Series 7 GPS, Alumunium Case, starligth sport'
                location='jakarta'
                id={1}
                key={1}
                image={'https://sellercenter.unkl-ns.com/gallery/items/604/img_604_i55_3_1667709495.jpg'}
                rating={4.5}
                price={125000}
                />
            </div>
        </Layout>
    )
}

export default Home