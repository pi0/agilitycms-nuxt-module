import path from 'path'
import { createSyncClient } from './agility.sync'
import pkg from '../package.json'

function agilityCMS (moduleOptions) {

	const { nuxt, options } = this

	const isPreview = options.dev
	const guid = process.env.AGILITY_GUID
	const apiKey = isPreview ? process.env.AGILITY_API_PREVIEW_KEY : process.env.AGILITY_API_FETCH_KEY

	const agilityOptions = {
		...moduleOptions,
		...nuxt.options.agilitycms,
		...nuxt.options.privateRuntimeConfig.agilitycms
	}

	const languages = agilityOptions.languages
	const channelName = agilityOptions.channelName
	const includeLanguageCodeInUrl = agilityOptions.includeLanguageCodeInUrl
	const pageComponentPath = agilityOptions.pageComponentPath

	let cacheDir = 'node_modules/.cache/nuxt-agility'
	// Avoid hardcoding rootDir for production SSR
	if (nuxt.options.dev || nuxt.options.target === 'static') {
		cacheDir = path.resolve(nuxt.options.rootDir, cacheDir)
	}

	//get the agility sync client
	const agilityConfig = { isPreview, guid, apiKey, languages, channelName, cacheDir }

	//Generate site hook...
	nuxt.hook('generate:extendRoutes', async (routes) => {

		//trigger a sync before we generate stuff
		const syncClient = createSyncClient(agilityConfig)
		await syncClient.runSync()

		for (let langIndex = 0; langIndex < languages.length; langIndex++) {

			const languageCode = languages[langIndex]
			const sitemapFlat = await syncClient.store.getSitemap({ languageCode, channelName })

			let pathIndex = 0

			Object.keys(sitemapFlat).forEach(path => {

				let route = path

				if (pathIndex === 0) route = "/"

				if (includeLanguageCodeInUrl) {
					if (pathIndex === 0) {
						route = `/${languageCode}`
					} else {
						route = `/${languageCode}/${route}`
					}
				}

				++pathIndex

				routes.push({ route })
			})
		}
	})


	nuxt.hook('listen', async (server, { host, port }) => {

		//trigger a when we startup in SSR
		if (isPreview) {
			nuxt.options.cli.badgeMessages.push(`Agility CMS: Preview Mode`)
			const syncClient = createSyncClient(agilityConfig)
			await syncClient.runSync()
		} else {
			nuxt.options.cli.badgeMessages.push(`Agility CMS: Live Mode`)
		}

	})

	options.router.extendRoutes = (routes, resolve)=>{
		//push the routes from the Agility sitemap into the fold
		routes.push({
			name: 'agilitycms',
			path: '*',
			component: pageComponentPath
		})
	}

	this.addPlugin({
		src: path.resolve(__dirname, 'agility-plugin-server.js'),
		options: agilityConfig,
		fileName: 'agilitycms.server.js',
		mode: 'server'
	})

}

console.log(pkg)
agilityCMS.meta = pkg

export default agilityCMS
