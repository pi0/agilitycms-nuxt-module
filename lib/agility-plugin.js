import { getSyncClient } from "modules/agility/agility.sync.js"

export default (ctx, inject) => {

	// read from injected options
	const agilityConfig = <%= JSON.stringify(options) %>

	const syncClient = getSyncClient(agilityConfig)
	const client = syncClient.store

	//ctx.$agility = { client, ... agilityConfig}

	inject('$agility', { client, ... agilityConfig})
  }