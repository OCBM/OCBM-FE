import { store } from '@/redux/store';
import customFetch from '@/utils/fetcher';

export async function addUser(body: any) {
  const state = store.getState();
  const token = state.user?.user?.accessToken;
  console.log(state, 'state');
  const result = await customFetch.post('/user/create', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(result, 'result');
}
