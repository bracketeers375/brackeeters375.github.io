import pool from "./connection.js";
import { InMemoryDatabase } from "brackets-memory-db";
import { BracketsManager } from "brackets-manager";
import { json } from "express";

const storage = new InMemoryDatabase();
const manager = new BracketsManager(storage);

const createBracketTest = async (numPlayers, format) => {
    console.log("createBracketTestServce");
    console.log("numPlayers: ", numPlayers);
    let seedinglist = [];

    for(let i = 0; i < numPlayers; i++) {
        let playerName = "Player " + i;
        seedinglist.push(playerName);
    }

    console.log("seedinglist: ", seedinglist);
    await manager.create.stage({
        tournamentId: "123",
        type: format,
        name: "Example stage",
        seeding: seedinglist,
        settings: {grandFinal: 'double' },
    });

    let jsonData = await manager.export();
    console.log("jsonData: ", jsonData);

    return jsonData;

}

export default {
    createBracketTest,
};