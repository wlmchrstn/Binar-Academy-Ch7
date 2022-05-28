import React from 'react';
import styles from './why-us.module.scss';

// Assets
import why1 from '../../assets/icons/why-us-card-1.svg';
import why2 from '../../assets/icons/why-us-card-2.svg';
import why3 from '../../assets/icons/why-us-card-3.svg';
import why4 from '../../assets/icons/why-us-card-4.svg';

// Components
import Title from '../../components/title/title';
import Paragraph from '../../components/paragraph/paragraph';

const WhyUs = () => {
    return (
        <section id={'why-us'} className={styles.root}>
            <Title tagElement={'h3'} variant={'heading-1'} color={'black'}>
                {'Why Us?'}
            </Title>
            <Paragraph variant={'body-1'} color={'black'}>
                {'Mengapa harus pilih Binar Car Rental?'}
            </Paragraph>
            <div className={styles.container}>
                <div className={styles.card}>
                    <img src={why1} alt="why-us-card-1" />
                    <Title tagElement={'h4'} variant={'title'} color={'black'}>
                        {'Mobil Lengkap'}
                    </Title>
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Tersedia banyak pilihan mobil, kondisi masih baru, bersih dan terawat'}
                    </Paragraph>
                </div>
                <div className={styles.card}>
                    <img src={why2} alt="why-us-card-2" />
                    <Title tagElement={'h4'} variant={'title'} color={'black'}>
                        {'Harga Murah'}
                    </Title>
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Harga murah dan bersaing, bisa bandingkan harga kami dengan rental mobil lain'}
                    </Paragraph>
                </div>
                <div className={styles.card}>
                    <img src={why3} alt="why-us-card-3" />
                    <Title tagElement={'h4'} variant={'title'} color={'black'}>
                        {'Layanan 24 Jam'}
                    </Title>
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Siap melayani kebutuhan Anda selama 24 jam nonstop. Kami juga tersedia di akhir minggu'}
                    </Paragraph>
                </div>
                <div className={styles.card}>
                    <img src={why4} alt="why-us-card-4" />
                    <Title tagElement={'h4'} variant={'title'} color={'black'}>
                        {'Sopir Profesional'}
                    </Title>
                    <Paragraph variant={'body-1'} color={'black'}>
                        {'Sopir yang profesional, berpengalaman, jujur, ramah dan selalu tepat waktu'}
                    </Paragraph>
                </div>
            </div>
        </section>
    );
};

export default WhyUs;
