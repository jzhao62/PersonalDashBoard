import {request} from 'umi'


export async function getAllQuestions() {
  return request<LeetCode.question>('/flask_api/items', {
    method: 'GET'
  })
}
