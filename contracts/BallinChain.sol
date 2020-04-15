pragma solidity >0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;
import "./safemath.sol";
import "./Game.sol";

contract BallinChain is GameTemplate{
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    address payable internal contract_owner;
    Game[] public games;
    mapping (address => uint[]) userBiddingHistory;
    mapping (string => uint[]) dateToGames;

    event NewGame(uint gameId, string date);
    event BidEvent(address bidder, string team);
    event WithdrawalEvent(address withdrawer, uint amount);
    event CanceledGame(string reason, uint time);
    function() external{

    }

    constructor () public{
        contract_owner = msg.sender;
    }
    //Team NEEDS TO BE CHANGED TO COMPONENTS WITHIN TEAM
    function _createGame(uint256 _gameStart, uint256 _gameEnd, Team memory _homeTeam, Team memory _awayTeam, string memory _date) public only_owner {
        uint256 gameId = games.length;
        games.push(Game(gameId, _gameStart, _gameEnd, _homeTeam, _awayTeam, "", "", 0));
        dateToGames[_date].push(gameId);
        emit NewGame(gameId, _date);
    }
    //bid NEEDS TO BE CHANGED TO COMPONENTS WITHIN BID
    function bidOnGame(uint256 _gameId, Bid memory _bid) public payable returns (bool){
        require(msg.value > 0, "Bid must be greater than 0. Please try again.");
        require(keccak256(abi.encodePacked(games[_gameId].bids[msg.sender].bidTeam)) == keccak256(abi.encodePacked("")) && games[_gameId].bids[msg.sender].bidAmount == 0, "You've already placed a bet.");
        require(_gameId < games.length && _gameId >= 0, "Please enter a valid GameId.");
        require(keccak256(abi.encodePacked(_bid.bidTeam)) == keccak256(abi.encodePacked(games[_gameId].homeTeam.teamName)) || keccak256(abi.encodePacked(_bid.bidTeam)) == keccak256(abi.encodePacked(games[_gameId].awayTeam.teamName)), "Please enter a valid Team to bid on.");
        require(now < games[_gameId].game_start, "Game has started. Bidding is closed.");
        _bid.bidAmount = _bid.bidAmount.add(msg.value);
        games[_gameId].pool = games[_gameId].pool.add(_bid.bidAmount);
        games[_gameId].bids[msg.sender] = _bid;
        if(keccak256(abi.encodePacked(_bid.bidTeam)) == keccak256(abi.encodePacked(games[_gameId].homeTeam.teamName))){
            games[_gameId].homeTeam.totalBidders = games[_gameId].homeTeam.totalBidders.add(1);
        }
        else{
            games[_gameId].awayTeam.totalBidders = games[_gameId].awayTeam.totalBidders.add(1);
        }
        emit BidEvent(msg.sender, _bid.bidTeam);
        return true;
    }

    function withdraw(uint _gameId) public returns (bool){
        require(keccak256(abi.encodePacked(games[_gameId].winner)) != keccak256(abi.encodePacked("")) && keccak256(abi.encodePacked(games[_gameId].score)) != keccak256(abi.encodePacked("")), "Final scores have not been entered yet.");
        require(keccak256(abi.encodePacked(games[_gameId].bids[msg.sender].bidTeam)) == keccak256(abi.encodePacked(games[_gameId].winner)), "Sorry, the team you bet on didn't win.");
        uint amount = games[_gameId].bids[msg.sender].bidAmount;
        games[_gameId].bids[msg.sender].bidAmount = 0;
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
        // add functionality to return payments to bidders
        return true;
    }

    function contractBalance(uint _gameId) external view returns(uint){
        return games[_gameId].pool;
    }

    modifier only_owner(){
        require(msg.sender == contract_owner, "Must be owner to use this function.");
        _;
    }
}
