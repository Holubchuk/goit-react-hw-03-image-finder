import axios from "axios";


export async function requestPhotos(searchValue, page) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '40632691-213f7517e31f589a015673005';
  
    const params = {
      key: KEY,
      q: searchValue,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      per_page: 12,
      page: page,
    };

    const response = await axios.get(BASE_URL, { params });
    return response.data;
}