const getRouter = (router, cors) => {
  router.get('/items', cors, (req, res) => {
    res.json({ result: 'Hello,World!' });
  });
  return router;
};

module.exports = getRouter;
