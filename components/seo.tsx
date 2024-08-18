import Head from "next/head";

export default function SEO(props: { [x: string]: string }) {
  const { title, description, image, url } = props;
  return (
    <Head>
      <title>{title + " - Pauloxuries Fashion Store"}</title>
      <meta name="description" content={description} />
      <meta
        content={title + " - Pauloxuries Fashion Store"}
        name="twitter:title"
      />
      <meta content={description} name="twitter:description" />
      <meta content={image} name="twitter:image" />
      <meta content={title} name="twitter:image:alt" />
      <meta
        content={title + "- Pauloxuries Fashion Store"}
        property="og:title"
      />
      <meta content={description} property="og:description" />
      <meta content={image} property="og:image" />
      <meta content={title} property="og:image:alt" />
      <meta content={url} property="og:url" />
    </Head>
  );
}
