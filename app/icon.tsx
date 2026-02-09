import { ImageResponse } from 'next/og';

export const size = {
  width: 64,
  height: 64,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 16,
          background:
            'radial-gradient(circle at 30% 20%, #93C5FD 0%, #2563EB 45%, #0B1220 100%)',
          color: '#ffffff',
          fontSize: 42,
          fontWeight: 800,
          letterSpacing: -2,
        }}
      >
        J
      </div>
    ),
    size,
  );
}

