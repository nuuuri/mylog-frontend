export const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const deepcopy = (list: any[]) => {
  return list.map((obj) => {
    return { ...obj };
  });
};
