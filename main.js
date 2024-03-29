chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete') {
        return;
    }

    var host = getDomain(tab);
    if (domains.indexOf(host) !== -1) {
        if (!isIgnored(host)) {
            chrome.tabs.executeScript(tabId, { file: 'predatory.js' });
            chrome.pageAction.setIcon({ tabId: tabId, path: 'icon.png' });
        } else {
            chrome.pageAction.setIcon({ tabId: tabId, path: 'icon_ignored.png' });
        }
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.hide(tabId);
    }
});



chrome.pageAction.onClicked.addListener(function(tab) {
    var host = getDomain(tab);
    if (!isIgnored(host)) {
        ignore(host);
        chrome.tabs.executeScript(tab.id, { code: 'document.getElementById("predatoryPub").style.display = "none";' });
        chrome.pageAction.setIcon({ tabId: tab.id, path: 'icon_ignored.png' });
    } else {
        removeIgnore(host);
        chrome.tabs.executeScript(tab.id, { file: 'predatory.js' });
        chrome.pageAction.setIcon({ tabId: tab.id, path: 'icon.png' });
    }
});

function getIgnoreList() {
    var list = localStorage['ignoreList'];

    if (!list) {
        localStorage['ignoreList'] = JSON.stringify([]);
        return getIgnoreList();
    }

    return JSON.parse(list);
}

function removeIgnore(host) {
    var list = getIgnoreList();
    for (var i=list.length;i >= 0;i--) {
        if (list[i] == host) {
            list.splice(i,1);
        }
    }
    localStorage['ignoreList'] = JSON.stringify(list);
}

function ignore(host) {
    var list = getIgnoreList();
    list.push(host);
    localStorage['ignoreList'] = JSON.stringify(list);
}

function isIgnored(host) {
    var list = getIgnoreList();

    if (list && list.indexOf(host) !== -1)
        return true;
    return false;
}

function getDomain(tab) {
    //var urlRegex = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;
    var urlRegex = /^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/;
    var host = tab.url.match(urlRegex)[1].replace("www.","");//[6].split('.').splice(-2).join('.');
    return host;
}
