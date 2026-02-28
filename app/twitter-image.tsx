import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/config';
import { getGoogleFont } from '@/lib/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function TwitterImage() {
  const text = `${siteConfig.title} ${siteConfig.description} ${new URL(siteConfig.url).host}`;
  const fontBold = await getGoogleFont({
    family: 'Noto Sans KR',
    weight: 800,
    text,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          padding: 64,
          background:
            'radial-gradient(circle at 22% 18%, rgba(147,197,253,0.95) 0%, rgba(37,99,235,0.70) 35%, rgba(11,18,32,1) 78%)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 84% 30%, rgba(96,165,250,0.22) 0%, rgba(96,165,250,0) 62%)',
          }}
        />

        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.16)',
                background: 'rgba(255,255,255,0.06)',
                color: 'rgba(255,255,255,0.86)',
                fontSize: 18,
                letterSpacing: 3,
                textTransform: 'uppercase',
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 999,
                  background: '#60a5fa',
                  boxShadow: '0 0 0 6px rgba(96,165,250,0.18)',
                }}
              />
              {siteConfig.title}
            </div>

            <div
              style={{
                marginTop: 28,
                fontSize: 70,
                lineHeight: 1.05,
                fontWeight: 800,
                letterSpacing: -2,
                color: '#ffffff',
              }}
            >
              개발, 경제, 역사, 그리고 일상
            </div>

            <div
              style={{
                marginTop: 18,
                maxWidth: 760,
                fontSize: 28,
                lineHeight: 1.45,
                color: 'rgba(255,255,255,0.82)',
              }}
            >
              {siteConfig.description}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'rgba(255,255,255,0.64)',
              fontSize: 20,
              letterSpacing: 0.2,
            }}
          >
            <span>{new URL(siteConfig.url).host}</span>
            <span style={{ opacity: 0.9 }}>Twitter Card</span>
          </div>
        </div>

        <div
          style={{
            width: 380,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 320,
              height: 320,
              borderRadius: 84,
              background:
                'radial-gradient(circle at 30% 20%, #93C5FD 0%, #2563EB 45%, #0B1220 100%)',
              border: '1px solid rgba(255,255,255,0.16)',
              boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 210,
                fontWeight: 800,
                letterSpacing: -12,
                color: '#ffffff',
              }}
            >
              J
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Noto Sans KR',
          data: fontBold,
          weight: 800,
          style: 'normal',
        },
      ],
    },
  );
}
