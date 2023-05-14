import CONFIG from '../../globals/config';

const createMenu = (menus) => {
  let strings = '';
  menus.forEach((menu) => {
    strings += `<li>${menu.name}</li>`;
  });
  return strings;
};

const createReviews = (reviews) => {
  let reviewsString = '';
  reviews.forEach((review) => {
    reviewsString += `
      <div class="review-item">
        <p class="review-name">${review.name}</p>
        <p class="review-date">${review.date}</p>
        <p class="review-content">${review.review}</p>
      </div>
    `;
  });
  return reviewsString;
};

const createCategories = (categories) => {
  let listCategories = '';
  categories.forEach((category) => {
    if (categories[categories.length - 1] === category) {
      listCategories += `<span>${category.name}</span>`;
    } else {
      listCategories += `<span>${category.name}, </span>`;
    }
  });
  return listCategories;
};

const createRestaurantDetailTemplate = (restaurant) => `
  <h2 class="restaurant__title font-header">${restaurant.name}</h2>
  <img class="restaurant__poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous" />
  <div class="restaurant__info">
    <h3 class="font-header">Information</h3>
    <h4 class="font-header">Address</h4>
    <span><i class="fa fa-map-marker" aria-hidden="true" style="color: red;"></i></span>
    <span>${restaurant.address}, ${restaurant.city}</span>
    <h4 class="font-header">Categories</h4>
    <span><i class="fa fa-pagelines" aria-hidden="true" style="color: green;"></i><span>
    <span>${createCategories(restaurant.categories)}</span>
    <h4 class="font-header">Rating</h4>
    <span><i class="fa fa-star" aria-hidden="true" style="color: #FFC300;"></i></span>
    <span>${restaurant.rating}</span>
  </div>
  <div class="restaurant__overview">
    <h3 class="font-header">Overview</h3>
    <p class="restaurant-desc">${restaurant.description}</p>
    <h3 class="font-header">Menus</h3>
    <div class="grid-menu">
      <ul>${createMenu(restaurant.menus.foods)}</ul>
      <ul>${createMenu(restaurant.menus.drinks)}</ul>
    </div>
    <h3 style="margin-bottom: 12px;" class="font-header">Reviews</h3>
    ${createReviews(restaurant.customerReviews)}
  </div>
`;

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__poster" alt="${restaurant.name}"
           src="${restaurant.pictureId ? CONFIG.BASE_IMAGE_URL + restaurant.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" crossorigin="anonymous">
      <div class="restaurant-item__header__rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="restaurant-item__content">
      <h3><a href="/#/detail/${restaurant.id}">${restaurant.name}</a></h3>
      <p>${restaurant.description}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
