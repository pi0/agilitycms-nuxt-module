import agilityContentSync from '@agility/content-sync'
import agilityFileSystem from '@agility/content-sync/src/store-interface-filesystem'

export function createSyncClient ({ guid, apiKey, isPreview, languages, channelName, cacheDir }) {
	if (!guid) {
		throw new Error("[AgilityCMS] No GUID was provided.");
	}

	return agilityContentSync.getSyncClient({
		guid,
		apiKey,
		isPreview,
		languages,
		channels: [channelName],
		store: {
			interface: agilityFileSystem,
			options: {
				rootPath: `${cacheDir}/${guid}/${isPreview ? "preview" : "live" }`
			},
		},
	});
};
