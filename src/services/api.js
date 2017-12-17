/**
 * API Helper Method
 */
import {camelizeKeys} from 'humps';
import each from 'lodash/each';
import Cookies from 'universal-cookie';
const cookies = new Cookies();


export const API_ROOT = '/api/v1/';

function makeQueryString(params) {
  const body = [];

  if( !params ){
    return '';
  }

  each(params, (value, key) => {
    body.push(`${key}=${value}`);
  });
  return body.join('&');
}
export function makeURL(method, endpoint, params) {

  const queryString = makeQueryString(params);
  const url = /^(\/|http)/.test(endpoint) ? endpoint : API_ROOT + endpoint;

  switch (method) {
    case 'GET': {
      if (0 < url.indexOf('?')) {
        return url + '&' + queryString;
      }

      return queryString ? `${url}/?${queryString}` : url;
    }

    case 'DELETE':
    case 'POST':
    case 'PUT': {
      return url.replace(/\?.*/, '');
    }

    default:
      return new Error('이런 케이스가 오면 안돼!!');
  }
}

function makeHeaders() {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  headers.append('X-CSRFToken', cookies.get('csrftoken'));

  return headers;
}

function makeBody(params) {
  return JSON.stringify(params)
}

function callAPI(endpoint, method = 'GET', params) {

  const fullUrl = makeURL(method, endpoint, params);
  const headers = makeHeaders();
  const body = makeBody(params);
  const options = {method, headers, credentials: 'same-origin', body};

  return fetch(fullUrl, options)
    .then(response => response.json().then(json => ({json, response})))
    .then(({json, response}) => {

      if (!response.ok) {
        return Promise.reject(json)
      }

      const camelizedJson = camelizeKeys(json);
      return Object.assign({}, {success: camelizedJson})
    })
    .then(
      response => ( response ),
      error => ({error: error.message || 'Something bad happened'})
    )
}

/**
 * API 목록
 * 호출 API를 메소드 이름으로 받고, 던져야하는 파라메터를 인자로 받아서 callAPI를 호출한다.
 */
//export const test = (endpoint) => callAPI('/hello');
export const login = (username, password) => callAPI('/auth/', 'POST', {username, password});
export const checkLogin = (username, password) => callAPI('/auth/', 'GET');
export const logout = () => callAPI('/auth/', 'DELETE');


export const testLogin = () => {
  return sleep(1000, () => {
    return {
      success: {
        "username": "roto",
        "email": "roto@roto.co.kr",
        "is_staff": true,
        "is_superuser": true
      }
    }
  });
};

export const test = () => {
  return sleep(1000, () => {
    return {
      error: {
        code: 'E2322345',
        message: '에러일 경우 error로 한번 감싸서 반환한다.'
      }
    }
  });
};

function sleep(delay, fn) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), delay)
  })
}
