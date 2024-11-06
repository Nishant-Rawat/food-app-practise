const testUserController = (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: "Test User Data API",
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { testUserController };
