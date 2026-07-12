import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'EgoBMZ Portfolio';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  // Read the local PNG logo
  const logoData = await fetch(new URL('../public/logo-transparent.png', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          background: '#09090b',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logoData as any}
          width="400"
          height="400"
          style={{ objectFit: 'contain' }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
