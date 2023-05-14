import DailyLog from "../models/DailyLog.js";
import Disease from "../models/Disease.js";

const predict = async (searchMonth) => {
  if (!searchMonth) {
    throw new Error("Search month not provided");
  }

  const logs = await DailyLog.find({
    date: {
      $gte: new Date(2020, searchMonth - 1),
      $lt: new Date(2023, searchMonth),
    },
  });

  const diseaseMap = new Map();

  logs.forEach((log) => {
    diseaseMap.set(
      log.diseaseName,
      (diseaseMap.get(log.diseaseName) ?? 0) + log.diseaseCases
    );
  });

  const entries = [...diseaseMap.entries()];

  entries.sort((a, b) => b[1] - a[1]);

  const high = entries.slice(0, 10).filter(Boolean);

  const diseases = await Promise.all(
    high.map((h) => {
      return Disease.findOne({
        diseaseName: h[0],
      });
    })
  );

  return diseases.filter(Boolean).map((disease, idx) => {
    return { ...disease._doc, cases: parseInt(high[idx][1] / 3) };
  });
};

export default predict;