import _ from 'lodash';
import { API_URI } from 'constants/index';
import { convertObjPath, timestamp } from 'utils/helper';

// Service : GET ------------------------- */
export async function GET(url: string, external?: boolean, all?: boolean): Promise<any> {
  const _url: string = external ? `${url}` : `${API_URI}${url}`;

  try {
    const response: Response = await fetch(_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain' // Solved issues call OPTIONS
      }
    });

    if (!response.ok) {
      throw new TypeError('Network response was not OK');
    }
    // console.log('GET', response, _url);
    const data: any = await response.json();
    // If don't have data return [];
    // If have data return [{ id: 1 }] or { data: [] }
    // If can't call api return { data: null, msg: null }
    // console.log(timestamp(), _url, ':');
    if (!data.msg) {
      if (!_.isEmpty(data.data)) {
        return all ? { ...data } : data.data;
      }
      return data;
    }
    return [];
  } catch (err: any) {
    console.log(`${timestamp()} ===========> GET_ERROR : ${_url}`);
    console.log(`${err.message}`);
    return [];
  }
}

export async function GET_ARTICLES(url = '', external = false, all = false) {
  const _url = external ? `${url}` : `${API_URI}${url}`;

  try {
    const response = await fetch(_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain' // Solved issues call OPTIONS
      }
    });

    if (!response.ok) {
      throw new TypeError('Network response was not OK');
    }
    const data = await response.json();
    // console.log('GET_ARTICLES', _url);
    if (data?.statusCode === 404) {
      return data;
    } else if (!_.isEmpty(data?.data)) {
      return all ? { ...data } : data?.data;
    }
    return all ? { ...data } : [];
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`${timestamp()} ==========>  GET_ARTICLES ERROR : `, error.message);
    }
  }
}
