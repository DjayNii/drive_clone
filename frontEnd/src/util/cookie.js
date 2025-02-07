export const clearCookies = () => {
  document.cookie.split(";").forEach((cookie) => {
    const [name] = cookie.trim().split("=");
    document.cookie = `${name}=; expires=Tue, 24 May 2005 00:00:00 IST; path=/;`;
  });
};
