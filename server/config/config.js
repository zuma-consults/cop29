const mongoose = require("mongoose");
const Role = require("../models/role");
const Slot = require("../models/slot");

const roles = [
  { name: "Admin" },
  { name: "Officer" },
  { name: "Super Admin" },
  { name: "Reception" },
];

const timeSlots = [
  { timeSpan: "9:00am to 10:20am" },
  { timeSpan: "10:20am to 11:40am" },
  { timeSpan: "11:40am to 1:00pm" },
  { timeSpan: "1:00pm to 2:20pm" },
  { timeSpan: "2:20pm to 3:40pm" },
  { timeSpan: "3:40pm to 5:00pm" },
  { timeSpan: "5:00pm to 6:20pm" },
  { timeSpan: "6:20pm to 7:40pm" },
];

const generateSlots = () => {
  const slots = [];
  const startDate = new Date("2024-11-11");
  const endDate = new Date("2024-11-22");

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    timeSlots.forEach((slot) => {
      const [startHour, startMinute, startPeriod] = slot.timeSpan
        .split(" to ")[0]
        .match(/(\d+):(\d+)(am|pm)/i)
        .slice(1);
      const [endHour, endMinute, endPeriod] = slot.timeSpan
        .split(" to ")[1]
        .match(/(\d+):(\d+)(am|pm)/i)
        .slice(1);

      const start = new Date(date);
      const end = new Date(date);

      start.setHours(
        startPeriod.toLowerCase() === "pm" && parseInt(startHour) !== 12
          ? parseInt(startHour) + 12
          : parseInt(startHour),
        parseInt(startMinute)
      );
      end.setHours(
        endPeriod.toLowerCase() === "pm" && parseInt(endHour) !== 12
          ? parseInt(endHour) + 12
          : parseInt(endHour),
        parseInt(endMinute)
      );

      slots.push({
        date: new Date(start),
        timeSpan: slot.timeSpan,
        start: start.toISOString(),
        end: end.toISOString(),
      });
    });
  }

  return slots;
};

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected.");

    const [existingRoles, existingSlots] = await Promise.all([
      Role.find({ name: { $in: roles.map((role) => role.name) } }),
      Slot.find(),
    ]);

    const missingRoles = roles.filter(
      (role) =>
        !existingRoles.some((existingRole) => existingRole.name === role.name)
    );

    const slotsToInsert = generateSlots();
    const missingSlots = slotsToInsert.filter((slot) => {
      const existingSlot = existingSlots.find(
        (existingSlot) =>
          existingSlot.date && // Check if existingSlot.date exists
          existingSlot.date.toISOString() === slot.date.toISOString() &&
          existingSlot.timeSpan === slot.timeSpan
      );

      if (!existingSlot) {
        console.log(`Missing Slot: ${slot.title}`);
      }
      return !existingSlot;
    });

    if (missingRoles.length > 0) {
      await Role.deleteMany({});
      await Role.insertMany(roles);
    }

    if (missingSlots.length > 0) {
      await Slot.deleteMany({});
      await Slot.insertMany(slotsToInsert);
    }

    console.log(
      `${
        process.env.NODE_ENV === "production" ? "Production" : "Development"
      } DB Connection Successful!`
    );

    mongoose.connection.on("open", () => console.log("Mongo Running"));
    mongoose.connection.on("error", (err) =>
      console.error(`MongoDB Connection Error: ${err}`)
    );
    mongoose.connection.on("disconnected", () =>
      console.log("MongoDB Disconnected")
    );
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
  }
};

module.exports = connectDb;
