import styled from '@emotion/styled';
import _ from 'lodash';
import { useTheme } from 'next-themes';
import { useState } from 'react';

const SwitchThemes = () => {
  const { theme, setTheme } = useTheme();

  const [themes, setThemes]: any = useState(theme || 'default');
  const [toggle, setToggle]: any = useState(false);
  const WebNemethemes = ['default', 'thansettakij', 'springnews', 'posttoday', 'bangkokbiznews', 'komchadluek', 'nationthailand', 'thepeople', 'nationtv', 'tnews', 'khobsanam', 'thainewsonline'];
  return (
    <ThemesWrappre className={`select-themes ${toggle ? '--full' : '--hide'}`}>
      <div className='select2 animated zoomIn'>
        <label>
          <input
            type='checkbox'
            name='placeholder'
            onClick={() => {
              setToggle(!toggle);
            }}
          />
          <i className='toggle icon icon-plus'></i>
          <i className='toggle icon icon-minus'></i>
          <span className='placeholder'>{themes}</span>
          <small>***เปลี่ยนตรงนี้เปลี่ยนได้แค่สีเท่านั้นข้อมูลจะไม่เปลี่ยน***</small>
          {_.map(WebNemethemes, (name, i) => (
            <label
              className='option'
              key={i}
              onClick={() => {
                setTheme(name);
                setThemes(name);
              }}
            >
              <input type='radio' name='option' />
              <span className='title animated fadeIn'>
                {/* <i className='icon icon-speedometer'></i> */}
                {name}
              </span>
            </label>
          ))}
        </label>
      </div>
    </ThemesWrappre>
  );
};

export default SwitchThemes;

const ThemesWrappre = styled.div`
  &.select-themes {
    position: fixed;
    top: 250px;
    z-index: 6;
    &.--full {
      right: 0;
    }
    &.--hide {
      right: -280px;
    }
    p {
      text-align: center;
      color: #fff;
      font-size: 14px;
      margin-bottom: 2em;
      line-height: 30px;
      img {
        position: relative;
        top: 8px;
        right: 10px;
      }
    }
    small {
      color: red;
    }
    span {
      text-transform: capitalize;
    }
    .select2 {
      background: #fff;
      position: relative;
      overflow: hidden;
      display: block;
      margin: auto;
      width: 330px;
      height: 100%;
      border-bottom: 0px;
      border-radius: 3px;
      font-size: 12px;
      box-shadow: 0px 1em 2em -1.5em rgba(0, 0, 0, 0.5);
      i.toggle {
        position: absolute;
        z-index: 4;
        right: 1.5em;
        top: 1.6em;
        color: #ccc;
      }
      .title,
      .placeholder {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        padding: 1.5em 2em;
        background: rgba(255, 255, 255, 1);
        border-top: 1px solid rgba(0, 0, 0, 0.05);
        cursor: pointer;
      }
      & > label > input {
        position: absolute;
        left: 0px;
        top: 0px;
        z-index: 2;
        width: 100%;
        height: 100%;
        display: block;
        opacity: 0;
        cursor: pointer;
        &:checked {
          z-index: 2;
          ~ i.toggle.icon-plus {
            display: none;
          }
          ~ i.toggle.icon-minus {
            display: block;
          }
        }
        &:not(:checked) {
          ~ i.toggle.icon-minus {
            display: none;
          }
          ~ i.toggle.icon-plus {
            display: block;
          }
          ~ label.option input:not(:checked) ~ .title {
            display: none !important;
          }
        }
        &:disabled {
          cursor: no-drop;
        }
      }
      & label > span.placeholder {
        position: relative;
        z-index: 2;
        display: inline-block;
        width: 100%;
        color: var(--text-color);
        border-top: 0px;
        background: var(--primary-color);
      }
      label.option {
        display: block;
        overflow: hidden;
        z-index: 1;
        width: 100%;
        transition: all 1s ease-out;
        span.title {
          position: relative;
          z-index: 2;
          transition: background 0.3s ease-out;
          i.icon {
            padding-right: 8px;
            color: #fff;
          }
          &:hover {
            color: var(--text-color);
            background: var(--primary-color);
            box-shadow: inset 0px 1px 0px rgba(0, 0, 0, 0.1);
          }
        }
        input {
          display: none;
          &:checked ~ span.title {
            position: absolute;
            display: block;
            z-index: -1;
            top: 0px;
            font-size: 12px;
            background: #fff;
            border-top: 0px;
            box-shadow: none;
            color: inherit;
            width: 100%;
          }
          &:disabled {
            & ~ span.title {
              background: #f9f9f9 !important;
              color: #aaa;
              &:hover {
                color: #aaa;
                background: none;
                cursor: no-drop;
              }
            }
          }
        }
      }
    }
  }
`;
