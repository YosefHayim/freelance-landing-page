export const addScript = (address: string) => {
  const script = document.createElement('script');
  script.async = true;
  script.src = address;
  document.head.append(script);
};
