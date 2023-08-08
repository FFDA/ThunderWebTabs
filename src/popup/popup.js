import {setDefaultWebsites, isObjectEmpty} from "../background/background.js";
browser.storage.onChanged.addListener(onStorageChanged);
let websiteList = [];

/**
 * Checks if local storage was changed. Also checks if anything is in saved object.
 * If there is - reloads the website list
 * https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/onChanged#parameters
 * @param storage Object describing the change.
 * @param areaName The name of the storage area ("sync", "local", or "managed") to which the changes were made.
 */
function onStorageChanged(storage, areaName)  {
	if (areaName !== "local" || isObjectEmpty(storage)) {
		return;
	}
	browser.storage.local.get("websites").then(onWebsitesRetrieved);
}

/**
 * Saves retrieved websites from storage to a variable and loads them to the Preferences UI.
 * @param websites website object list to load
 */
function onWebsitesRetrieved(websites) {
	if (isObjectEmpty(websites)) {
		setDefaultWebsites();
		return;
	}
	websiteList = websites["websites"];
	websiteList.forEach(addWebsite);
}

/**
 * Appends single website to the Websites list in the Preferences UI.
 * @param element website to append
 */
function addWebsite(element) {
	const websites = document.querySelector("#website-list");
	const row = document.createElement("div");
	row.classList.add("website-list-item");
	let websiteFaviconImage= document.createElement("img");
	if (element["favicon"] !== undefined || element["favicon"].length !== 0) {
		websiteFaviconImage.src = element["favicon"];
	}
	let name = document.createTextNode(element["name"]);
	row.append(websiteFaviconImage, name);
	row.addEventListener("click", openSite);
	websites.appendChild(row);
}

/**
 * Finds URL of the clicked website and opens it in new tab
 */
function openSite() {
	for (let i = 0; websiteList.length; i++) {
		if (this.textContent === websiteList[i].name) {
			browser.tabs.create({url: websiteList[i].url});
			break;
		}
	}
}

/**
 * Opens tab with content of input field as url if it's longer than 2 characters
 */
document.querySelector("#open-tab").addEventListener("click", () => {
	let siteURL = document.getElementById("site-url").value;
	if (siteURL.length > 2) {
		browser.tabs.create({url: siteURL});
	}
})

browser.storage.local.get("websites").then(onWebsitesRetrieved);