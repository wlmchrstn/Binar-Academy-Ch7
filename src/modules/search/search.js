import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { formatRupiah } from '../../utils/helper';
import axios from 'axios';
import classNames from 'classnames';
import styles from './search.module.scss';

// React PDF Viewer
import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Worker } from '@react-pdf-viewer/core';

// Components
import Button from '../../components/button/button';
import Paragraph from '../../components/paragraph/paragraph';
import Card from '../../components/card/card';
import Title from '../../components/title/title';
// import Modal from '../../components/custom-modal/custom-modal';

// Assets
import users from '../../assets/icons/fi_users.svg';
import settings from '../../assets/icons/fi_settings.svg';
import calendar from '../../assets/icons/fi_calendar.svg';
import chevron from '../../assets/icons/fi_chevron-up.svg';
import arrowLeft from '../../assets/icons/fi_arrow-left.svg';
import checkBlue from '../../assets/icons/fi_check-blue.svg';
import success from '../../assets/icons/fi_success.svg';
import filePDF from '../../assets/preview.pdf';

const Search = ({ setHero }) => {
    const { register, handleSubmit } = useForm();
    const [step,setStep] = useState('home');
    const [data,setData] = useState([{
        id: '',
        name: '',
        category: '',
        price: 0,
        image: null,
    }]);
    const [detail,setDetail] = useState(null);
    const [accordion,setAccordion] = useState(false);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const fetchData = async (params) => {
        try {
            if (params.driver === 'Pilih Tipe Driver') return null;
            const { data: response } = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/car`);
            const filteredResponse = response.filter((e) => {
                if (params.driver === 'Dengan Sopir') return e.status === true;
                return e.status === false;
            });
            setData(filteredResponse);
            setStep('search');
            setHero('search');
        } catch(err) {
            console.log(err);
        };
    };

    const onSubmit = (data) => {
        fetchData(data);
    };

    const getCard = (params) => {
        return params.map((value, index) => {
            return (
                <Card key={index} id={value.id} name={value.name} category={value.category} price={value.price} image={value.image} step={setStep} detail={setDetail} />
            );
        });
    };

    const handlePembayaran = async (detail) => {
        try {
            const today = new Date();
            const finishRent = today.setDate(today.getDate() + 3);
            const req = {
                "start_rent_at": today,
                "finish_rent_at": finishRent,
                "car_id": detail.id
            }
            const { data: response } = await axios.post(`${process.env.REACT_APP_BASE_URL}/customer/order`, req, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "access_token": sessionStorage.getItem('bcrToken'),
                }
            });
            console.log(response);
            setStep('pembayaran');
        } catch(err) {
            console.log(err);
        };
    };

    const getDetail = (params) => {
        return (
            <div className={styles['detail-wrapper']}>
                <div className={styles.content}>
                    <div className={styles.detail}>
                        <div style={{ marginBottom: '16px' }}>
                            <Paragraph variant={'body-1'} weight={'bold'} color={'black'}>
                                {'Tentang Paket'}
                            </Paragraph>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                                {'Include'}
                            </Paragraph>
                        </div>
                        <ul style={{ marginBottom: '16px' }}>
                            <li>
                                {'Apa saja yang termasuk dalam paket misal durasi max 12 jam'}
                            </li>
                            <li>
                                {'Sudah termasuk bensin selama 12 jam'}
                            </li>
                            <li>
                                {'Sudah termasuk Tiket Wisata'}
                            </li>
                            <li>
                                {'Sudah termasuk pajak'}
                            </li>
                        </ul>
                        <div style={{ marginBottom: '8px' }}>
                            <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                                {'Exclude'}
                            </Paragraph>
                        </div>
                        <ul style={{ marginBottom: '26px' }}>
                            <li>
                                {'Tidak termasuk biaya makan sopir Rp 75.000/hari'}
                            </li>
                            <li>
                                {'Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam'}
                            </li>
                            <li>
                                {'Tidak termasuk akomodasi penginapan'}
                            </li>
                        </ul>
                        <div className={styles['detail-accordion']} onClick={() => setAccordion(!accordion)}>
                            <Paragraph variant={'body-1'} weight={'bold'} color={'black'}>
                                {'Refund, Reschedule, Overtime'}
                                {accordion}
                            </Paragraph>
                            <div className={classNames(styles['detail-accordion-image'], accordion ? styles['detail-accordion-rotate'] : '')}>
                                <img src={chevron} alt={'fi_chevron'} />
                            </div>
                        </div>
                        <div className={classNames(styles['detail-list'], accordion ? styles['detail-accordion-open'] : '')}>
                            <ul>
                                <li>
                                    {'Tidak termasuk biaya makan sopir Rp 75.000/hari'}
                                </li>
                                <li>
                                    {'Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam'}
                                </li>
                                <li>
                                    {'Tidak termasuk akomodasi penginapan'}
                                </li>
                                <li>
                                    {'Tidak termasuk biaya makan sopir Rp 75.000/hari'}
                                </li>
                                <li>
                                    {'Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam'}
                                </li>
                                <li>
                                    {'Tidak termasuk akomodasi penginapan'}
                                </li>
                                <li>
                                    {'Tidak termasuk biaya makan sopir Rp 75.000/hari'}
                                </li>
                                <li>
                                    {'Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam'}
                                </li>
                                <li>
                                    {'Tidak termasuk akomodasi penginapan'}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles['card-image']}>
                            <img src={params.image} alt={params.name} />
                            {/* <Modal image={params.image} label={params.name} /> */}
                        </div>
                        <div style={{ marginBottom: '8px', marginTop: '24px' }}>
                            <Paragraph variant={'body-1'} weight={'bold'} color={'black'}>
                                {`${params.name}/${params.category}`}
                            </Paragraph>
                        </div>
                        <div className={styles['card-list']}>
                            <div className={styles['card-item']}>
                                <img src={users} alt={'fi_users'} />
                                <Paragraph variant={'body-3'} color={'grey'}>
                                    {'4 orang'}
                                </Paragraph>
                            </div>
                            <div className={styles['card-item']}>
                                <img src={settings} alt={'fi_settings'} />
                                <Paragraph variant={'body-3'} color={'grey'}>
                                    {'Manual'}
                                </Paragraph>
                            </div>
                            <div className={styles['card-item']}>
                                <img src={calendar} alt={'fi_calendar'} />
                                <Paragraph variant={'body-3'} color={'grey'}>
                                    {'Tahun 2020'}
                                </Paragraph>
                            </div>
                        </div>
                        <div className={styles.price}>
                            <Paragraph variant={'body-1'} weight={'light'} color={'black'}>
                                {'Total'}
                            </Paragraph>
                            <Paragraph variant={'body-1'} weight={'bold'} color={'black'}>
                                {formatRupiah(params.price)}
                            </Paragraph>
                        </div>
                        <Button variant={'secondary'} type={'button'} onClick={() => handlePembayaran(detail)}>
                            {'Lanjutkan Pembayaran'}
                        </Button>
                    </div>
                </div>
                <div className={styles.content} style={{ alignSelf: 'center', marginTop: '24px' }}>
                    <Button type={'button'} variant={'secondary'} onClick={() => handlePembayaran(detail)}>
                        {'Lanjutkan Pembayaran'}
                    </Button>
                </div>
            </div>
        );
    };

    const getPembayaran = (params) => {
        return (
            <div className={styles.pembayaran}>
                <div className={styles['pembayaran-header']}>
                    <div className={styles['pembayaran-kiri']}>
                        <div className={styles['pembayaran-back']} onClick={() => (setStep('home'))}>
                            <img src={arrowLeft} alt={'arrow-left'} />
                        </div>
                        <div className={styles['pembayaran-tiket']}>
                            <Title tagElement={'h2'} variant={'title'} color={'black'}>
                                {'Tiket'}
                            </Title>
                            <Paragraph variant={'body-1'} color={'black'}>
                                {'Order ID: xxxxxxxx'}
                            </Paragraph>
                        </div>
                    </div>
                    <div className={styles['pembayaran-kanan']}>
                        <img src={checkBlue} alt={'check-blue'} />
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Pilih Metode'}
                        </Paragraph>
                        <hr />
                        <img src={checkBlue} alt={'check-blue'} />
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Bayar'}
                        </Paragraph>
                        <hr />
                        <img src={checkBlue} alt={'check-blue'} />
                        <Paragraph variant={'body-1'} color={'black'}>
                            {'Tiket'}
                        </Paragraph>
                    </div>
                </div>
                <div className={styles['pembayaran-body']}>
                    <div className={styles['pembayaran-body-image']}>
                        <img src={success} alt={'success'} />
                    </div>
                    <Title tagElement={'h2'} variant={'title'} color={'black'}>
                        {'Pembayaran Berhasil!'}
                    </Title>
                    <Paragraph variant={'body-1-light'} color={'black'}>
                        {'Tunjukkan invoice ini ke petugas BCR di titik temu.'}
                    </Paragraph>
                    <div className={styles.invoice}>
                        <div className={styles['invoice-header']}>
                            <div>
                                <Title tagElement={'h3'} variant={'title'} color={'black'}>
                                    {'Invoice'}
                                </Title>
                                <Paragraph variant={'body-1-light'} color={'black'}>
                                    {'*no invoice'}
                                </Paragraph>
                            </div>
                            <div>
                                <Button type={'button'} variant={'primary-outlined'}>
                                    {'Unduh'}
                                </Button>
                            </div>
                        </div>
                        <div className={styles['invoice-body']}>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
                                <Viewer
                                    fileUrl={filePDF}
                                    plugins={[defaultLayoutPluginInstance]}
                                />
                            </Worker>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.root}>
            {step === 'pembayaran' ? null : (
                <form className={styles.search} onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ flex: '1 1 0' }}>
                        {step === 'home' ? null : (
                            <div style={{ marginBottom: '16px'}}>
                                <Paragraph variant={'body-1'} weight={'bold'} color={'black'}>
                                    {'Pencarianmu'}
                                </Paragraph>
                            </div>
                        )}
                        <div className={styles.wrapper}>
                            <div className={styles['wrapper-input']}>
                                <Paragraph variant={'body-2'} weight={'light'} color={'grey-1'}>
                                    {'Tipe Driver'}
                                </Paragraph>
                                {step === 'detail' ? (
                                    <div className={styles['input-disabled']} />
                                ) : (
                                    <div className={styles.input}>
                                        <select defaultValue={'Pilih Tipe Driver'} {...register('driver')} disabled={step === 'detail'}>
                                            <option value={'Pilih Tipe Driver'} disabled>
                                                {'Pilih Tipe Driver'}
                                            </option>
                                            <option value={'Dengan Sopir'}>
                                                {'Dengan Sopir'}
                                            </option>
                                            <option value={'Tanpa Sopir'}>
                                                {'Tanpa Sopir (Lepas Kunci)'}
                                            </option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className={styles['wrapper-input']}>
                                <Paragraph variant={'body-2'} weight={'light'} color={'grey-1'}>
                                    {'Tanggal'}
                                </Paragraph>
                                {step === 'detail' ? (
                                    <div className={styles['input-disabled']} />
                                ) : (
                                    <div className={styles.input}>
                                        <input type={'date'} {...register('tanggal')} disabled={step === 'detail'} />
                                    </div>
                                )}
                            </div>
                            <div className={styles['wrapper-input']}>
                                <Paragraph variant={'body-2'} weight={'light'} color={'grey-1'}>
                                    {'Waktu Jemput/Ambil'}
                                </Paragraph>
                                {step === 'detail' ? (
                                    <div className={styles['input-disabled']} />
                                ) : (
                                    <div className={styles.input}>
                                        <select defaultValue={'Pilih Waktu'} {...register('waktu')} disabled={step === 'detail'}>
                                            <option value='Pilih Waktu' disabled>
                                                {'Pilih Waktu'}
                                            </option>
                                            <option value={'08.00'}>
                                                {'08.00'}
                                            </option>
                                            <option value={'09.00'}>
                                                {'09.00'}
                                            </option>
                                            <option value={'10.00'}>
                                                {'10.00'}
                                            </option>
                                            <option value={'11.00'}>
                                                {'11.00'}
                                            </option>
                                            <option value={'12.00'}>
                                                {'12.00'}
                                            </option>
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className={styles['wrapper-input']}>
                                <Paragraph variant={'body-2'} weight={'light'} color={'grey-1'}>
                                    {'Jumlah Penumpang (optional)'}
                                </Paragraph>
                                {step === 'detail' ? (
                                    <div className={styles['input-disabled']} />
                                ) : (
                                    <div className={styles.input}>
                                        <input type={'text'} placeholder={'Jumlah Penumpang'} {...register('penumpang')} disabled={step === 'detail'} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {step === 'home' ? (
                        <div className={styles.button}>
                            <Button variant={'secondary'} type={'submit'}>
                                {'Cari Mobil'}
                            </Button>
                        </div>
                    ) : step === 'search' ? (
                        <div className={classNames(styles.button, styles['button-edit'])}>
                            <Button variant={'primary-outlined'} type={'submit'}>
                                {'Edit'}
                            </Button>
                        </div>
                    ) : null}
                </form>
            )}
            {step === 'search' ? (
                <div className={styles.result}>
                    {getCard(data)}
                </div>
            ) : step === 'detail' ? (
                getDetail(detail)
            ) : step === 'pembayaran' ? (
                getPembayaran(detail)
            ) : null}
        </div>
    );
};

export default Search;
