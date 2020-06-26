// STAGES EXPECTED: staging, pre-prod, prod
module.exports = {
    stage: process.env.APP_STAGE || 'staging',
    mytestApi: {
        url: process.env.MY_TEST_API
    }
}
