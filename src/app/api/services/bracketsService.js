import pool from "./connection.js";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager, helpers } from "brackets-manager";
import { json } from "express";

const storage = new InMemoryDatabase();
const manager = new BracketsManager(storage);

const createBracketTest = async (numPlayers, format) => {
    let seedinglist = [];
    let config;

    for(let i = 0; i < numPlayers; i++) {
        let playerName = "Player " + i;
        seedinglist.push(playerName);
    }

    switch (format) {
        case 'double_elimination':

            const seedOrder = ["inner_outer"];
            const doubleEliminationSettings = {
                seedOrdering: seedOrder,
                consolationFinal: false,
                skipFirstRound: false,
                grandFinal: "double",
                size: helpers.getNearestPowerOfTwo(numPlayers)
            };
            config = {
                tournamentId: "123",
                name: "Example name",
                type: format,
                settings: doubleEliminationSettings,
                seeding: seedinglist,
            }

    }

    await manager.create.stage(config);

    let jsonData = await manager.export();

    return jsonData;

}

export default {
    createBracketTest,
};