import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

function setupContextMenu() {
  chrome.contextMenus.create({
    id: 'ecualoy-multicopy-menu',
    title: chrome.i18n.getMessage("copy"),
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
