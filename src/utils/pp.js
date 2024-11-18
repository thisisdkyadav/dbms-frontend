export const getImageUrl = (halfUrl) => {
  if (halfUrl) {
    return `http://localhost:8000/${halfUrl}`
  } else {
    return null
  }
}
