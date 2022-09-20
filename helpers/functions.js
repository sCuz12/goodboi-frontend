export function ImageUploadValidator(file) {
  //check the type of image
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    return "You can only upload JPG/PNG file!";
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    return "Image must smaller than 2MB!";
  }
  return true;
}
