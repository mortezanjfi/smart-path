const setLocalStorageItemWithExpireTime = (
  key: string,
  value: any,
  timeToLive: number
) => {
  const now = new Date();

  const item = {
    value: value,
    expiry: now.getTime() + timeToLive,
  };

  localStorage.setItem(key, JSON.stringify(item));
};

const getLocalStorageItemWithExpireTime = (key: string) => {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
};

export default {
  getLocalStorageItemWithExpireTime,
  setLocalStorageItemWithExpireTime,
};
