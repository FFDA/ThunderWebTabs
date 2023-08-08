import {setDefaultWebsites, isObjectEmpty} from "../background/background.js";
browser.storage.onChanged.addListener(onStorageChanged);

const buttonAdd = document.querySelector("#button-add");
const buttonSave = document.querySelector("#button-save");
const buttonDefault = document.querySelector("#button-default");
buttonAdd.addEventListener("click", addEmptyWebsiteRow);
buttonSave.addEventListener("click", saveWebsitesToStorage);
buttonDefault.addEventListener("click", setDefaultWebsites);

/**
 * Adds an empty website line at the end of the website list
 */
function addEmptyWebsiteRow() {
    const websites = document.querySelector("#websites");
    const row = document.createElement("div");
    row.classList.add("website-row");
    let websiteFaviconImage= document.createElement("img");
    websiteFaviconImage.src = "../icons/empty.svg";
    websiteFaviconImage.classList.add("website-row-image");
    let websitefavicon = document.createElement("input");
    websitefavicon.setAttribute("placeholder", "Icon url or base64 string")
    websitefavicon.addEventListener("input", faviconChanged);
    let websiteName = document.createElement("input");
    websiteName.setAttribute("placeholder", "Name")
    let websiteUrl = document.createElement("input");
    websiteUrl.setAttribute("placeholder", "Url")
    let websiteRemove = document.createElement("img");
    websiteRemove.classList.add("line-edit-button", "website-row-image");
    websiteRemove.setAttribute("src", "../icons/trash.svg");
    websiteRemove.addEventListener("click", removeWebsiteRow);
    row.append(websiteFaviconImage, websitefavicon, websiteName, websiteUrl, websiteRemove);
    websites.appendChild(row);
}

/**
 * Loops over all website lines in the website list.
 * Saves only those lines that have any text in Name and Address fields.
 */
function saveWebsitesToStorage() {
    let websites = [];
    let allWebsites = document.querySelectorAll(".website-row");
    for (let i = 0; i < allWebsites.length; i++) {
        let empty = false;
        let website = {}
        let currentWebsite = allWebsites.item(i);
        for (let x = 1; x < 4; x++) {
            if (x === 1) {
                // Icon Url - can be empty
                if (
                    currentWebsite.children.item(x).value.startsWith("https://") ||
                    currentWebsite.children.item(x).value.startsWith("http://") ||
                    currentWebsite.children.item(x).value.startsWith("https://www.") ||
                    currentWebsite.children.item(x).value.startsWith("http://www.") ||
                    currentWebsite.children.item(x).value.startsWith("data:image/png;base64,")
                ) {
                    website["favicon"] = currentWebsite.children.item(x).value;
                } else if (currentWebsite.children.item(x).value.length !== 0) {
                    website["favicon"] = "data:image/png;base64," + currentWebsite.children.item(x).value;
                } else {
                    website["favicon"] = "";
                }
            } else if (x === 2) {
                // Websites name can't be empty
                if (currentWebsite.children.item(x).value === "") {
                    empty = true;
                    break;
                }
                website["name"] = currentWebsite.children.item(x).value;
            } else if (x === 3) {
                // Websites url can't be empty
                if (currentWebsite.children.item(x).value === "") {
                    empty = true;
                    break;
                }
                website["url"] = currentWebsite.children.item(x).value;
            }
        }
        if (empty) {
            continue;
        }
        websites.push(website);
    }
    browser.storage.local.set({"websites": websites})
}

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
 * Loads the websites to the Preferences UI.
 * @param websites website object list to load
 */
function onWebsitesRetrieved(websites) {
    removeWebsites();
    if (isObjectEmpty(websites)) {
        setDefaultWebsites();
        return;
    }
    websites["websites"].forEach(addWebsite);
}

/**
 * Removes all websites from the list
 */
function removeWebsites() {
    const websites = document.querySelector("#websites");
    for (let i = websites.children.length - 1; i > 0 ; i--) {
        websites.removeChild(websites.children.item(i));
    }
}

/**
 * Appends single website to the Websites list in the Preferences UI.
 * @param element website to append
 */
function addWebsite(element) {
    const websites = document.querySelector("#websites");
    const row = document.createElement("div");
    row.classList.add("website-row");
    let websiteFaviconImage= document.createElement("img");
    if (element["favicon"] === undefined || element["favicon"] === "") {
        websiteFaviconImage.src = "../icons/trash.svg";
        websiteFaviconImage.classList.add("hidden");
    } else {
        websiteFaviconImage.src = element["favicon"];
    }
    websiteFaviconImage.classList.add("website-row-image");
    let websiteFavicon = document.createElement("input");
    websiteFavicon.setAttribute("placeholder", "Icon url or base64 string")
    websiteFavicon.value = element["favicon"];
    websiteFavicon.addEventListener("input", faviconChanged);
    let websiteName = document.createElement("input");
    websiteName.setAttribute("placeholder", "Name")
    websiteName.value = element["name"];
    let websiteUrl = document.createElement("input");
    websiteUrl.setAttribute("placeholder", "Url")
    websiteUrl.value = element["url"];
    let websiteRemove = document.createElement("img");
    websiteRemove.classList.add("line-edit-button", "website-row-image");
    websiteRemove.setAttribute("src", "../icons/trash.svg");
    websiteRemove.addEventListener("click", removeWebsiteRow);
    row.append(websiteFaviconImage, websiteFavicon, websiteName, websiteUrl, websiteRemove);
    websites.appendChild(row);
}

/**
 * Changes Favicon preview image to what user writes to field
 */
function faviconChanged() {
    if (
        this.value.startsWith("https://") ||
        this.value.startsWith("http://") ||
        this.value.startsWith("https://www.") ||
        this.value.startsWith("http://www.")
    ) {
        this.previousSibling.src = this.value;
    } else if (this.value.length !== 0){
        this.previousSibling.src = "data:image/png;base64," + this.value;
    } else {
        this.previousSibling.src = "../icons/empty.svg";
    }
}

/**
 * Removes clicked elements parent
 */
function removeWebsiteRow() {
    this.parentNode.remove();
}

browser.storage.local.get("websites").then(onWebsitesRetrieved);