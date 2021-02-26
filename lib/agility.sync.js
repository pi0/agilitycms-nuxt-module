import agilityContentSync from "@agility/content-sync"
import agilityFileSystem from "@agility/content-sync/src/store-interface-filesystem"



const getSyncClient = ({ guid, apiKey, isPreview, languageCode, channelName }) => {

	if (!guid) {
		console.log("AgilityCMS => No GUID was provided.");
		return null;
	}

	const rootPath = process.cwd()
	let cachePath = `${rootPath}/node_modules/@agility/.cache/${guid}/${isPreview ? "preview" : "live" }`;

	console.log(`AgilityCMS => Syncing to ${cachePath}.`);

	return agilityContentSync.getSyncClient({
		guid,
		apiKey,
		isPreview,
		languages: [languageCode],
		channels: [channelName],
		store: {
			interface: agilityFileSystem,
			options: {
				rootPath: cachePath
			},
		},
	});
};



module.exports = {
	getSyncClient
};
