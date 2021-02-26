const path = require('path')

import { getSyncClient } from "./agility.sync"

module.exports = function agilitycms (moduleOptions) {

	const { nuxt, options } = this
	const env = options._env
	const isPreview = options.dev
	const guid = env.AGILITY_GUID
	const apiKey = isPreview ? env.AGILITY_API_PREVIEW_KEY : env.AGILITY_API_FETCH_KEY

	const languageCode = moduleOptions.languageCode
	const channelName = moduleOptions.channelName

	//get the agility sync client
	const agilityConfig = { isPreview, guid, apiKey, languageCode, channelName }
	const syncClient = getSyncClient(agilityConfig)

	this.nuxt.hook('listen', async (server, { host, port }) => {
		console.log('*** MY MODULE Nuxt  listening ')
	})

	this.nuxt.hook('ready', async nuxt => {
		//trigger a sync in this mode...
		await syncClient.runSync()
	})

	console.log("sync client store", syncClient.store)

	this.addPlugin({
		src: path.resolve(__dirname, 'agility-plugin.js'),
		fileName: 'modules/agility/agility-plugin.js',
		options: agilityConfig,
		mode: 'server'
	})
}

module.exports.meta = require('../package.json')