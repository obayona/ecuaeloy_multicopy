import React, {useEffect, useState, useCallback} from "react";

interface Item {
  key: string;
  value: string;
}

const getCopiedItems = async () => {
  const data = await chrome.storage.local.get();
  return Object.keys(data)
        .map(key => ({key, value: data[key]}))
        .sort((a, b) => Number(a.key) - Number(b.key));
}

export const useCopiedItems = ():[Item[], () => Promise<void>, (key: string) => Promise<void>, () => Promise<void>, (key: string) => Promise<void>] => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    getCopiedItems().then(copiedItems => setItems(copiedItems));
  }, []);

  const clearItems = useCallback(async () => {
    await chrome.storage.local.clear();
    setItems([]);
  }, [setItems]);

  const removeItem = useCallback(async (key: string) => {
    await chrome.storage.local.remove(key);
    const copiedItems = await getCopiedItems();
    setItems(copiedItems);
  }, []);

  const copyAll = useCallback(async () => {
    const copiedItems = await getCopiedItems();
    const text = copiedItems.map(item => item.value).join("\n\n");
    await navigator.clipboard.writeText(text);
  }, []);

  const copyItem = useCallback(async (key: string) => {
    const item = await await chrome.storage.local.get(key);
    await navigator.clipboard.writeText(item[key]);
  }, []);

 return [items, clearItems, removeItem, copyAll, copyItem];
}