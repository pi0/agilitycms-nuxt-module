import agilityContentFetch from "@agility/content-fetch"


export default ({ guid, apiKey, isPreview, languages, channelName }) => {

	if (!guid) {
		console.log("AgilityCMS => No GUID was provided.");
		return null;

	}

	return agilityContentFetch.getApi({
		guid,
		apiKey,
		isPreview
	  });

};
