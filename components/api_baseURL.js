
const API_URL = 'https://admin.walima.beyond-creation.net';
// const API_URL = 'https://walima-api.herokuapp.com';

const getData = async (locale,page) => {
    const response = await fetch(`${API_URL}/${page}?_locale=${locale}`)
    return response.json()
  }
  const getDynamicData = async (locale,page,slug) => {
    const response = await fetch(`${API_URL}/${page}?_slug=${slug}&_locale=${locale}`)
    return response.json()
  }

export {getDynamicData,getData,API_URL};