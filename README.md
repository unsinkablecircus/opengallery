# Open Gallery
---

## Redux

#### Root State Object

```
{
  /////////////////////
  //     SESSION     //
  /////////////////////

  session: {
    loggedIn: false,
    showSignInModal: false
  },


  //////////////////
  //     USER     //
  //////////////////

  user: {
    uid: 1,
    username: 'username',
    name: 'User Name',
    email: 'user@email.com',
    facebook: 'facebook',
    twitter: 'twitter',
    avatar: 'http://placehold.it/300x300',
    media: 'Media',
    about: 'About'
  },

  /////////////////////
  //     GALLERY     //
  /////////////////////

  gallery: {
    tile: 0,
    showGallery: false
  },

  //////////////////
  //     GRID     //
  //////////////////

  grid: {
    fetching: false,
    error: '',
    filter: [],
    tiles: [1, 2, 3, 4, 5, 6, 7, 8]
  },
{
  ///////////////
  //   AUTH    //
  ///////////////
  auth: {
    isAuthenticated: Boolean,
    isFetching: Boolean,
    error: ''
  }


},
  ///////////////////
  //     MEDIA     //
  ///////////////////

  media: {
    '1': {
      mediaId: 1,
      userFeedbackId: 1,
      media: 'Media 1',
      title: 'Title 1',
      description: 'Description 1',
      tags: [],
      url_sm: 'https://placehold.it/30x30',
      url_md: 'https://placehold.it/400x300',
      url_lg: 'https://placehold.it/800x600',
      width: 800,
      height: 600,
      showHiRes: false,
      feedback: [1, 2, 3, 4, 5]
    },
    ...
  },

  //////////////////////
  //     FEEDBACK     //
  //////////////////////

  feedback: {
    displayFeeback: false,
    data: {
      '1': {
        hashtag: 'beautiful',
        count: 50
      },
      ...
    }
  }

  ////////////////////
  //     MODALS     //
  ////////////////////

  displaySignIn: false,
  displaySignUp: false,
  displayUploadTile: false,
  displayGallery: false,
  displayMap: false,

  ///////////////////
  //     FORMS     //
  ///////////////////

  formSignin: {
    isValid: false,
    login: String, // username or email
    password: String
  },

  formSignup: {
    isValid: false,
    username: String,
    email: String,
    password: String,
    phone: String,
    facebook: String,
    twitter: String,
    avatar: String,
    media: String,
    about: String
  },

  formUploadTile: {
    isValid: false,
    filepath: String,
    title: String,
    description: String,
    tags: [String, String, ...]
  }
}
```

## File Structure

```
.
├── client
│   └── components
│   │   ├── App.js
│   │   ├── nav
│   │   │   ├── Nav.js
│   │   │   ├── Signin.js
│   │   │   └── Signup.js
│   │   ├── gallery
│   │   │   └── Gallery.js
│   │   ├── grid
│   │   │   ├── Grid.js
│   │   │   ├── GridTile.js
│   │   ├── wordmap
│   │   │   ├── Map.js
│   │   │   └── Word.js
│   │   └── user
│   │       ├── User.js
│   │       ├── UserGrid.js
│   │       └── UploadForm.js
├── server
│   ├── server.js
│   └── config
│   │   ├── router.js
│   │   ├── middleware.js
│   │   └── helpers.js
├── public
│   ├── app.js
│   ├── index.html
│   ├── style.css
│   └── assets
├── spec
│   ├── clientTest.js
│   └── serverTest.js
├── config
│   └── webpack.config.js
├── package.json
├── .babelrc
├── .gitignore
├── _PRESS_RELEASE.md
└── README.md
```
