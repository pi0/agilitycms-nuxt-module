
const getFetchClient = require( "@agility/agilitycms-nuxt-module/lib/agility.fetch").default

export default (ctx, inject) => {

	// read from injected options
	const agilityConfig = JSON.parse(`<%= JSON.stringify(options) %>`)

	const client = getFetchClient(agilityConfig)

	inject('agility', { client, ... agilityConfig})
  }