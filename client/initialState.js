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
    username: 'username'
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
    isFetching: false,
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
      feedback: [1, 2, 3, 4, 5]
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
      feedback: [6, 7, 8, 9, 10]
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
      feedback: [1, 3, 5, 7, 9]
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
      feedback: [2, 4, 6, 8, 10]
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
      feedback: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
      feedback: [9, 8, 7, 6, 5]
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
      feedback: [4, 7, 10]
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
      feedback: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
    }
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
      '2': {
        hashtag: 'cool',
        count: 40
      },
      '3': {
        hashtag: 'awesome',
        count: 30
      },
      '4': {
        hashtag: 'weird',
        count: 20
      },
      '5': {
        hashtag: 'trippy',
        count: 10
      },
      '6': {
        hashtag: 'nice',
        count: 55
      },
      '7': {
        hashtag: 'great',
        count: 45
      },
      '8': {
        hashtag: 'adorbs',
        count: 35
      },
      '9': {
        hashtag: 'love',
        count: 25
      },
      '10': {
        hashtag: 'dig',
        count: 15
      }
    }
  }
}
