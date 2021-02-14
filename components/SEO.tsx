import React from "react";
import Head from "next/head";

type SEOProps = {
  title: string;
};

export default function SEO({ title }: SEOProps) {
  const siteTitle = "Train Track";
  const description =
    "Track your workout training progress and connect with your friends on Train Track!";
  return (
    <Head>
      <title>{`${title} | ${siteTitle}`}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteTitle} />
    </Head>
  );
}
