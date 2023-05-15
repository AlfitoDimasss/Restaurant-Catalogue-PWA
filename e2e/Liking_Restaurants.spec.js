const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Your Liked Restaurant', 'h2.content__heading');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__content h3 a', 10);

  I.seeElement('.restaurant-item__content h3 a');

  const firstRestaurant = locate('.restaurant-item__content h3 a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurantTitle);

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');

  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__content h3 a');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('Unliking one restaurant', async ({ I }) => {
  I.see('Your Liked Restaurant', 'h2.content__heading');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__content h3 a', 10);

  I.seeElement('.restaurant-item__content h3 a');

  const firstRestaurant = locate('.restaurant-item__content h3 a').first();
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');

  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');

  const firstLikedRestaurant = locate('.restaurant-item__content h3 a').first();
  I.click(firstLikedRestaurant);

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');

  I.click('#likeButton');

  I.amOnPage('/#/like');

  I.dontSeeElement('restaurant-item');
});

Scenario('liking multiple restaurant', async ({ I }) => {
  I.see('Your Liked Restaurant', 'h2.content__heading');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__content h3 a', 10);

  I.seeElement('.restaurant-item__content h3 a');

  const restaurantNames = [];

  for (let i = 1; i <= 2; i++) {
    I.click(locate('.restaurant-item__content h3 a').at(i));
    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    // eslint-disable-next-line no-await-in-loop
    restaurantNames.push(await I.grabTextFrom('.restaurant__title'));
    I.amOnPage('/');
    I.waitForElement('.restaurant-item__content h3 a', 10);
  }

  I.amOnPage('/#/like');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(restaurantNames.length, visibleLikedRestaurants);

  restaurantNames.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.restaurant-item__content h3 a').at(index + 1));
    assert.strictEqual(name, visibleName);
  });
});

Scenario('Unliking one restaurant from list', async ({ I }) => {
  I.see('Your Liked Restaurant', 'h2.content__heading');

  I.amOnPage('/');

  I.waitForElement('.restaurant-item__content h3 a', 10);

  I.seeElement('.restaurant-item__content h3 a');

  for (let i = 1; i <= 2; i++) {
    I.click(locate('.restaurant-item__content h3 a').at(i));
    I.waitForElement('#likeButton', 10);
    I.seeElement('#likeButton');
    I.click('#likeButton');
    I.amOnPage('/');
    I.waitForElement('.restaurant-item__content h3 a', 10);
  }

  I.amOnPage('/#/like');

  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');

  const firstLikedRestaurant = locate('.restaurant-item__content h3 a').first();
  const firstLikedRestaurantName = await I.grabTextFrom(firstLikedRestaurant);
  I.click(firstLikedRestaurantName);

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');

  I.click('#likeButton');

  I.amOnPage('/#/like');

  I.seeElement('.restaurant-item');

  const anotherRestaurantName = await I.grabTextFrom(locate('.restaurant-item__content h3 a').first());

  assert.notStrictEqual(firstLikedRestaurantName, anotherRestaurantName);
});
