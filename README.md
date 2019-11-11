# crispy-system

<!-- link to hosted app -->
#[Tea-licious App](https://tea-licious.herokuapp.com/)

#### Original Goal:
>I'm thinking if I do the tea one, It has a timer built in for the different teas, you can select a list of favorite teas, you can share you list public or keep private, each tea has an info page that tells you about it and where it's from (google maps fits in here), and finally a special feature would be a green tea preparation >course that gives you a little badge next to your user name and says you learned how >to prep the green tea traditionally.

#### Technologies Used

  -CSS - Materialize  
  -MVC Structure  
  -Node.js  
  -Mongoose  
  -MognoDB  
  -Express  
  -EJS, EJS Partials  


#### Approach Taken
>First primary model to house all seeded data (ie the global collection)
Then creating users and each user contains an array used for saving their favorite teas.
Global teas can have edits made to them, but they are purged and reseeded at login.
Individual teas edits are saved within each user's "favs array"

#### Challenges

>Saving a tea to a user's profile
```javascript
router.post('/addFav/:id', (req, res) => {
  User.find({username: req.session.username}, (err, foundUser) => {
    Tea.findById(req.params.id, (err, thisTea) => {
      Tea.create(thisTea, (err, userFavTea) => {
        foundUser[0].favs.push(userFavTea);
        foundUser[0].save((err, data) => {
          res.redirect('/tea/')
        });
      });
    });
  });
});
```

>Nesting a Tea Array inside a user
```javascript
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true},
  password: { type: String, required: true },
  name: { type: String, required: true},
  favs: [Tea.schema]
});
```


#### Wireframes /  User Stories
![Wireframe Image 1](https://res.cloudinary.com/hvqyfnzvb/image/upload/c_scale,w_500/v1573455686/20191109_223642_xvnk7y.jpg "Wireframe Image 1")
![Wireframe Image 2](https://res.cloudinary.com/hvqyfnzvb/image/upload/c_scale,w_500/v1573455685/20191109_223632_vldbxn.jpg "Wireframe Image 2")
![Wireframe Image 2](https://res.cloudinary.com/hvqyfnzvb/image/upload/c_scale,w_500/v1573455686/20191109_223619_qnvjfz.jpg "Wireframe Image 3")
<!-- pull and edit images to put here -->



#### Goals
> Would like to add some more content around each tea.  
  Allow users to share teas to a public share page.
<!-- put some goals or hopes for more to do to this app -->


#### Unsolved Problems
> Edit function effects global items instead of just individual item, current solution is to reseed main database at each login.  
  Maintaining minimum sizing for cards.  
  Working on installing a image uploading function, got image upload Cloudinary to work direct directly from code only, never made it to browser uploads.
