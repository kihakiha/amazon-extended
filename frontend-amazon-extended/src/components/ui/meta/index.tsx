import Head from "next/head";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";

import { siteName, titleMerge } from "./meta.config";
import { ISeo } from "./meta.interface";

export const Meta: FC<PropsWithChildren<ISeo>> = ({
  title,
  description,
  image,
  children,
  type = "website",
}) => {
  const { asPath } = useRouter();
  const currentUrl = `${process.env.APP_URL}${asPath}`;

  return (
    <>
      <Head>
        <title itemProp="headline">{titleMerge(title)}</title>
        <link type="image/x-icon" href="/favicon.svg" rel="shortcut icon" />
        <link type="Image/x-icon" href="/favicon.svg" rel="icon" />
        {description ? (
          <>
            <meta
              itemProp="description"
              name="description"
              content={description}
            />
            <link rel="canonical" href={currentUrl} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="ru" />
            <meta property="og:title" content={titleMerge(title)} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image || "/favicon.svg"} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:description" content={description} />
          </>
        ) : (
          <meta name="robots" content="noindex, nofollow" />
        )}
      </Head>
      {children}
    </>
  );
};
