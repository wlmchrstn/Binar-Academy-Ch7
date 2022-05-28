import { CircleLoader } from 'react-spinners';
import styles from './spinner.module.scss';

const override = {
  display: "block",
  margin: "auto",
  borderColor: "red",
};

const Spinner = () => {
  return (
    <div className={styles.root}>
      <CircleLoader color={'#ff5733'} loading={true} css={override} size={50} />
    </div>
  );
};

export default Spinner;
