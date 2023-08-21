import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import { join } from '../../libs/helper.lib';

import {
  getCounterRequest,
  incrementCounterRequest,
  decrementCounterRequest,
} from './CounterPage.api';

import Header from '../../components/Header/Header';

import { ICounterPageProps } from './CounterPage.props';

import styles from './CounterPage.module.scss';

const CounterPage = ({
  authToken,
  setAuthToken,
}: ICounterPageProps) => {
  const [counter, setCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localSetCounter = async () => {
      const resultGetCounter = await getCounterRequest();

      if (!resultGetCounter || !resultGetCounter.status) {
        return alert(resultGetCounter?.message || 'Cant make getCounterRequest');
      }

      setCounter(resultGetCounter.result.value);
      setIsLoading(false);
    };

    localSetCounter();
  }, []);

  const updateCounter = async (isIncrement = true) => {
    const requestFunc = isIncrement ? incrementCounterRequest : decrementCounterRequest;
    const resultUpdateCounter = await requestFunc(authToken);

    if (!resultUpdateCounter || !resultUpdateCounter.status) {
      return alert(resultUpdateCounter?.message || 'Cant make updateCounterRequest');
    }

    setCounter(resultUpdateCounter.result.value);
  };

  return (
    <>
      <Header setAuthToken={setAuthToken} />

      <div className={join('container', styles.CounterPage)}>
        <div
          className={join('col-12', styles.FormContainer)}
          style={{ height: window.innerHeight }}
        >
          <div className={join('col-3', 'form', styles.Form)}>
            <NavLink
              to='/history'
              className='link-secondary'
            >До історії</NavLink>

            <h1 className={join(styles.Counter)}>{isLoading ? 'Завантаження..' : counter}</h1>

            <hr className='mt-1 mb-1'/>

            <div className={join('col-12', styles.ButtonActions)}>
              <button
                className='btn btn-primary col-3'
                onClick={() => updateCounter(false)}
              >-</button>
              <button
                className='btn btn-success col-3'
                onClick={() => updateCounter(true)}
              >+</button>            
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CounterPage;
