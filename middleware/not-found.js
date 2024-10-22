const notFound = (req, res) => res.status(404).send("You Lost: Route Does Not Exist")
module.exports = notFound;