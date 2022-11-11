import ReCAPTCHA from 'react-google-recaptcha';
import { NextPage } from 'next';
import { FaSearch } from 'react-icons/fa';
import { ChangeEvent, memo, useRef, useState } from 'react';

import { RECAPTCHA_SITE_KEY } from 'constants/index';
import styled from '@emotion/styled';
import { splitRote } from 'utils/helper';
import { NextRouter, useRouter } from 'next/router';

const WidgetSearch: NextPage = () => {
  const recaptchaRef = useRef(null);
  const [textSearch, setTextSearch] = useState<string | null>('ข่าวล่าสุด');
  const [recaptchaBox, setRecaptchaBox] = useState<boolean>(false);
  const router: NextRouter = useRouter();
  const handleSearch = (e: any) => {
    e.preventDefault();
    setRecaptchaBox(true);
  };
  const onReCAPTCHAChange = async (captchaCode: any) => {
    if (!captchaCode) return null;

    try {
      const response = await fetch('/api/search/recaptcha', {
        method: 'POST',
        body: JSON.stringify({ textSearch, captcha: captchaCode }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setRecaptchaBox(false);
        window.location.href = `${splitRote(router)}/search?q=${textSearch}`;
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (err: any) {
      alert(err?.message || 'Something went wrong');
      setRecaptchaBox(false);
    } finally {
      recaptchaRef.current = null;
      setTextSearch('');
      setRecaptchaBox(false);
    }
  };

  return (
    <WidgetWrapper className='widget-search'>
      <form onSubmit={handleSearch} className='search-box'>
        {recaptchaBox && (
          <div className='recaptcha-background'>
            <div className='recaptcha-box --small'>
              <ReCAPTCHA
                ref={recaptchaRef}
                // size='invisible'
                sitekey={RECAPTCHA_SITE_KEY}
                onChange={onReCAPTCHAChange}
              />
            </div>
          </div>
        )}
        <button type='submit' aria-label='Search Submit' className='search-submit'>
          <FaSearch size={20} />
        </button>
        <input className='search-input' type='text' onChange={(e: ChangeEvent<HTMLInputElement>) => setTextSearch(e.target.value)} placeholder='ค้นหา...' autoFocus />
      </form>
    </WidgetWrapper>
  );
};

export default memo(WidgetSearch);

const WidgetWrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  padding-bottom: 30px;
  .search-box {
    margin-right: auto;
    position: relative;
    .search-submit {
      height: 48px;
      width: 74px;
      color: var(--primary-color);
      cursor: pointer;
      vertical-align: middle;
      border: #f0f0f0;
    }
    .search-input {
      height: 48px;
      width: calc(100% - 74px);
      border: 2px solid #f0f0f0;
      font-family: 'Prompt', sans-serif;
      vertical-align: middle;
      padding-left: 20px;
      padding-right: 18px;
      outline: none;
      font-size: 18px;
      font-weight: 400;
    }
  }
  .recaptcha-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 999;
    background: rgba(0, 0, 0, 0.4);
    padding: 20px;
    animation: fadeIn ease 0.2s;
    -webkit-animation: fadeIn ease 0.2s;
    -moz-animation: fadeIn ease 0.2s;
    -o-animation: fadeIn ease 0.2s;
    -ms-animation: fadeIn ease 0.2s;
    .recaptcha-box {
      position: fixed;
      z-index: 99;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
