pragma solidity >0.5.16 <0.6.0
import "./safemath.sol";
import "./Game.sol";

contract BallinChain is GameTemplate{
      using SafeMath for uint256;
      using SafeMath32 for uint32;
      using SafeMath16 for uint16;

    function() external{

    }

    constructor (address _owner, uint _gameStart, uint _gameEnd, string memory _homeTeam, string memory _homeTeamRecord, string memory _awayTeam, string memory _awayTeamRecord) public{
        game_owner = _owner;
        game_start = _gameStart;
        game_end = _gameEnd;
        homeTeam.teamName = _homeTeam;
        homeTeam.record = _homeTeamRecord;
        awayTeam.teamName = _awayTeam;
        awayTeam.record = _awayTeamRecord;
        gameState = game_state.OPEN;
    }

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
          string[] res;
          return res;
      }

    function bidOnGame(Bid _bid) public payable game_yet_to_start returns (bool){
        require(msg.value > 0, "Bid must be greater than 0. Please try again.");
        require(bids[msg.sender].bidTeam == "" && bids[msg.sender].bidAmount == 0, "You've already bid, check back later for results.");
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
        require(gameState == UPDATED, "Final scores have not been entered yet.");
        require(bids[msg.sender].bidTeam == winner, "Sorry, the team you bet on didn't win.");
        uint amount = bids[msg.sender].bidAmount;
        bids[msg.sender] = 0;
        msg.sender.transfer(amount);
        emit WithdrawalEvent(msg.sender, amount);
        return true;
    }

    function updateGameFinal(string _winner, string _score) public only_owner returns (bool){
        winner = _winner;
        score = _score;
        gameState = game_state.UPDATED;
        return true;
    }

    function cancelGame(string _reason) external only_owner game_yet_to_start returns (bool){
        gameState = game_state.CANCELLED;
        game_start = now;
        emit CanceledGame(_reason, now);
        // add functionality to return payments to bidders
        return true;
    }

    function contractBalance() external view returns(uint){
        return address(this).balance;
    }
}
