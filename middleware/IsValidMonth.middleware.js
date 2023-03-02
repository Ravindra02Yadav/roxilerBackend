const isValidMonth = (req, res, next) => {
  const { month } = req.query;

  if (
    ![
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ].includes(month.toUpperCase())
  )
    return res.status(401).send({ message: "Please enter the correct month" });

  next();
};

module.exports = { isValidMonth };
