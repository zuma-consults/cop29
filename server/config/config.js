const mongoose = require("mongoose");
const Role = require("../models/role");
const Slot = require("../models/slot");

const roles = [{ name: "Admin" }, { name: "Officer" }, { name: "Super Admin" }];
const timeSlots = [
  { timeSpan: "9:00am to 9:45am" },
  { timeSpan: "10:00am to 10:45am" },
  { timeSpan: "11:00am to 11:45am" },
  { timeSpan: "12:00pm to 12:45pm" },
  { timeSpan: "1:00pm to 1:45pm" },
  { timeSpan: "2:00pm to 2:45pm" },
  { timeSpan: "3:00pm to 3:45pm" },
  { timeSpan: "4:00pm to 4:45pm" },
  { timeSpan: "5:00pm to 5:45pm" },
  { timeSpan: "6:00pm to 6:45pm" },
];

const connectDb = async () => {
  try {
    mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected.");

    const [existingRoles, existingSlots] = await Promise.all([
      Role.find({ name: { $in: roles.map((role) => role.name) } }),
      Slot.find({ timeSpan: { $in: timeSlots.map((slot) => slot.timeSpan) } }),
    ]);

    const missingRoles = roles.filter(
      (role) =>
        !existingRoles.some((existingRole) => existingRole.name === role.name)
    );

    const missingSlots = timeSlots.filter(
      (slot) =>
        !existingSlots.some(
          (existingSlot) => existingSlot.timeSpan === slot.timeSpan
        )
    );

    const isProduction = process.env.NODE_ENV === "production";
    const logConnectionStatus = () =>
      console.log(
        `${
          isProduction ? "Production" : "Development"
        } DB Connection Successful!`
      );

    if (missingRoles.length > 0) {
      await Role.deleteMany({});
      await Role.insertMany(roles);
    }

    if (missingSlots.length > 0) {
      await Slot.deleteMany({});
      await Slot.insertMany(timeSlots);
    }

    logConnectionStatus();

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
