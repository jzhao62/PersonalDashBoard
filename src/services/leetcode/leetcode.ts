import { request } from 'umi';

const ENDPOINT =
  process.env.API_ENV === 'dev'
    ? 'local'
    : 'https://56xljbuw49.execute-api.us-east-1.amazonaws.com/dev';

export async function getAllQuestions() {

  return request<LeetCode.question>(`${ENDPOINT}/items`, {
    method: 'GET',
  });
}
