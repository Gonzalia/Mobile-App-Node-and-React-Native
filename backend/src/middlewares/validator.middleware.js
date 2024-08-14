export const validateSchema = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    console.error("Error on validating schema: ", error);
    return res.status(400).json(error.errors.map((error) => error.message));
  }
};
