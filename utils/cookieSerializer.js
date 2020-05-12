module.exports = (cookie) => {
  if (typeof (cookie) === 'string') {
    cookie = JSON.parse(cookie);
  }
  let serializedCookie = '';
  cookie.forEach(item => {
    serializedCookie += `${item.name}=${item.value}; `;
  });
  return serializedCookie;
};
