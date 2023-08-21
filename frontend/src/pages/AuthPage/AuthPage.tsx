import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { join, HelperLib } from '../../libs/helper.lib';

import { loginRequest } from '../AuthPage/AuthPage.api';

import { IAuthPageProps } from './AuthPage.props';

import styles from './AuthPage.module.scss';

const AuthPage = ({ setAuthToken }: IAuthPageProps) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@mail.ua');
  const [password, setPassword] = useState('password');

  const [isActiveEmailValidationError, setIsActiveEmailValidationError] = useState(false);
  const [isActivePasswordValidationError, setIsActivePasswordValidationError] = useState(false);

  const runValidation = () => {
    if (!email || !HelperLib.isEmail(email)) {
      setEmail('');
      setIsActiveEmailValidationError(true);
    } else {
      setIsActiveEmailValidationError(false);
    }
    
    if (!password) {
      setIsActivePasswordValidationError(true);
    } else {
      setIsActivePasswordValidationError(false);
    }

    return email && password;
  };

  const loginUser = async () => {
    if (!runValidation()) {
      return;
    }

    const resultLogin = await loginRequest({ email, password });

    if (!resultLogin || !resultLogin.status) {
      return alert(resultLogin?.message || 'Cant make loginRequest');
    }

    setAuthToken(resultLogin.result);
    return navigate('/');
  };

  return (
    <div className={join('container', styles.AuthPage)}>
      <div
        className={join('col-12', styles.FormContainer)}
        style={{ height: window.innerHeight }}
      >
        <div className={join('col-3', 'form', styles.Form)}>
          <div className='col-12 mx-auto'>
            <div className='mb-3'>
              <label className='form-label'>Email:</label>
              <div className='input-group'>
                <input
                  type='email'
                  className={join('form-control', isActiveEmailValidationError && 'is-invalid')}
                  tabIndex={1}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <div className='invalid-feedback'>Поле має бути заповнено</div>
              </div>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Пароль:</label>
              <div className='input-group'>
                <input
                  type='password'
                  className={join('form-control', isActivePasswordValidationError && 'is-invalid')}
                  tabIndex={2}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <div className='invalid-feedback'>Поле має бути заповнено</div>
              </div>
            </div>
          </div>

          <hr className='mt-1 mb-1'/>

          <div className={join('col-12', styles.ButtonActions)}>
            <button
              className='btn btn-primary col-6'
              tabIndex={3}
              onClick={() => loginUser()}
            >Увійти</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
