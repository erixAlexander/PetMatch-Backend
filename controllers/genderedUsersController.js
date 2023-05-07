const Onboarding = require("../model/Onboarding");

const handleGenderedUsers = async (req, res) => {

  if (!req?.query?.gender || !req?.query?.type) {
    return res.status(400).json({ message: "Missing gender or type." });
  }
    const gender = req.query.gender;
    const type = req.query.type;
    let query = {}
    try {
      if (gender === "any"){
        query = { type_of_pet: type };
      } else{
        query = { gender_identity: gender, type_of_pet: type };
      }
      
      const returnedUsers = await Onboarding.find(query);
      res.json(returnedUsers);
    } catch (err){
      console.log(err)
    }
  }

  module.exports = { handleGenderedUsers };