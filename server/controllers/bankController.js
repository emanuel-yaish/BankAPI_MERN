const welcome = (req, res) => {
  try {
    res.status(200).send("Welcome to Bank API");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
};

module.exports = {
  welcome,
};
