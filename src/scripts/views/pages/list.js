import DicodingRestaurantDBSource from '../../data/dicoding-restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const List = {
  async render() {
    return `
    <div class="hero-image">
      <picture>
        <source media="(max-width: 649px)" srcset="./heros/hero-image_2-small.webp" type="image/webp">
        <source media="(max-width: 649px)" srcset="./heros/hero-image_2-small.jpg" type="image/jpg">
        <source media="(max-width: 799px)" srcset="./heros/hero-image_2-medium.webp" type="image/webp">
        <source media="(max-width: 799px)" srcset="./heros/hero-image_2-medium.jpg" type="image/jpg">
        <source media="(max-width: 1199px)" srcset="./heros/hero-image_2-large.webp" type="image/webp">
        <source media="(max-width: 1199px)" srcset="./heros/hero-image_2-large.jpg" type="image/jpg">
        <source media="(min-width: 1600px)" srcset="./heros/hero-image_2.webp" type="image/webp">
        <source media="(min-width: 1600px)" srcset="./heros/hero-image_2.jpg" type="image/jpg">
        <img src="./heros/hero-image_2.jpg" alt="Hero Image" crossorigin="anonymous">
      </picture>
    </div>
    <div class="content" id="content">
      <h2 class="content__heading">Explore Restaurants</h2>
      <hr class="heading-hr">
      <div id="restaurants" class="restaurants">
      </div>
    </div>
    `;
  },

  async afterRender() {
    const restaurants = await DicodingRestaurantDBSource.listRestaurants();
    const restaurantContainer = document.querySelector('#restaurants');
    restaurants.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default List;
