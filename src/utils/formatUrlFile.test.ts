import { formatUrlFile } from './formatUrlFile';

// env.apiUrl di-mock lewat __mocks__/envMock.ts (jest.config.mjs moduleNameMapper) -> 'http://api.test'
describe('fungsi formatUrlFile - membentuk URL file dari API atau absolute URL', () => {
  it('mengembalikan URL apa adanya jika sudah diawali http', () => {
    const httpUrl = 'http://example.com/file.png';
    const httpsUrl = 'https://example.com/file.png';

    expect(formatUrlFile(httpUrl)).toBe(httpUrl);
    expect(formatUrlFile(httpsUrl)).toBe(httpsUrl);
  });

  it('menggabungkan VITE_API_URL dengan path storage untuk URL relatif', () => {
    const result = formatUrlFile('files/avatar.png');

    expect(result).toBe('http://api.test/storage/files/avatar.png');
  });
});
