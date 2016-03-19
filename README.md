# Open Gallery
---

## Redux

#### Default State Object

```
{
  /*-----------------*/
  /*     SESSION     */
  /*-----------------*/

  auth: {
    isAuthenticated: false,
    isFetching: false,
    error: ''
  },


  /*--------------*/
  /*     USER     */
  /*--------------*/

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

  /*----------------*/
  /*     STATUS     */
  /*----------------*/

  status: {
    fetching: false,
    error: ''
  },

  /*--------------*/
  /*     VIEW     */
  /*--------------*/

  view: {
    displayGallery: false,
    displaySignIn: false,
    displaySignUp: false,
    displayWordmap: false
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


  /*---------------*/
  /*     MEDIA     */
  /*---------------*/

  media: {
    tile: 0,
    grid: [1, 2, 3, 4, 5, 6, 7, 8],
    filter: [],

    /*--------------*/
    /*     DATA     */
    /*--------------*/

    data: {
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
        feedback: [[1, 10], [2, 20], [3, 30], [4, 40], [5, 50]]
      },
      '2': {...},
      ...
    },

    /*--------------------*/
    /*     DICTIONARY     */
    /*--------------------*/

    dictionary: {
      '1': 'beautiful',
      '2': 'cool',
      ...
    }
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
