pragma solidity >0.5.16 <0.6.0
import "./safemath.sol";
import "./Game.sol";

contract BallinChain is GameTemplate{
      using SafeMath for uint256;
      using SafeMath32 for uint32;
      using SafeMath16 for uint16;

      event NewGame(uint gameId); //might want to emit some other variables

      address internal contract_owner;
      Game[] public games;
      mapping (address => uint[]) userBiddingHistory;

      function _createGame() public only_owner {
        //require contract owner to be able to create games, done via modifier
        //potentially fetch data from outside
        //get gameId from length of array
        //create game and push to games
        //emit event
      }

      function _fetchData() private returns(string[]){
        //fetch games for the day
        //do some parsing potentially
        //return result so creating games is smooth
      }

       modifier only_owner(){
           require(msg.sender==contract_owner);
           _;
       }


}






















       modifier game_yet_to_start(){
           require(now < game_start);
           _;
       }

       modifier game_finished(){
           require(now > game_end);
           _;
       }

       event CanceledGame(string message, uint256 time);

       constructor createGame(address _owner, uint _gameStart, uint _gameEnd, string memory _homeTeam, string memory _homeTeamRecord, string memory _awayTeam, string memory _awayTeamRecord) public returns(bool){
           game_owner = _owner;
           game_start = _gameStart;
           game_end = _gameEnd;
           homeTeam.teamName = _homeTeam;
           homeTeam.record = _homeTeamRecord;
           awayTeam.teamName = _awayTeam;
           awayTeam.record = _awayTeamRecord;
           gameState = game_state.STARTED;
       }

    function bidOnGame(bid _bid) public payable game_yet_to_start returns (bool){
        require(msg.value > 0, "Bid must be greater than 0. Please try again.");
        //require(bids[msg.sender].bidTeam == "" && bids[msg.sender].bidAmount == 0, "You've already bid, check back later for results.");
        //add to pool
        //add bidder to bidders?
        //add bid to bids
        //emit bidEvent
        return true;
    }

    function withdraw() public game_finished returns (bool){
        if(gameState != ENDED){
            gameState = game_state.ENDED;
        }
        //require(bids[msg.sender].bidTeam == winner, "Sorry, the team you bet on didn't win.");
        //uint amount = bids[msg.sender].bidAmount;
        //bids[msg.sender] = 0;
        //msg.sender.transfer(amount);
        //emit WithdrawalEvent(msg.sender, amount);
        return true;
    }

    function updateGameFinal(string _winner, string _score) public only_owner returns (bool){
        winner = _winner;
        score = _score;
        return true;
    }

    function cancelGame(string _reason) external only_owner game_yet_to_start returns (bool){
        gameState = game_state.CANCELLED;
        game_start = now;
        emit CanceledGame(_reason, now);
        return true;
    }