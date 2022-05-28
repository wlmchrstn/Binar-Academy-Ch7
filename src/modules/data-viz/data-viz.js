import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styles from './data-viz.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Data Penghasilan',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Pendapatan',
      data: labels.map(() => Math.random(0, 100)),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Pengeluaran',
      data: labels.map(() => Math.random(0, 100)),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

const VerticalBar = () => {
  return <Bar options={options} data={data} />;
};

const DataViz = () => {
    return (
        <div className={styles.root}>
            <VerticalBar />
        </div>
    )
};

export default DataViz;
