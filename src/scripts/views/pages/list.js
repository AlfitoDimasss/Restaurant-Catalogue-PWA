import DicodingRestaurantDBSource from '../../data/dicoding-restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const List = {
  async render() {
    return `
    <div class="hero-image">
      <img src="./heros/hero-image_2.jpg" alt="Hero Image" crossorigin="anonymous">
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
