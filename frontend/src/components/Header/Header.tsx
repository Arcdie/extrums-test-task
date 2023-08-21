import { IHeaderProps } from './Header.props';
import { useNavigate } from 'react-router-dom';

import { join } from '../../libs/helper.lib';

import styles from './Header.module.scss';

const Header = ({
  setAuthToken,
}: IHeaderProps) => {
  const navigate = useNavigate();

  const logOut = () => {
    setAuthToken(null);
    return navigate('/auth');
  };

  return (
    <div className={join(styles.Header)}>
      <button
        className='btn btn-link'
        onClick={() => logOut()}
      >Вийти</button>
    </div>
  );
};

export default Header;