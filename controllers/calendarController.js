const express = require("express");
const Calendar = require("../models/calendar");

const router = express.Router();

router.get("/", (req, res) => {
  const now = new Date();
  const year = req.query.year || now.getFullYear();
  const month = req.query.month || now.getMonth() + 1;
  const calendar = new Calendar(year, month);
  const daysInMonth = calendar.getDaysInMonth();
  const firstDayOfMonth = calendar.getFirstDayOfMonth();
  const monthName = calendar.getMonth();
  const yearNum = calendar.getYear();

  res.render("calendar", {
    title: "My Calendar",
    year: yearNum,
    month: monthName,
    daysInMonth: daysInMonth,
    firstDayOfMonth: firstDayOfMonth,
  });
});

module.exports = router;
