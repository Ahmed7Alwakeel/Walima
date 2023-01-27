import Document, { Html, Head, Main, NextScript } from 'next/document';

// Tho whole point of this file is to solve ltr dynamic change issue on iOS
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    return (
      <Html lang={locale} dir={dir}>
        <link rel='icon' href='/img/Walima-LOGO-NEW- png 1.svg' />
        <link
          rel='preload'
          href=''
        />
        <link
          rel="prefetch"
          href="../../public/fonts/Fiber-Vintage/fibre-font.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        /> 
         <link
          rel="prefetch"
          href="../../public/fonts/Somatic/Somatic-Rounded.otf"
          as="font"
          type="font/otf"
          crossOrigin=""
        />
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;