import GitHub from 'github-api';

// basic auth
const gh = new GitHub({
  username: process.env.GIT_USERNAME,
  password: process.env.GIT_PASSWORD,
});

const me = gh.getUser();
me.listNotification(function (err, notifcations) {
  // do some stuff
});

const clayreimann = gh.getUser('clayreimann');
clayreimann.listStarredRepos().then(function ({ data: reposJson }) {
  console.log(`clayreimann has ${reposJson.length} repos!`);
});

const oauthAuth = new GitHub({
  token: process.env.GIT_AUTH_TOKEN,
});

var fork = gh.getRepository('user', 'repo');

var hookDef = {
  name: 'travis',
  config: {
    user: 'your-Username',
    token: '00000000000000000000000000',
    domain: 'http://notify.travis-ci.org',
    content_type: 'json',
  },
  events: ['push', 'pull_request'],
  active: true,
};
