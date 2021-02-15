// only open on the inital startup
var opened_tabs = false;

function onError(error) {
    console.log(`Error: ${error}`);
}

function openTabs(item) {
    let getExistingPinnedTabs = browser.tabs.query({ "pinned": true });
    getExistingPinnedTabs.then(
        (existingPinnedTabs) => {
            pinURLs = existingPinnedTabs.map( tab => tab.url );
            return pinURLs;
        }
    ).then(() => {
        var pinned_websites = item.pinned_websites;
        pinned_websites.forEach(function(website) {
            if (existingPinnedTabs.indexOf(website) === -1){
                browser.tabs.create({url: website, "pinned": true,
                "active": false});
            }
        });
        opened_tabs = true;
    });
}

if (opened_tabs == false) {
    let getWebsites = browser.storage.local.get("pinned_websites");
    getWebsites.then(openTabs, onError);
}
