pragma solidity >0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;
import "./safemath.sol";
import "./Game.sol";

contract BallinChain is GameTemplate{
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    address payable internal contract_owner;
    Game[] private games;
    mapping (address => uint[]) userBettingHistory;
    mapping (string => uint[]) dateToGames;

    event NewGame(uint gameId, string date);
    event BetEvent(address better, string team);
    event WithdrawalEvent(address withdrawer, uint amount);
    event CanceledGame(string reason, uint time);
    function() external{

    }

    constructor () public{
        contract_owner = msg.sender;
    }

    function _createGame(uint256 _gameStart, uint256 _gameEnd, string memory _homeTeamName, string memory _homeTeamRecord, string memory _awayTeamName, string memory _awayTeamRecord, string memory _date) public only_owner {
        uint256 gameId = games.length;
        Team memory homeTeam = Team(_homeTeamName, _homeTeamRecord, 0);
        Team memory awayTeam = Team(_awayTeamName, _awayTeamRecord, 0);
        games.push(Game(gameId, _gameStart, _gameEnd, homeTeam, awayTeam, "", "", 0));
        dateToGames[_date].push(gameId);
        emit NewGame(gameId, _date);
    }

    function betOnGame(uint256 _gameId, string memory _betTeam) public payable returns (bool){
        require(msg.value > 0, "Bet must be greater than 0. Please try again.");
        require(keccak256(abi.encodePacked(games[_gameId].bets[msg.sender].betTeam)) == keccak256(abi.encodePacked("")) && games[_gameId].bets[msg.sender].betAmount == 0, "You've already placed a bet.");
        require(_gameId < games.length && _gameId >= 0, "Please enter a valid GameId.");
        require(keccak256(abi.encodePacked(_betTeam)) == keccak256(abi.encodePacked(games[_gameId].homeTeam.teamName)) || keccak256(abi.encodePacked(_betTeam)) == keccak256(abi.encodePacked(games[_gameId].awayTeam.teamName)), "Please enter a valid Team to bet on.");
        require(now < games[_gameId].game_start, "Game has started. Betting is closed.");
        uint betAmount = 0;
        betAmount = betAmount.add(msg.value);
        games[_gameId].pool = games[_gameId].pool.add(betAmount);
        games[_gameId].bets[msg.sender].betTeam = _betTeam;
        games[_gameId].bets[msg.sender].betAmount = betAmount;
        if(keccak256(abi.encodePacked(_betTeam)) == keccak256(abi.encodePacked(games[_gameId].homeTeam.teamName))){
            games[_gameId].homeTeam.totalBetters = games[_gameId].homeTeam.totalBetters.add(1);
        }
        else{
            games[_gameId].awayTeam.totalBetters = games[_gameId].awayTeam.totalBetters.add(1);
        }
        emit BetEvent(msg.sender, _betTeam);
        return true;
    }

    function withdraw(uint _gameId) public returns (bool){
        require(keccak256(abi.encodePacked(games[_gameId].winner)) != keccak256(abi.encodePacked("")) && keccak256(abi.encodePacked(games[_gameId].score)) != keccak256(abi.encodePacked("")), "Final scores have not been entered yet.");
        require(keccak256(abi.encodePacked(games[_gameId].bets[msg.sender].betTeam)) == keccak256(abi.encodePacked(games[_gameId].winner)), "Sorry, the team you bet on didn't win.");
        uint amount = games[_gameId].bets[msg.sender].betAmount;
        games[_gameId].bets[msg.sender].betAmount = 0;
        msg.sender.transfer(amount);
        emit WithdrawalEvent(msg.sender, amount);
        return true;
    }

    function updateGameFinal(uint _gameId, string memory _winner, string memory _score) public only_owner returns (bool){
        games[_gameId].winner = _winner;
        games[_gameId].score = _score;
        return true;
    }

    function cancelGame(uint _gameId, string memory _reason) public only_owner returns (bool){
        require(now < games[_gameId].game_start, "Too late to cancel the game.");
        games[_gameId].game_start = now;
        emit CanceledGame(_reason, now);
        // add functionality to return payments to betters
        return true;
    }

    function gameBalance(uint _gameId) external view returns(uint){
        return games[_gameId].pool;
    }

    function gameInfo(uint _gameId) external view returns(string[6] memory){
        return [games[_gameId].homeTeam.teamName, games[_gameId].homeTeam.record, games[_gameId].awayTeam.teamName, games[_gameId].awayTeam.record, games[_gameId].winner, games[_gameId].score];
    }

    function gameTimes(uint _gameId) external view returns(uint[2] memory){
        return [games[_gameId].game_start, games[_gameId].game_end];
    }

    function gameBetTeam(uint _gameId) external view returns(string memory){
        return games[_gameId].bets[msg.sender].betTeam;
    }

    function gameBetAmount(uint _gameId) external view returns(uint){
        return games[_gameId].bets[msg.sender].betAmount;
    }

    modifier only_owner(){
        require(msg.sender == contract_owner, "Must be owner to use this function.");
        _;
    }
}
