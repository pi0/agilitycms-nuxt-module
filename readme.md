# @agility/agilitycms-nuxt-module

[![npm version][npm-version-src]][npm-version-href]
[![npm version][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]

> [Sanity](https://sanity.io/) integration for [NuxtJS](https://nuxtjs.org)

- [✨ &nbsp;Release Notes](https://sanity.nuxtjs.org/releases)
- [📖 &nbsp;Documentation](https://sanity.nuxtjs.org)

## Features

- Just bring your sanity.json - no additional configuration required
- Ultra-lightweight Sanity client
- Zero-config image component
- Supports GROQ syntax highlighting
- Full support for TypeScript

[📖 &nbsp;Read more](https://sanity.nuxtjs.org)

## Setup

### 1. Add `@agility/agilitycms-nuxt-module` dependency to your project

```bash
yarn add @agility/agilitycms-nuxt-module
#or
npm install @agility/agilitycms-nuxt-module
```

### 2. Add `@agility/agilitycms-nuxt-module` to the `buildModules` section of `nuxt.config.js`

```js
{
  buildModules: [
    '@agility/agilitycms-nuxt-module',
  ],
  agilitycms: {
    // module options
	channelName: "website",
	languages: ["en-us"],
	includeLanguageCodeInUrl: false,
	pageComponentPath: "src/AgilityPage.vue"
  }
}
```

### 3. Add your Agility CMS instance guid and api keys to `.env`

```
AGILITY_GUID=
AGILITY_API_FETCH_KEY=
AGILITY_API_PREVIEW_KEY=
```

### 4. Use the `$aglitycms` global object to access your Agility CMS Sitemap, Pages and Content.

See the example Agility CMS Nuxt Blog repo for a full example.

https://github.com/agility/agility-nuxt-blog



## License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@agility/agilitycms-nuxt-module/latest.svg
[npm-version-href]: https://npmjs.com/package/@agility/agilitycms-nuxt-module
[npm-downloads-src]: https://img.shields.io/npm/dm/@agility/agilitycms-nuxt-module.svg
[npm-downloads-href]: https://npmjs.com/package/@agility/agilitycms-nuxt-module
[license-src]: https://img.shields.io/npm/l/@agility/agilitycms-nuxt-module.svg
[license-href]: https://npmjs.com/package/@agility/agilitycms-nuxt-module
