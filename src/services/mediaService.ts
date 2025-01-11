interface MediaItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
  source: 'pixabay' | 'pexels';
  type: 'image' | 'video';
}

export const searchPixabayMedia = async (
  query: string,
  type: 'image' | 'video',
  apiKey: string
): Promise<MediaItem[]> => {
  const endpoint = type === 'image' 
    ? 'https://pixabay.com/api/'
    : 'https://pixabay.com/api/videos/';
    
  const response = await fetch(
    `${endpoint}?key=${apiKey}&q=${encodeURIComponent(query)}&per_page=10`
  );
  const data = await response.json();
  
  return (data.hits || []).map((item: any) => ({
    id: item.id.toString(),
    url: type === 'image' ? item.largeImageURL : item.videos?.medium?.url,
    thumbnail: type === 'image' ? item.previewURL : item.userImageURL,
    title: item.tags,
    source: 'pixabay' as const,
    type
  }));
};

export const searchPexelsMedia = async (
  query: string,
  type: 'image' | 'video',
  apiKey: string
): Promise<MediaItem[]> => {
  const endpoint = type === 'image'
    ? `https://api.pexels.com/v1/search?query=${query}&per_page=10`
    : `https://api.pexels.com/videos/search?query=${query}&per_page=10`;
    
  const response = await fetch(endpoint, {
    headers: {
      'Authorization': apiKey
    }
  });
  const data = await response.json();
  
  const items = type === 'image' ? data.photos : data.videos;
  return (items || []).map((item: any) => ({
    id: item.id.toString(),
    url: type === 'image' ? item.src.large : item.video_files[0].link,
    thumbnail: type === 'image' ? item.src.tiny : item.image,
    title: item.alt || item.url,
    source: 'pexels' as const,
    type
  }));
};