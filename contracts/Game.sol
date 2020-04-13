pragma solidity >0.5.16 <0.6.0
import "./safemath.sol";

contract Game {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;
    struct team {
        string teamName;
        string record;
    }
    struct bid {
        string bidTeam;
        uint bidAmount;
    }

    enum game_state{
        STARTED, ENDED, CANCELLED
    }

    address internal game_owner;
    uint256 public game_start;
    uint public game_end;
    team public homeTeam;
    team public awayTeam;
    string public winner;
    string public score;
    uint256 public pool;
    address[] bidders;
    mapping(address => bid) public bids;
    game_state public gameState;

    modifier game_yet_to_start(){
        require(now < game_start);
        _;
    }

    modifier game_finished(){
        require(now > game_end);
        _;
    }
    modifier only_owner(){
        require(msg.sender==game_owner);
        _;
    }

    event CanceledGame(string message, uint256 time);

    function createGame(address _owner, uint _gameStart, uint _gameEnd, string memory _homeTeam, string memory _homeTeamRecord, string memory _awayTeam, string memory _awayTeamRecord) public returns(bool){
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


}
