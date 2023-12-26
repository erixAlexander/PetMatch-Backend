const Onboarding = require("../model/Onboarding");

const handleGenderedUsers = async (req, res) => {
  const { gender, type, userId, address, user_matches, activity } = req.query;

  if (!gender || !type || !userId || !address) {
    return res.status(400).json({
      message: "Missing a mandatory parameter: gender, type, address or id.",
    });
  }

  const idsToExclude = (user_matches || []).map((match) => match.user_id);

  let query = {
    type_of_pet: type,
    user_id: {
      $nin: [...idsToExclude, userId],
    },
  };

  try {
    if (gender !== "any") {
      query.gender_identity = gender;
    }
    if (activity) {
      query.activity = activity;
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

    const checkDistance = async (
      userlat,
      userlon,
      matchlat,
      matchlon,
      distance
    ) => {
      try {
        if (!matchlat || !matchlon) return false;
        const response = await fetch(
          `https://api.tomtom.com/routing/1/calculateRoute/${userlat}%2C${userlon}%3A${matchlat}%2C${matchlon}/json?key=${process.env.TOMTOM_API_KEY}`
        );

        const data = await response.json();

        if (!data.routes || data.routes.length === 0) {
          return {
            inDistance: false,
            distanceInKm: 1000,
          };
        }

        const distanceInKm = data.routes[0].summary.lengthInMeters / 1000;
        return {
          inDistance: distanceInKm < distance,
          distanceInKm: distanceInKm,
        };
      } catch (error) {
        console.log(error);
      }
    };

    // const usersInDistance = await Promise.all(
    //   returnedUsers.map(async (user) => {
    //     const { inDistance, distanceInKm } = await checkDistance(
    //       address.lat,
    //       address.lon,
    //       user.address_info.lat,
    //       user.address_info.lon,
    //       user.distance
    //     );
    //     return { ...user._doc, inDistance, distanceInKm };
    //   })
    // );

    // const filteredUsers = usersInDistance.filter((user) => user.inDistance);

    res.json(returnedUsers);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { handleGenderedUsers };
