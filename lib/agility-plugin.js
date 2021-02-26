
import getSyncClient  from "@agility/agilitycms-nuxt-module/lib/agility.sync"

export default (ctx, inject) => {

	// read from injected options
	const agilityConfig = JSON.parse(`<%= JSON.stringify(options) %>`)
	const syncClient = getSyncClient(agilityConfig)
	const client = syncClient.store

	inject('agility', { client, ... agilityConfig})
  }