const Onboarding = require("../model/Onboarding");

const handleGenderedUsers = async (req, res) => {
  const { gender, type, userId, address } = req.query;

  if (!gender || !type || !userId || !address) {
    return res.status(400).json({
      message: "Missing a mandatory parameter: gender, type, address or id.",
    });
  }
  let query = { type_of_pet: type, user_id: { $ne: userId } };

  try {
    if (gender !== "any") {
      query.gender_identity = gender;
    }

    const returnedUsers = await Onboarding.find(query).select([
      "email",
      "images",
      "pet_name",
      "user_id",
      "about",
      "activity",
      "address_info",
      "dob_year",
      "distance",
      "gender_identity",
      "looking_for",
      "pedigree",
      "user_matches",
    ]);

    const checkDistance = async (userlat, userlon, matchlat, matchlon) => {
      try {
        if (!matchlat || !matchlon) return false;
        const response = await fetch(
          `https://api.tomtom.com/routing/1/calculateRoute/${userlat}%2C${userlon}%3A${matchlat}%2C${matchlon}/json?key=${process.env.TOMTOM_API_KEY}`
        );
        const text = await response.text();
        // const json = await response.json();
        console.log(
          "🚀 ~ file: genderedUsersController.js:46 ~ checkDistance ~ TEXT:",
          text
        );
        console.log(
          "🚀 ~ file: genderedUsersController.js:46 ~ checkDistance ~ JSON:",
          json
        );
        const distanceInKm = s;
        response.data.routes[0].summary.lengthInMeters / 1000;
        return { inDistance: distanceInKm < user.distance, distanceInKm };
      } catch (error) {
        console.log(error);
      }
    };

    const usersInDistance = await Promise.all(
      returnedUsers.map(async (user) => {
        const { inDistance, distanceInKm } = await checkDistance(
          address.lat,
          address.lon,
          user.address_info.lat,
          user.address_info.lon
        );
        return { ...user, inDistance, distanceInKm };
      })
    );
    console.log(
      "🚀 ~ file: genderedUsersController.js:72 ~ handleGenderedUsers ~ usersInDistance",
      usersInDistance
    );

    res.json(returnedUsers);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleGenderedUsers };
