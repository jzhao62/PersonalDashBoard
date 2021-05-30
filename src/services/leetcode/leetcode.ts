import { request } from 'umi';

const ENDPOINT =
  process.env.API_ENV === 'dev'
    ? 'local'
    : 'https://56xljbuw49.execute-api.us-east-1.amazonaws.com/dev';

export const getAllQuestions = async (): Promise<LeetCode.question[]> => {
  return request<LeetCode.question[]>(`${ENDPOINT}/items`, {
    method: 'GET',
  });
};

export const createQuestion = async (payload: LeetCode.questionPayload) => {
  return request<LeetCode.questionPayload>(`${ENDPOINT}/items`, {
    method: 'POST',
    data: payload,
  });
};

