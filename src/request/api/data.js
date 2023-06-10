import service from '..';

export function get(url, params) {
    return service.get(url, { params });
  }
  
  export function post(url, data) {
    return service.post(url, data);
  }