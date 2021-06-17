import { createSyncClient } from './agility.sync'

const AgilityConfig = JSON.parse(`<%= JSON.stringify(options, null, 2) %>`)

export default (ctx, inject) => {
	// Apply runtime config
	const runtimeConfig = (ctx.$config || {}).agilitycms || {}
	const config = { ...AgilityConfig, ...runtimeConfig }

	// Create sync client
	const syncClient = createSyncClient(config)
	const client = syncClient.store

	// Inject agility instance
	inject('agility', { client, ...config })
}
