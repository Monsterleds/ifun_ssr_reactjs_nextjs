import useSWR from 'swr';
import lscache from 'lscache';

import api from '../services/api';

export async function useFetch<Data = any>(
  url: string,
  token: string,
): Promise<Data> {
  try {
    const { data } = await api.get<Data>(`${url}`, {
      headers: { authorization: `Bearer ${token}` },
    });

    return data;
  } catch (err) {
    if (err.response) {
      console.error(err.response);

      if (err.response.status === 401 || err.response.status === 400) {
        lscache.remove('@ifun/token');
        lscache.remove('@ifun/user');
        window.location.reload();
      }
      throw err.response.data;
    }

    throw new Error(
      'Erro ao criar uma query no banco de dados, possívelmente offline',
    );
  }
}
