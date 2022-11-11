import { useRef, useState } from 'react';
import qs from 'qs';
import { FaSearch } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import { NextPage } from 'next';
import { RECAPTCHA_SITE_KEY } from 'constants/index';
import { useForm } from 'react-hook-form';

import { ISearchParams } from 'interface/widgets';
import styled from '@emotion/styled';
import { splitRote } from 'utils/helper';
import { NextRouter, useRouter } from 'next/router';

const WidgetSearchFullPage: NextPage = () => {
  const searchBoxRef = useRef<any>();
  const recaptchaRef = useRef<any>(null);

  // const [textSearch, setTextSearch] = useState<string | null>(null);
  const [recaptchaBox, setRecaptchaBox] = useState<boolean>(false);
  const [toggleSearch, setToggleSearch] = useState<boolean>(false);
  const { register, handleSubmit, watch } = useForm();
  const router: NextRouter = useRouter();
  const textSearch = watch('textSearch');

  const recaptchaSearch = textSearch;
  const onSearch = () => {
    setRecaptchaBox(true);
  };

  const onReCAPTCHAChange = async (captchaCode: string | null): Promise<void | null> => {
    if (!captchaCode) return null;

    try {
      const response: Response = await fetch('/api/search/recaptcha', {
        method: 'POST',
        body: JSON.stringify({ textSearch: recaptchaSearch, captcha: captchaCode }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setRecaptchaBox(false);
        const searchParams: ISearchParams = {
          q: textSearch || ''
        };

        const params: string = qs.stringify(searchParams, {
          encodeValuesOnly: true,
          arrayFormat: 'brackets'
        });
        window.location.href = `${splitRote(router)}/search?${params}`;
      } else {
        const error: any = await response.json();
        throw new Error(error.message);
      }
    } catch (err: any) {
      alert(err?.message || 'Something went wrong');
      setRecaptchaBox(false);
    } finally {
      recaptchaRef.current = null;
      setRecaptchaBox(false);
    }
  };
  return (
    <>
      <WidgetWrapper className='widget-search-all'>
        {/* {toggleSearch && ( */}
        <div id='search-wrap'>
          <form ref={searchBoxRef} onSubmit={handleSubmit(onSearch)} action='' autoComplete='on'>
            <input type='text' {...register('textSearch')} className='search-input' placeholder='ค้นหา...' autoFocus />
            <div
              className={`button-search ${toggleSearch === true ? '--active' : '--inactive'}`}
              onClick={() => {
                textSearch?.length > 0 && onSearch();
              }}
            >
              <FaSearch />
            </div>
          </form>
        </div>
        {recaptchaBox && (
          <SearchPopUp onClick={() => setToggleSearch(false)}>
            <div className='recaptcha-box'>
              <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={onReCAPTCHAChange} />
            </div>
          </SearchPopUp>
        )}
      </WidgetWrapper>
    </>
  );
};
const WidgetWrapper = styled.div`
  display: block;

  #search-wrap {
    display: inline-block;
    position: relative;
    height: auto;
    float: right;
    padding: 0;
    position: relative;

    input[type='text'] {
      cursor: pointer;
      height: 38px;
      font-size: 16px;
      display: inline-block;
      font-family: 'Prompt', sans-serif;
      font-weight: 100;
      border: none;
      outline: none;
      color: #2e2e2e;
      padding: 0 20px;
      width: 0px;
      position: absolute;
      top: 5px;
      right: 0;
      background: none;
      z-index: 3;
      cursor: pointer;
      transition: width 0.5s cubic-bezier(0, 0.795, 0, 1);
    }

    .button-search {
      cursor: pointer;
      position: relative;
      display: block;
      z-index: 5;
      user-select: none;
      svg {
        vertical-align: middle;
        height: 48px;
        width: 48px;
        padding: 14px;
        margin-right: 0px;
        color: var(--text-color);
      }
    }
    &:focus:hover {
      input[type='text'] {
        border-bottom: 1px solid #bbb;
        background-color: #fff;
      }
    }

    &:focus,
    &:hover {
      input[type='text'] {
        width: 300px;
        z-index: 1;
        border-bottom: 1px solid #bbb;
        background-color: #fff;
        border-radius: 30px;
        cursor: text;
        @media (max-width: 767px) {
          width: 170px;
        }
      }
      .button-search svg {
        color: #2e2e2e;
      }
    }
  }
`;

const SearchPopUp = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 999;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  animation: fadeIn ease 0.2s;
  -webkit-animation: fadeIn ease 0.2s;
  -moz-animation: fadeIn ease 0.2s;
  -o-animation: fadeIn ease 0.2s;
  -ms-animation: fadeIn ease 0.2s;
  .recaptcha-box {
    position: relative;
    width: 100%;
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.6); */
    z-index: 99;

    &.--small {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.9);
    }

    iframe {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
export default WidgetSearchFullPage;
