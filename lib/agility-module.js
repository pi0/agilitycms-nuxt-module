const path = require('path')

import getSyncClient from "./agility.sync"

export default function (moduleOptions) {

	const { nuxt, options } = this
	const env = options._env
	const isPreview = options.dev
	const guid = env.AGILITY_GUID
	const apiKey = isPreview ? env.AGILITY_API_PREVIEW_KEY : env.AGILITY_API_FETCH_KEY

	const agilityOptions = {
		...moduleOptions,
		...this.options.agilitycms
	  }

	const languageCode = agilityOptions.languageCode
	const channelName = agilityOptions.channelName

	//get the agility sync client
	const agilityConfig = { isPreview, guid, apiKey, languageCode, channelName }
	const syncClient = getSyncClient(agilityConfig)

	this.nuxt.hook('listen', async (server, { host, port }) => {

	})

	this.nuxt.hook('ready', async nuxt => {
		//trigger a sync in this mode...
		await syncClient.runSync()
	})

	this.addPlugin({
		src: path.resolve(__dirname, 'agility-plugin.js'),
		options: agilityConfig,
		fileName: 'agilitycms.server.js',
		mode: 'server'
	})
}

module.exports.meta = require('../package.json')