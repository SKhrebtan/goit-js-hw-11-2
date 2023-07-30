function onSearchRender(data) {
  return data.map(({ webformatURL, largeImageURL, tags, likes, views, downloads, comments }) => {
    return `<a href=${largeImageURL} class="link"><div class="photo-card">
  <img src="${webformatURL}" alt=${tags} loading="lazy" width=320/>
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div></a>`
  }).join('');
};

export default onSearchRender;