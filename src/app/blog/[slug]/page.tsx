'use client';
import { notFound } from 'next/navigation';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { posts } from '../data/posts';

export default function BlogPostPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const post = posts.find((p) => p.slug === slug);
  if (!post) return notFound();

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <style>{`
        .post-hero {
          background: #061322;
          padding: 100px 60px 80px;
          font-family: var(--font-outfit-var), Outfit, sans-serif;
        }
        .post-content-wrap {
          background: white;
          padding: 60px 60px;
          font-family: var(--font-outfit-var), Outfit, sans-serif;
        }
        .post-content h2 {
          font-size: 26px;
          font-weight: 700;
          color: #061322;
          margin: 36px 0 12px;
        }
        .post-content p {
          font-size: 17px;
          color: #4A5568;
          line-height: 1.8;
          margin-bottom: 20px;
        }
        .post-content strong {
          color: #061322;
        }
        @media (max-width: 768px) {
          .post-hero {
            padding: 60px 20px !important;
          }
          .post-content-wrap {
            padding: 60px 20px !important;
          }
        }
      `}</style>

      <Nav />

      {/* Hero */}
      <div className="post-hero">
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          {/* Category tag */}
          <div
            style={{
              display: 'inline-block',
              fontSize: '10px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#4A9FE8',
              background: 'rgba(74,159,232,0.15)',
              borderRadius: '4px',
              padding: '4px 8px',
              marginBottom: '20px',
            }}
          >
            {post.category}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: '44px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-1px',
              marginBottom: '24px',
            }}
          >
            {post.title}
          </h1>

          {/* Meta */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
              {formattedDate}
            </span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>·</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
              {post.readTime}
            </span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>·</span>
            <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>
              {post.author}
            </span>
          </div>
        </div>
      </div>

      {/* Hero image */}
      {post.imageUrl && (
        <div style={{ background: '#0A1E38', padding: '0 60px 60px' }}>
          <div style={{ maxWidth: '720px', margin: '0 auto', borderRadius: '16px', overflow: 'hidden', height: '400px' }}>
            <img src={post.imageUrl} alt={post.imageAlt || post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="post-content-wrap">
        <div
          style={{ maxWidth: '720px', margin: '0 auto' }}
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>

      {/* CTA */}
      <div
        style={{
          background: '#1565C0',
          padding: '80px 60px',
          textAlign: 'center',
          fontFamily: 'var(--font-outfit-var), Outfit, sans-serif',
        }}
      >
        <div style={{ maxWidth: '560px', margin: '0 auto' }}>
          <h2
            style={{
              fontSize: '36px',
              fontWeight: 800,
              color: 'white',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
            }}
          >
            Ready to stop missing calls?
          </h2>
          <p
            style={{
              fontSize: '16px',
              color: 'rgba(255,255,255,0.75)',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            TalkMate answers every call in 2 seconds, 24/7 — so you never lose a customer to voicemail again.
          </p>
          <Link
            href="/demo"
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#1565C0',
              fontSize: '16px',
              fontWeight: 700,
              padding: '16px 36px',
              borderRadius: '10px',
              textDecoration: 'none',
              fontFamily: 'var(--font-outfit-var), Outfit, sans-serif',
            }}
          >
            Book a Free Demo →
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}
