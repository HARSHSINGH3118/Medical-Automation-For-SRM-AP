// controllers/patient/advisoryController.js
export const getSeasonalAdvisory = async (req, res, next) => {
  try {
    const { season } = req.query;
    const advisoryMap = {
      Summer: ["Stay hydrated", "Avoid direct sunlight in peak hours"],
      Winter: ["Keep warm", "Consume vitamin-rich foods"],
      Rainy: ["Use an umbrella", "Avoid mosquito breeding grounds"],
    };

    const advisory = advisoryMap[season] || ["No specific advisory found."];
    res.status(200).json({ season, advisory });
  } catch (error) {
    next(error);
  }
};
