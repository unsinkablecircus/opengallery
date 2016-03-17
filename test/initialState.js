export const initialState = {
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
      feedback: [[1, 10], [2, 20], [3, 30], [4, 40], [5, 50]]
    },
    '2': {
      mediaId: 2,
      userFeedbackId: 2,
      media: 'Media 2',
      title: 'Title 2',
      description: 'Description 2',
      tags: [],
      url_sm: 'https://placehold.it/30x30',
      url_md: 'https://placehold.it/400x300',
      url_lg: 'https://placehold.it/800x600',
      width: 800,
      height: 600,
      showHiRes: false,
      feedback: [[6, 10], [7, 20], [8, 30], [9, 40], [10, 50]]
    },
    '3': {
      mediaId: 3,
      userFeedbackId: 3,
      media: 'Media 3',
      title: 'Title 3',
      description: 'Description 3',
      tags: [],
      url_sm: 'https://placehold.it/30x30',
      url_md: 'https://placehold.it/400x300',
      url_lg: 'https://placehold.it/800x600',
      width: 800,
      height: 600,
      showHiRes: false,
      feedback: [[1, 10], [3, 20], [5, 30], [7, 40], [9, 50]]
    },
    '4': {
      mediaId: 4,
      userFeedbackId: 4,
      media: 'Media 4',
      title: 'Title 4',
      description: 'Description 4',
      tags: [],
      url_sm: 'https://placehold.it/30x30',
      url_md: 'https://placehold.it/400x300',
      url_lg: 'https://placehold.it/800x600',
      width: 800,
      height: 600,
      showHiRes: false,
      feedback: [[2, 10], [4, 20], [6, 30], [8, 40], [10, 50]]
    },
    '5': {
      mediaId: 5,
      userFeedbackId: 5,
      media: 'Media 5',
      title: 'Title 5',
      description: 'Description 5',
      tags: [],
      url_sm: 'https://placehold.it/30x30',
      url_md: 'https://placehold.it/400x300',
      url_lg: 'https://placehold.it/800x600',
      width: 800,
      height: 600,
      showHiRes: false,
      feedback: [[1, 10], [3, 20], [5, 30], [7, 40], [9, 50]]
    },
    '6': {
      mediaId: 6,
      userFeedbackId: 6,
      media: 'Media 6',
      title: 'Title 6',
      description: 'Description 6',
      tags: [],
      url_sm: 'https://placehold.it/30x30',
      url_md: 'https://placehold.it/400x300',
      url_lg: 'https://placehold.it/800x600',
      width: 800,
      height: 600,
      showHiRes: false,
      feedback: [[2, 10], [4, 20], [6, 30], [8, 40], [10, 50], [9, 10], [8, 20]]
    },
    '7': {
      mediaId: 7,
      userFeedbackId: 7,
      media: 'Media 7',
      title: 'Title 7',
      description: 'Description 7',
      tags: [],
      url_sm: 'https://placehold.it/30x30',
      url_md: 'https://placehold.it/400x300',
      url_lg: 'https://placehold.it/800x600',
      width: 800,
      height: 600,
      showHiRes: false,
      feedback: [[4, 20], [7, 30], [10, 40]]
    },
    '8': {
      mediaId: 8,
      userFeedbackId: 8,
      media: 'Media 8',
      title: 'Title 8',
      description: 'Description 8',
      tags: [],
      url_sm: 'https://placehold.it/30x30',
      url_md: 'https://placehold.it/400x300',
      url_lg: 'https://placehold.it/800x600',
      width: 800,
      height: 600,
      showHiRes: false,
      feedback: [[6, 20], [9, 30], [3, 40], [1, 50]]
    }
  },

  //////////////////////
  //     FEEDBACK     //
  //////////////////////

  feedback: {
    displayFeeback: false,
    hashtags: {
      '1': 'beautiful',
      '2': 'cool',
      '3': 'awesome',
      '4': 'weird',
      '5': 'trippy',
      '6': 'nice',
      '7': 'great',
      '8': 'adorbs',
      '9': 'love',
      '10': 'dig'
    }
  }
}
