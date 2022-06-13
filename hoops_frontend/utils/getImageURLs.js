export function getImageFormatURL(image, format) {
  if (image) {
    return (
      process.env.NEXT_PUBLIC_API_URL +
      image.data.attributes.formats[format].url
    );
  } else {
    return "/basketball_court.svg";
  }
}

export function getImageURL(image) {
  if (image) {
    return process.env.NEXT_PUBLIC_API_URL + image.data.attributes.url;
  } else {
    return "/basketball_court.svg";
  }
}
