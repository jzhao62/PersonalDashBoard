import { request } from 'umi';

const ENDPOINT =
  process.env.API_ENV === 'dev'
    ? 'local'
    : 'https://56xljbuw49.execute-api.us-east-1.amazonaws.com/dev';

console.log(process.env.API_ENV)

export const getAllQuestions = async (): Promise<LeetCode.questionItem[]> => {
  return request<LeetCode.questionItem[]>(`${ENDPOINT}/items`, {
    method: 'GET',
  });
};

export const createQuestion = async (payload: LeetCode.itemPayload) => {
  return request<LeetCode.itemPayload>(`${ENDPOINT}/items`, {
    method: 'POST',
    data: payload,
  });
};

export const editQuestion = async (payload: LeetCode.itemPayload, id?: string) => {
  return request<LeetCode.itemPayload>(`${ENDPOINT}/items/${id}`, {
    method: 'PUT',
    data: payload,
  });
};

export const deleteQuestion = async (id: string) => {
  return request(`${ENDPOINT}/items/${id}`, {
    method: 'DELETE',
  });
};
