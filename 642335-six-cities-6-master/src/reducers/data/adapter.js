export const adapter = (data) => {
  return data.map((offer) => {
    return {
      bedrooms: offer.bedrooms,
      city: {
        location: [offer.city.location.latitude, offer.city.location.longitude],
        name: offer.city.name
      },
      description: offer.description,
      goods: offer.goods,
      host: {
        avatarURL: offer.host.avatar_url,
        id: offer.host.id,
        isPro: offer.host.is_pro,
        name: offer.host.name
      },
      id: offer.id,
      images: offer.images,
      isFavorite: offer.is_favorite,
      isPremium: offer.isPremium,
      location: [offer.location.latitude, offer.location.longitude],
      maxAdults: offer.max_adults,
      previewImage: offer.preview_image,
      price: offer.price,
      rating: offer.rating,
      title: offer.title,
      type: offer.type
    };
  });
};
