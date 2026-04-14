import { FC } from 'react';
import { DEFAULT_OG_IMAGE, SITE_URL } from '@/config/seo';

const SITE_NAME = '웹메이드';

interface SeoProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  canonical?: string;
  path?: string;
  noindex?: boolean;
  twitterCard?: 'summary' | 'summary_large_image';
}

const Seo: FC<SeoProps> = ({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonical,
  path,
  noindex = false,
  twitterCard = 'summary_large_image',
}) => {
  const toAbsoluteUrl = (value: string) => {
    if (/^https?:\/\//i.test(value)) return value;
    const normalized = value.startsWith('/') ? value : `/${value}`;
    return `${SITE_URL}${normalized}`;
  };

  const resolvedOgTitle = ogTitle ?? title;
  const resolvedOgDescription = ogDescription ?? description;
  const resolvedCanonical = canonical ?? (path ? toAbsoluteUrl(path) : SITE_URL);
  const resolvedOgImage = toAbsoluteUrl(ogImage);

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={resolvedCanonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={resolvedOgTitle} />
      <meta property="og:description" content={resolvedOgDescription} />
      <meta property="og:image" content={resolvedOgImage} />
      <meta property="og:url" content={resolvedCanonical} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={resolvedOgTitle} />
      <meta name="twitter:description" content={resolvedOgDescription} />
      <meta name="twitter:image" content={resolvedOgImage} />
    </>
  );
};

export default Seo;
