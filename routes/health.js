module.exports = function (router) {
  router.get('/health', (_, res) => res.sendStatus(200))
}