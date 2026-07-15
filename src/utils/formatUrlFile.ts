import useTemporaryApiStore from '@/stores/useTemporaryApiStore';
import { env } from '@/config/env';

export function formatUrlFile(url: string) {
  if (url.startsWith('http')) {
    return url;
  }
  const tempApiUrl = useTemporaryApiStore.getState().apiUrl;
  const baseUrl = tempApiUrl || env.apiUrl;
  return `${baseUrl}/storage/${url}`;
}
