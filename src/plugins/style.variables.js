let root = document.documentElement;

export const setStyleProp = function(key, value) {
  root.style.setProperty(key, value);
};

export const getStyleProp = function(key) {
  return getComputedStyle(root).getPropertyValue(key);
};
