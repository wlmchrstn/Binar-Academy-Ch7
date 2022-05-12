import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './dashboard.module.scss';

// Components
import Paragraph from '../../components/paragraph/paragraph';
import Title from '../../components/title/title';
import Input from '../../components/input/input';
import Button from '../../components/button/button';

// Assets
import chevronRight from '../../assets/icons/fi_chevron-right.svg';
import sort from '../../assets/icons/fi_sort.svg';
import doubleChevronRight from '../../assets/icons/fi_double-chevrons-right.svg';
import doubleChevronLeft from '../../assets/icons/fi_double-chevrons-left.svg';

// Dummy data
const order = {
    col1: 'User Email',
    col2: 'Car',
    col3: 'Start Rent',
    col4: 'Finish Rent',
    col5: 'Price',
    col6: 'Status',
};

const car = {
    col1: 'Name',
    col2: 'Category',
    col3: 'Price',
    col4: 'Start Rent',
    col5: 'Finish Rent',
    col6: 'Created at',
    col7: 'Updated at',
};

const Dashboard = ({ sideBarState, state, data }) => {
    const [jump, setJump] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        setTotal(Math.ceil(data.length/limit));
        if (currentPage > total) setCurrentPage(total);
    }, [data.length, limit, currentPage, total]);

    const List = ({ data, index, header }) => {
        const Column = ({ data }) => (
            <div className={styles['list-wrapper']}>
                <Paragraph variant={header ? 'body-1-bold' : 'body-1-light'} color={'black'}>
                    {data}
                </Paragraph>
                {header && <img src={sort} alt={'logo-sort'} />}
            </div>
        );

        return (
            <div className={classNames(styles['list-item'], header ? styles['list-header'] : '')}>
                <div className={styles['list-number']}>
                    <Paragraph variant={'body-1-bold'} color={'black'}>
                        {header ? 'No' : index+1}
                    </Paragraph>
                </div>
                <div className={classNames(styles['list-column'], state === 'Car' ? styles['list-car'] : '')}>
                    <Column data={data.col1} />
                    <Column data={data.col2} />
                    <Column data={data.col3} />
                    <Column data={data.col4} />
                    <Column data={data.col5} />
                    <Column data={data.col6} />
                    {state === 'Car' && (<Column data={data.col7} />)}
                </div>
            </div>
        );
    };

    const getList = (data) => {
        return data.map((item, index) => {
            if (index < (currentPage-1) * limit) return null;
            if (index >= (currentPage) * limit) return null;
            return <List key={index} data={item} index={index} header={false} />;
        });
    };

    const handleJump = () => {
        if (jump > total) return setCurrentPage(total);
        return setCurrentPage(jump);
    };

    const Item = ({ page }) => {
        return (
            <div onClick={() => setCurrentPage(page)} className={classNames(styles['page-wrapper'], page === currentPage ? styles['page-selected'] : '')}>
                <Paragraph variant={'body-2'} color={'gray-3'}>
                    {page}
                </Paragraph>
            </div>
        );
    };

    const getPagination = () => {
        if (total < 6) {
            let item = [];
            for (let i = 1; i <= total; i ++) {
                item.push(
                    <Item key={i} page={i} />
                );
            };
            return item;
        };

        if (currentPage < 3) return (
            <>
                <Item page={1} />
                <Item page={2} />
                <Item page={3} />
                <div className={styles['page-wrapper']}>
                    <Paragraph variant={'body-2'} color={'gray-3'}>
                        {'...'}
                    </Paragraph>
                </div>
                <Item page={total} />
            </>
        );

        if (currentPage > total-3) return (
            <>
                <Item page={total-4} />
                <Item page={total-3} />
                <Item page={total-2} />
                <Item page={total-1} />
                <Item page={total} />
            </>
        );

        return (
            <>
                <Item page={currentPage-2} />
                <Item page={currentPage-1} />
                <Item page={currentPage} />
                <div className={styles['page-wrapper']}>
                    <Paragraph variant={'body-2'} color={'gray-3'}>
                        {'...'}
                    </Paragraph>
                </div>
                <Item page={total} />
            </>
        );
    };

    return (
        <div className={styles.root}>
            <div className={styles.navigation}>
                <Paragraph variant={'body-2-bold'} color={'black'}>
                    {sideBarState}
                </Paragraph>
                <div className={styles['navigation-chevron']}>
                    <img src={chevronRight} alt={'logo-chevron-right'} />
                </div>
                <Paragraph variant={'body-2-light'} color={'black'}>
                    {state}
                </Paragraph>
            </div>
            <div className={styles.header}>
                <Title tagElement={'h2'} variant={'heading-2'} color={'black'}>
                    {'Dashboard'}
                </Title>
            </div>
            <div className={styles.title}>
                <Paragraph variant={'body-1-bold'} color={'black'}>
                    {`List ${state}`}
                </Paragraph>
            </div>
            <div className={styles.list}>
                <div>
                    <List data={state === 'Order' ? order : car} header index={'No'} />
                </div>
                <div className={styles['list-item-wrapper']}>
                    {getList(data)}
                </div>
            </div>
            <div className={styles.pagination}>
                <div className={styles['pagination-wrapper']}>
                    <div className={styles.limit}>
                        <Paragraph variant={'body-1-light'} color={'black'}>
                            {'Limit'}
                        </Paragraph>
                        <div className={styles['limit-dropdown']}>
                            <Input className={styles.select} dropdown>
                                <select onChange={(e) => setLimit(e.target.value)}>
                                    <option value={10}>
                                        {'10'}
                                    </option>
                                    <option value={30}>
                                        {'30'}
                                    </option>
                                    <option value={50}>
                                        {'50'}
                                    </option>
                                </select>
                            </Input>
                        </div>
                    </div>
                    <div className={styles.jump}>
                        <Paragraph variant={'body-1-light'} color={'black'}>
                            {'Jump to page'}
                        </Paragraph>
                        <div className={styles['jump-dropdown']}>
                            <Input className={styles.input} dropdown>
                                <input
                                    type={'number'}
                                    placeholder={1}
                                    min={1}
                                    max={total}
                                    onChange={(e) => setJump(parseInt(e.target.value))} />
                            </Input>
                            <Button type={'button'} variant={'primary'} onClick={() => handleJump()}>
                                {'Go'}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={styles.page}>
                    <div onClick={() => setCurrentPage(currentPage-1)} className={classNames(styles['page-wrapper'], currentPage === 1 ? styles['page-disabled'] : '')}>
                        <img src={doubleChevronLeft} alt={'logo-double-chevrons-left'} />
                    </div>
                    {getPagination()}
                    <div onClick={() => setCurrentPage(currentPage+1)} className={classNames(styles['page-wrapper'], currentPage === total ? styles['page-disabled'] : '')}>
                        <img src={doubleChevronRight} alt={'logo-double-chevrons-right'} />
                    </div>
                </div>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    sideBarState: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Dashboard.defaultProps = {
    sideBarState: 'Dashboard',
    state: 'Order',
    data: [],
};

export default Dashboard;
