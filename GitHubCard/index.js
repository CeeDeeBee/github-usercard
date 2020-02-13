/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const cardsDiv = document.querySelector('.cards');
// cardsDiv.append(createUserCard(userData));
// followersArray.forEach(follower => cardsDiv.append(createUserCard(follower)));

const config = {
  auth: {
    username: 'username',
    password: 'password'
  }
}

// Get user data
axios.get('https://api.github.com/users/ceedeebee', config)
  // Handle user data
  .then(response => {
    cardsDiv.append(createUserCard(response.data));
    // Get followers
    axios.get(response.data.followers_url, config)
      // Handle followers data
      .then(followersResponse => {
        // Get data for each follower
        followersResponse.data.forEach(follower => {
          axios.get(follower.url, config)
            .then(followerResponse => cardsDiv.append(createUserCard(followerResponse.data)))
            .catch(err => console.log(`Follower Get Error: ${err}`));
        })
      })
      .catch(err => console.log(`Followers Get Error: ${err}`));
  })
  .catch(err => console.log(`User Get Error: ${err}`));

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function createUserCard(obj) {
  console.log(obj);
  // Create elements
  const card = document.createElement('div'),
    img = document.createElement('img'),
    cardInfo = document.createElement('div'),
    name = document.createElement('h3'),
    username = document.createElement('p'),
    location = document.createElement('p'),
    profile = document.createElement('p'),
    profileLink = document.createElement('a'),
    followers = document.createElement('p'),
    following = document.createElement('p'),
    bio = document.createElement('p');

  // Add classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  name.classList.add('name');
  username.classList.add('username');

  // Add content
  img.src = obj.avatar_url;
  name.textContent = obj.name;
  username.textContent = obj.login;
  location.textContent = `Location: ${obj.location}`;
  profile.textContent = 'Profile: ';
  profileLink.href = obj.html_url;
  profileLink.textContent = obj.html_url;
  followers.textContent = `Followers: ${obj.followers}`;
  following.textContent = `Following: ${obj.following}`;
  bio.textContent = `Bio: ${obj.bio}`;

  // Append elements
  profile.append(profileLink);
  cardInfo.append(name, username, location, profile, followers, following, bio);
  card.append(img, cardInfo);

  return card;
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/