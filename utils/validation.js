const validateEditProfileData = (req, res) => {
  const allowedFields = ["firstName", "lastName"];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedFields.includes(field)
  );

  return isEditAllowed;
};

module.exports = {
  validateEditProfileData,
};
