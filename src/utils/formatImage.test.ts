import React from 'react';
import { formatImage } from './formatImage';

describe('fungsi formatImage - menampilkan avatar dari URL atau inisial', () => {
  it('mengembalikan inisial ketika nilai gambar null atau kosong', () => {
    const result = formatImage(null, 'Andi') as React.ReactElement<any>;
    const resultNamaKosong = formatImage(null, '') as React.ReactElement<any>;

    expect(React.isValidElement(result)).toBe(true);
    expect(result.props.children).toBe('A');
    expect(React.isValidElement(resultNamaKosong)).toBe(true);
    expect(resultNamaKosong.props.children).toBe('—');
  });

  it('mengembalikan elemen img ketika nilai gambar tersedia', () => {
    const url = 'http://example.com/avatar.png';
    const name = 'Budi';

    const element = formatImage(url, name);

    expect(React.isValidElement(element)).toBe(true);
    const imgElement = element as React.ReactElement<any>;
    expect(imgElement.type).toBe('img');
    expect(imgElement.props.src).toBe(url);
    expect(imgElement.props.alt).toBe(name);
    expect(imgElement.props.className).toContain('rounded-full');
  });
});
