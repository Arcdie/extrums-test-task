import { useState, useEffect } from 'react';

import { join } from '../../libs/helper.lib';
import { toFormatTime } from '../../libs/moment.lib';

import { getCountersHistory } from './HistoryPage.api';

import Header from '../../components/Header/Header';

import { IHistoryPageProps } from './HistoryPage.props';

import { ICounter } from '../../interfaces/counter.interface'

import styles from './HistoryPage.module.scss';

const HistoryPage = ({
  setAuthToken,
}: IHistoryPageProps) => {
  const [countersHistory, setCountersHistory] = useState<ICounter[]>([]);

  useEffect(() => {
    const localSetCountersHistory = async () => {
      const resultGetHistory = await getCountersHistory();

      if (!resultGetHistory || !resultGetHistory.status) {
        return alert(resultGetHistory?.message || 'Cant make getCountersHistory');
      }

      setCountersHistory(resultGetHistory.result);
    };

    localSetCountersHistory();
  }, []);

  return (
    <>
      <Header setAuthToken={setAuthToken} />

      <div className={join('container', styles.HistoryPage)}>
        <div className={join('col-12', styles.CountersContainer)}>
          { countersHistory.map(counter =>
            <div
              key={counter._id}
              className={join('col-1', styles.Counter)}
            >
              <h4>{counter.value}</h4>
              <span>{toFormatTime(new Date(counter.createdAt))}</span>
            </div>)
          }
        </div>
      </div>
    </>
  );
};

export default HistoryPage;
