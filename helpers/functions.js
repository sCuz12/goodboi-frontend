export function ImageUploadValidator(file) {
  //check the type of image
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    return "You can only upload JPG/PNG file!";
  }

  const isLt2M = file.size / 1024 / 1024 < 6;

  if (!isLt2M) {
    return "Image must smaller than 6MB!";
  }
  return true;
}

/**
 * Extracts the group name from facebook url
 * @param string url
 */
export function extractGroupNameFromFacebook(url) {
  var facebookUrl = new URL(url);
  let groupName = facebookUrl.pathname;

  //remove slash
  const str = groupName.replace(/\//g, "");

  return str;
}

/**
 * Extracts the group name from facebook url
 * @param string url
 * @param string type
 */
export function isValidSocialUrl(url, type) {
  try {
    var urlParsed = new URL(url);
    const hostname = urlParsed.hostname;

    switch (type) {
      case "facebook":
        if (hostname === "www.facebook.com") {
          return true;
        }
        break;
      case "instagram":
        if (hostname === "www.instagram.com") {
          return true;
        }
        break;
      default:
        return false;
    }

    return false;
  } catch (_) {
    return false;
  }
}
