import useSWR from 'swr';

import api from '../services/api';

export async function useFetch<Data = any>(
  url: string,
  token: string,
): Promise<Data[] | undefined> {
  try {
    const { data } = await api.get<Data[]>(`${url}`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
