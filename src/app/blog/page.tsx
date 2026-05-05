'use client';
import { useState } from 'react';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { posts } from './data/posts';

export default function BlogPage() {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  return (
    <>
      <style>{`
        .blog-hero {
          background: #061322;
          padding: 100px 60px 80px;
          text-align: center;
          font-family: var(--font-outfit-var), Outfit, sans-serif;
        }
        .blog-section {
          background: white;
          padding: 80px 60px;
          font-family: var(--font-outfit-var), Outfit, sans-serif;
        }
        .blog-grid {
          max-width: 1100px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 768px) {
          .blog-hero {
            padding: 60px 20px !important;
          }
          .blog-section {
            padding: 60px 20px !important;
          }
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Nav />

      {/* Hero */}
      <div className="blog-hero">
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <div
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#4A9FE8',
              marginBottom: '16px',
            }}
          >
            Blog & Resources
          </div>
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              marginBottom: '20px',
              letterSpacing: '-1px',
            }}
          >
            Blog & Resources
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
            }}
          >
            Practical guides for Australian business owners on AI, automation, and never missing a call.
          </p>
        </div>
      </div>

      {/* Post grid */}
      <div className="blog-section">
        <div className="blog-grid">
          {posts.map((post) => (
            <div
              key={post.slug}
              onMouseEnter={() => setHoveredSlug(post.slug)}
              onMouseLeave={() => setHoveredSlug(null)}
              style={{
                background: 'white',
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '28px',
                boxShadow: hoveredSlug === post.slug
                  ? '0 8px 32px rgba(6,19,34,0.12)'
                  : 'none',
                transition: 'box-shadow 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Hero image */}
              {post.imageUrl && (
                <div style={{ margin: '-28px -28px 20px', borderRadius: '12px 12px 0 0', overflow: 'hidden', height: '180px' }}>
                  <img src={post.imageUrl} alt={post.imageAlt || post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
              )}
              {/* Category tag */}
              <div
                style={{
                  display: 'inline-block',
                  fontSize: '10px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#1565C0',
                  background: 'rgba(21,101,192,0.08)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  alignSelf: 'flex-start',
                }}
              >
                {post.category}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#061322',
                  margin: '12px 0 8px',
                  lineHeight: 1.3,
                }}
              >
                {post.title}
              </h2>

              {/* Excerpt */}
              <p
                style={{
                  fontSize: '14px',
                  color: '#4A5568',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  flex: 1,
                }}
              >
                {post.excerpt}
              </p>

              {/* Footer row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span style={{ fontSize: '13px', color: '#9CA3AF' }}>
                  {post.readTime}
                </span>
                <Link
                  href={`/blog/${post.slug}`}
                  style={{
                    fontSize: '13px',
                    color: '#1565C0',
                    textDecoration: 'none',
                    fontWeight: 600,
                  }}
                >
                  Read article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
