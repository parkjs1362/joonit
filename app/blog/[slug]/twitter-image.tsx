import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/posts';
import { siteConfig } from '@/lib/config';
import { getGoogleFont } from '@/lib/og';

export const runtime = 'nodejs';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

function getAccent(category?: string): { a: string; b: string } {
  switch (category) {
    case '역사':
      return { a: '#F97316', b: '#FB7185' };
    case '일상':
      return { a: '#34D399', b: '#22C55E' };
    case '개발':
      return { a: '#60A5FA', b: '#2563EB' };
    default:
      return { a: '#A78BFA', b: '#6366F1' };
  }
}

export default async function BlogPostTwitterImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPostBySlug(params.slug);

  const title = post?.frontmatter.title ?? 'Joonit';
  const description = post?.frontmatter.description ?? siteConfig.description;
  const category = post?.frontmatter.category ?? '블로그';
  const date = post?.frontmatter.date ?? '';
  const accent = getAccent(post?.frontmatter.category);

  const text = `${siteConfig.title} ${title} ${description} ${category} ${date} ${new URL(siteConfig.url).host}`;
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
          background: `radial-gradient(circle at 18% 20%, ${accent.a}55 0%, rgba(11,18,32,1) 72%), radial-gradient(circle at 78% 30%, ${accent.b}66 0%, rgba(11,18,32,0) 60%), linear-gradient(135deg, rgba(11,18,32,1) 0%, rgba(15,23,42,1) 45%, rgba(2,6,23,1) 100%)`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 55% 55%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 58%)',
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
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.14)',
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
                  background: accent.a,
                  boxShadow: `0 0 0 6px ${accent.a}33`,
                }}
              />
              {category}
              {date ? (
                <span style={{ opacity: 0.72, letterSpacing: 1 }}>{date}</span>
              ) : null}
            </div>

            <div
              style={{
                marginTop: 26,
                fontSize: 66,
                lineHeight: 1.08,
                fontWeight: 800,
                letterSpacing: -2,
                color: '#ffffff',
                maxWidth: 860,
              }}
            >
              {title}
            </div>

            {description ? (
              <div
                style={{
                  marginTop: 18,
                  maxWidth: 820,
                  fontSize: 26,
                  lineHeight: 1.45,
                  color: 'rgba(255,255,255,0.78)',
                }}
              >
                {description}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: 'rgba(255,255,255,0.60)',
              fontSize: 20,
            }}
          >
            <span>{siteConfig.title}</span>
            <span>Twitter Card</span>
          </div>
        </div>

        <div
          style={{
            width: 360,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: 300,
              height: 300,
              borderRadius: 84,
              border: '1px solid rgba(255,255,255,0.14)',
              background: `radial-gradient(circle at 30% 20%, ${accent.a} 0%, ${accent.b} 45%, rgba(11,18,32,1) 100%)`,
              boxShadow: '0 30px 90px rgba(0,0,0,0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                fontSize: 196,
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
