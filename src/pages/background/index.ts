import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.scss");

function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'ecualoy-multicopy-menu',
    title: 'Copy',
    contexts: ['selection'],
  });
}

chrome.runtime.onInstalled.addListener(() => {
  setupContextMenu();
});

async function saveItem(text: string) {
  const key = String(Date.now());
  await chrome.storage.local.set({ [key]: text });
}

chrome.contextMenus.onClicked.addListener((data) => {
  saveItem(data.selectionText);
});
