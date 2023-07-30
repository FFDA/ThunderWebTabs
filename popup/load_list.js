// Function that detects the click on item if the list and opens website that user clicked on.

document.addEventListener("click", function(e) {
	if (!e.target.classList.contains("webpageList")) {
		return;
	}
	
	var chosenPage = e.target.id;

	switch (chosenPage) {
		case "android_messages":
			pageUrl = "https://messages.android.com/";
			break;
		case "google_keep":
			pageUrl = "https://keep.google.com";
			break;
		case "google_photos":
			pageUrl = "https://photos.google.com/";
			break;
	}
	
	browser.tabs.create({
          url: pageUrl
        });
	
});

// Function to open tab from user's input.
// It will not save the address to the list, but tab should be persistent.

document.getElementById("open_tab").onclick = function() {
  var siteURL = document.getElementById("site_url").value;
  browser.tabs.create({
    url: siteURL
  });

};
