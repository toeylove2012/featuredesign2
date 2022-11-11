import _ from 'lodash';
import { TChild } from 'redux/reducers/member';

export const dateFormatter = (date: Date): string => {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = date.getFullYear();

  const dateString = yyyy + '-' + mm + '-' + dd;
  return dateString;
};
export const LANGUAGE = {
  EN: 'name_en',
  TH: 'name_th'
};
export const KEY_LANGUAGE = {
  TH: 'TH',
  EN: 'en-US'
};
export function ConvertLocale(locale: string): string {
  return locale === 'en-US' ? 'EN' : locale;
}
export const showPassword = (className: any) => {
  const inputID: any = document.querySelector(`.${className}`);
  if (inputID.type === 'password') {
    inputID.type = 'text';
  } else {
    inputID.type = 'password';
  }
};
export const matchPassword = () => {
  const pw1: any = document.querySelector('.Password');
  const pw2: any = document.querySelector('.Confirm-Password');
  const text: any = document.querySelector('.match-password-text');

  if (pw1.value !== pw2.value) {
    text != null && text.setAttribute('style', 'display:block;');
  } else {
    text != null && text.setAttribute('style', 'display:none;');
  }
};

export const processingObject = (obj: any) => {
  console.log('processingObject', obj);
  obj.name = obj.firstName + ' ' + obj.lastName;

  obj.provinceName = obj.province;
  obj.districtName = obj.district;
  obj.subdistrictName = obj.subdistrict;
  obj.postCode = obj.zip_code;

  delete obj.firstName;
  delete obj.lastName;
  delete obj.province;
  delete obj.district;
  delete obj.subdistrict;
  delete obj.zip_code;
};

export const convertFollowing = (selected: TChild[], value: TChild) => {
  if (filterFollowing(selected, value)) {
    return 'กำลังติดตาม';
  } else {
    return 'ติดตาม';
  }
};

export const filterFollowing = (selected: TChild[], value: any) => {
  if (!_.isEmpty(selected)) {
    const result = _.find(selected, { nameTh: value?.nameTh?.trim() || '' });
    // console.log('filterFollowing', selected, value, result);
    if (!_.isEmpty(result)) {
      return true;
    } else {
      return false;
    }
  }
  return false;
};

export function incrementItem(array: TChild[], item: TChild) {
  // console.log('incrementItem', array);

  return [...array].concat(item);
}
export function decrementItem(array: TChild[], item: TChild) {
  // console.log('#1 decrementItem', item);
  return [...array].filter(el => el.nameTh !== item.nameTh);
}

export function convertFavorite(array: any, field: string): string[] {
  const result = [];
  for (let i = 0; i < array.length; i++) {
    if (!_.isEmpty(array[i]?.[field])) result.push(array[i]?.[field] || '');
  }
  return result || [];
}

export const findIdx = (arr: any, value: string | number | undefined, field: string) => {
  const result = arr.filter((item: any) => {
    return item[field].toString() === value;
  });
  return result;
};
