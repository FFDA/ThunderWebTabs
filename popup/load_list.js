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
