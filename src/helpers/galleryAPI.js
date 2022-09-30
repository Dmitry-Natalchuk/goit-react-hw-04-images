import axios from 'axios';

const API_KEY = '29133647-3d8509d2cb813d5d67d4bc82b';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const galleryApi = async (query, page) => {
  try {
    const response = await axios.get(
      `/?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
    );
    const gallery = response.data.hits.map(img => {
      const { id, largeImageURL, webformatURL } = img;
      return {
        id,
        largeImageURL,
        webformatURL,
      };
    });
    console.log(gallery);
    return gallery;
  } catch (error) {
    console.log(error.message);
  }
};
