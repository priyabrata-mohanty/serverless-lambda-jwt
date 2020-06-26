const CONFIG = require('./config');
const { Router } = require('./utils/router');
const loginRouter = require('./routes/login');

const router = Router({ trimTrailingSlash: true });

router.post('/login',function (event, context, config) {
  return loginRouter.verifyUser(event.body)
});

router.get('/verify', function (event, context, config) {
  console.log('Come after middleware')
  return {"message":"success"}
});


exports.handler = async function (event, context) {
  // route
  let result = await router.route(event, context, CONFIG);
  return result.response;
}