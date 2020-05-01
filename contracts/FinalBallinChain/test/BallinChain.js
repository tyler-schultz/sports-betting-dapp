const BallinChain = artifacts.require("BallinChain");
//const utils = require("./helpers/utils");
//const time = require("./helpers/time");
var expect = require('chai').expect;
//const zombieNames = ["Zombie 1", "Zombie 2"];
contract("BallinChain", (accounts) => {
    let [alice, bob, jack] = accounts;
    let contractInstance;
    beforeEach(async () => {
        contractInstance = await BallinChain.new({from: alice});
    });
    it("should be able to create a new game", async () => {
        const result = await contractInstance.createGame(0, 0, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
    })
    it("should be able to create multiple new games", async () => {
        const result = await contractInstance.createGame(0, 0, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result1 = await contractInstance.createGame(0, 0, "tomorrow", "Nuggets", "1-0", "Cavs", "0-1", {from: alice});
        expect(result1.logs[0].args.gameId.toString()).equal("1");
	expect(result1.logs[0].args.date).equal("tomorrow");
    })
    it("should be able to check total games today", async () => {
        const result = await contractInstance.createGame(0, 0, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
	const result1 = await contractInstance.totalGamesToday("today");
	expect(result1.toString()).equal("1");

    })
    it("should be able to get gameID for game today", async () => {
        const result = await contractInstance.createGame(0, 0, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
	const result1 = await contractInstance.getGameToday("today", 0);
	expect(result1.toString()).equal("0");

    })
    it("should be able to get multiple gameIDs for games today", async () => {
        const result = await contractInstance.createGame(0, 0, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result1 = await contractInstance.createGame(0, 0, "today", "Mavs", "0-0", "Cavs", "0-0", {from: alice});
        expect(result1.logs[0].args.gameId.toString()).equal("1");
	expect(result1.logs[0].args.date).equal("today");
	const result2 = await contractInstance.totalGamesToday("today");
	expect(result2.toString()).equal("2");
	const result3 = await contractInstance.getGameToday("today", 0);
	expect(result3.toString()).equal("0");
	const result4 = await contractInstance.getGameToday("today", 1);
	expect(result4.toString()).equal("1");
    })
    it("should be able to bet on game", async () => {
        const result = await contractInstance.createGame(10000000000, 90000000000, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result1 = await contractInstance.betOnGame(0, "Nuggets", {from: alice, value: 1000000000000000000});
        expect(result1.logs[0].args.better).equal(alice);
	expect(result1.logs[0].args.team).equal("Nuggets");

    })
    it("should be able to see current pool on game", async () => {
        const result = await contractInstance.createGame(10000000000, 90000000000, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result1 = await contractInstance.betOnGame(0, "Nuggets", {from: alice, value: 1000000000000000000});
        expect(result1.logs[0].args.better).equal(alice);
	expect(result1.logs[0].args.team).equal("Nuggets");
	const result2 = await contractInstance.gameBalance(0);
	expect(result2.toString()).equal("1000000000000000000");

    })
    it("should be able to see bet info on game", async () => {
        const result = await contractInstance.createGame(10000000000, 90000000000, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result1 = await contractInstance.betOnGame(0, "Nuggets", {from: alice, value: 1000000000000000000});
        expect(result1.logs[0].args.better).equal(alice);
	expect(result1.logs[0].args.team).equal("Nuggets");
	const result2 = await contractInstance.getGameBetData(0);
	expect(result2[0].toString()).equal("Nuggets");
	expect(result2[1].toString()).equal("1000000000000000000");
    })
    it("should be able to see total user bets", async () => {
        const result = await contractInstance.createGame(10000000000, 90000000000, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result1 = await contractInstance.betOnGame(0, "Nuggets", {from: alice, value: 1000000000000000000});
        expect(result1.logs[0].args.better).equal(alice);
	expect(result1.logs[0].args.team).equal("Nuggets");
	const result2 = await contractInstance.totalUserBets({from: alice});
	expect(result2.toString()).equal("1");
    })
    it("should be able to get past gameIds bet on", async () => {
        const result = await contractInstance.createGame(10000000000, 90000000000, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result1 = await contractInstance.betOnGame(0, "Nuggets", {from: alice, value: 1000000000000000000});
        expect(result1.logs[0].args.better).equal(alice);
	expect(result1.logs[0].args.team).equal("Nuggets");
	const result2 = await contractInstance.totalUserBets({from: alice});
	expect(result2.toString()).equal("1");
	const result3 = await contractInstance.getGameFromHistory(0, {from: alice});
	expect(result3.toString()).equal("0");
    })
    it("should be able to allow multiple users to bet", async () => {
        const result = await contractInstance.createGame(10000000000, 90000000000, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result1 = await contractInstance.betOnGame(0, "Nuggets", {from: alice, value: 1000000000000000000});
        expect(result1.logs[0].args.better).equal(alice);
	expect(result1.logs[0].args.team).equal("Nuggets");
        const result2 = await contractInstance.betOnGame(0, "Nuggets", {from: bob, value: 1000000000000000000});
        expect(result2.logs[0].args.better).equal(bob);
	expect(result2.logs[0].args.team).equal("Nuggets");
        const result3 = await contractInstance.betOnGame(0, "Suns", {from: jack, value: 1000000000000000000});
        expect(result3.logs[0].args.better).equal(jack);
	expect(result3.logs[0].args.team).equal("Suns");
	const result4 = await contractInstance.gameBalance(0);
	expect(result4.toString()).equal("3000000000000000000");
    })
    it("should be able to allow multiple users to withdraw", async () => {
        const result = await contractInstance.createGame(10000000000, 90000000000, "today", "Nuggets", "0-0", "Suns", "0-0", {from: alice});
        expect(result.logs[0].args.gameId.toString()).equal("0");
	expect(result.logs[0].args.date).equal("today");
        const result2 = await contractInstance.betOnGame(0, "Nuggets", {from: bob, value: 1000000000000000000});
        expect(result2.logs[0].args.better).equal(bob);
	expect(result2.logs[0].args.team).equal("Nuggets");
        const result3 = await contractInstance.betOnGame(0, "Suns", {from: jack, value: 1000000000000000000});
        expect(result3.logs[0].args.better).equal(jack);
	expect(result3.logs[0].args.team).equal("Suns");
	const result4 = await contractInstance.gameBalance(0);
	expect(result4.toString()).equal("2000000000000000000");
	const result5 = await contractInstance.cancelGame(0, "Test", {from: alice});
	const result6 = await contractInstance.updateGameFinal(0, "Nuggets", "100-99", {from: alice});
	const result7 = await contractInstance.withdraw(0, {from: bob});
	expect(result7.logs[0].args.withdrawer).equal(bob);
	expect(result7.logs[0].args.amount.toString()).equal("1500000000000000000");
	const result8 = await contractInstance.gameBalance(0);
	expect(result8.toString()).equal("500000000000000000");
	const result9 = await contractInstance.ownerWithdraw(0, {from: alice});
	expect(result9.logs[0].args.withdrawer).equal(alice);
	expect(result9.logs[0].args.amount.toString()).equal("500000000000000000");
	const result10 = await contractInstance.gameBalance(0);
	expect(result10.toString()).equal("0");
    })
})

