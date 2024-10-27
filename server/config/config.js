const mongoose = require("mongoose");
const Role = require("../models/role");
const Slot = require("../models/slot");
const PavillionSlot = require("../models/pavillion-slot");

const roles = [
  {
    name: "Admin",
    modules: [
      "meetings",
      "organizations",
      "negotiators",
      "calendar",
      "applicants",
    ],
  },
  {
    name: "Officer",
    modules: ["contacts", "international"],
  },
  {
    name: "Super Admin",
    modules: [
      "meetings",
      "organizations",
      "negotiators",
      "calendar",
      "applicants",
      "contacts",
      "international",
      "attendance",
      "export",
    ],
  },
  {
    name: "Reception",
    modules: ["meetings", "attendance", "calendar"],
  },
  {
    name: "Support",
    modules: [
      "meetings",
      "organizations",
      "negotiators",
      "calendar",
      "applicants",
      "contacts",
      "international",
      "attendance",
      "export",
    ],
  },
  {
    name: "Ghost",
    modules: [
      "meetings",
      "organizations",
      "negotiators",
      "calendar",
      "applicants",
      "contacts",
      "international",
      "attendance",
      "audit",
      "export",
      "users",
    ],
  },
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

const pavillionTimeSlots = [
  { timeSpan: "9:00am to 9:45am" },
  { timeSpan: "10:00am to 10:45am" },
  { timeSpan: "11:00am to 11:45am" },
  { timeSpan: "12:00pm to 12:45pm" },
  { timeSpan: "1:00pm to 1:45pm" },
  { timeSpan: "2:00pm to 2:45pm" },
  { timeSpan: "3:00pm to 3:45pm" },
  { timeSpan: "4:00pm to 4:45pm" },
  { timeSpan: "5:00pm to 5:45pm" },
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
    pavillionTimeSlots.forEach((slot) => {
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

    // const existingRoles = await Role.find({
    //   name: { $in: roles.map((role) => role.name) },
    // });
    // const slotsToInsert = generateSlots();
    // const pavillionSlotsToInsert = generateSlots();
    // const existingSlots = await Slot.find();
    // const existingPavillionSlots = await PavillionSlot.find();

    // // Update roles or insert them if they don't exist
    // for (const role of roles) {
    //   const existingRole = existingRoles.find((r) => r.name === role.name);

    //   if (existingRole) {
    //     // Update the role's modules if necessary
    //     if (
    //       JSON.stringify(existingRole.modules) !== JSON.stringify(role.modules)
    //     ) {
    //       existingRole.modules = role.modules;
    //       await existingRole.save();
    //       console.log(`Updated role: ${role.name}`);
    //     }
    //   } else {
    //     // If the role doesn't exist, create it
    //     await Role.create(role);
    //     console.log(`Created new role: ${role.name}`);
    //   }
    // }

    // // Check for missing slots and insert if needed
    // const missingSlots = slotsToInsert.filter((slot) => {
    //   return !existingSlots.some(
    //     (existingSlot) =>
    //       existingSlot.date.toISOString() === slot.date.toISOString() &&
    //       existingSlot.timeSpan === slot.timeSpan
    //   );
    // });

    // if (missingSlots.length > 0) {
    //   await Slot.deleteMany({});
    //   await Slot.insertMany(slotsToInsert);
    //   console.log(`Inserted ${missingSlots.length} new slots.`);
    // }

    // const missingPavillionSlots = pavillionSlotsToInsert.filter((slot) => {
    //   return !existingPavillionSlots.some(
    //     (existingSlot) =>
    //       existingSlot.date.toISOString() === slot.date.toISOString() &&
    //       existingSlot.timeSpan === slot.timeSpan
    //   );
    // });

    // if (missingPavillionSlots.length > 0) {
    //   await PavillionSlot.deleteMany({});
    //   await PavillionSlot.insertMany(pavillionSlotsToInsert);
    //   console.log(
    //     `Inserted ${missingPavillionSlots.length} new pavillion slots.`
    //   );
    // }

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
