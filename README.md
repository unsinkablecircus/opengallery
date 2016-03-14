# Open Gallery
---

## Redux

#### Root State Object

```
{
  //////////////////
  //     USER     //
  //////////////////

  user: {
    uid: String // 'user_id_01'
    username: String
    name: String,
    email: String,
    password: String,
    phone: String,
    facebook: String,
    twitter: String,
    avatar: String,
    media: String,
    about: String
  },

  ///////////////////
  //     MEDIA     //
  ///////////////////

  currentTile: 'media_id_01'
  grid: [
    String, // 'media_id_01'
    String, // 'media_id_02'
    ...
  ],

  tileData: {
    'media_id_01': {
      userId: String, // 'user_id_01'
      userFeedbackId: String, // 'feedback_id_01'
      media: String,
      title: String,
      description: String,
      tags: [Strings],
      url_sm: String,
      url_md: String,
      url_lg: String,
      feedback: [
        String, // 'feedback_id_01'
        String, // 'feedback_id_02'
        ...
      ]
    },
    ...
  },

  feedbackData: {
    'feedback_id_01': {
      hashtag: String,
      count: Number
    },
    'feedback_id_02': {
      hashtag: String,
      count: Number
    },
    ...
  }

  ////////////////////
  //     MODALS     //
  ////////////////////

  modals: {
    signIn: false,
    signUp: false,
    uploadTile: false,
    gallery: false,
    map: false
  },

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
