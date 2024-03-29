// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** addCredit POST /api/credit/add */
export async function addCreditUsingPost(
  body: API.CreditAddRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseLong_>('/api/credit/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** deleteCredit POST /api/credit/delete */
export async function deleteCreditUsingPost(
  body: API.DeleteRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/credit/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** editCredit POST /api/credit/edit */
export async function editCreditUsingPost(
  body: API.CreditEditRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/credit/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** getCreditById GET /api/credit/get */
export async function getCreditByIdUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getCreditByIdUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseCredit_>('/api/credit/get', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** listCreditByPage POST /api/credit/list/page */
export async function listCreditByPageUsingPost(
  body: API.CreditQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCredit_>('/api/credit/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** listMyCreditByPage POST /api/credit/my/list/page */
export async function listMyCreditByPageUsingPost(
  body: API.CreditQueryRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponsePageCredit_>('/api/credit/my/list/page', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** signCredit GET /api/credit/sign */
export async function signCreditUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseBoolean_>('/api/credit/sign', {
    method: 'GET',
    ...(options || {}),
  });
}

/** updateCredit POST /api/credit/update */
export async function updateCreditUsingPost(
  body: API.CreditUpdateRequest,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseBoolean_>('/api/credit/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
