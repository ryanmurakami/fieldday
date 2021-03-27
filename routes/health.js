module.exports = function (router) {
  router.get('/health', (_, res) => res.status(200))
}