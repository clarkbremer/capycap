
function onClickHandler(info, tab) {
  chrome.tabs.sendMessage(tab.id, {cmd: "scrape"});
 
  console.log("item " + info.menuItemId + " was clicked");
  console.log("info: " + JSON.stringify(info));
  console.log("tab: " + JSON.stringify(tab));
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({"title": "Generate Capybera Code", "id": "parent"});
});
 