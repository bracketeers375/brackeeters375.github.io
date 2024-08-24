import pool from "./connection.js";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager, helpers } from "brackets-manager";
import { json } from "express";

const storage = new InMemoryDatabase();
console.log("storage: ", storage);
const manager = new BracketsManager(storage);

const createBracketTest = async (numPlayers, format) => {
  let seedinglist = [];
  let config;
  let seedOrder;

  for (let i = 0; i < numPlayers; i++) {
    let playerName = "Player " + i;
    seedinglist.push(playerName);
  }

  switch (format) {
    case "single_elimination":
      seedOrder = ["inner_outer"];
      const singleEliminationSettings = {
        seedOrdering: seedOrder,
        consolationFinal: false,
      };
      config = {
        tournamentId: 123,
        type: format,
        name: "Example name",
        settings: singleEliminationSettings,
        seeding: seedinglist,
      };
    case "double_elimination":
      seedOrder = ["inner_outer"];
      const doubleEliminationSettings = {
        seedOrdering: seedOrder,
        consolationFinal: false,
        skipFirstRound: false,
        grandFinal: "double",
        size: helpers.getNearestPowerOfTwo(numPlayers),
      };

      config = {
        tournamentId: "123",
        name: "Example name",
        type: format,
        settings: doubleEliminationSettings,
        seeding: seedinglist,
      };

    case "round_robin":
      const roundRobinSettings = {
        roundRobinMode: "simple",
        groupCount: 1,
        size: helpers.getNearestPowerOfTwo(numPlayers),
      };

      config = {
        tournamentId: "123",
        name: "Example name",
        type: format,
        settings: roundRobinSettings,
        seeding: seedinglist,
      };
  }

  await manager.create.stage(config);
  let jsonData = await manager.export();
  console.log("jsondata INSIDE: ", jsonData);
  return jsonData;
};

export default {
  createBracketTest,
};
