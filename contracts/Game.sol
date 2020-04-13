pragma solidity >0.5.16 <0.6.0
import "./safemath.sol";

contract GameTemplate {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    struct Team {
        string teamName;
        string record;
    }

    struct Bid {
        string bidTeam;
        uint bidAmount;
    }

    enum game_state{
        STARTED, ENDED, CANCELLED
    }

    struct Game {
        address internal game_owner;
        uint256 gameId;
        uint256 public game_start;
        uint256 public game_end;
        Team public homeTeam;
        Team public awayTeam;
        string public winner;
        string public score;
        uint256 public pool;
        mapping(address => Bid) public bids;
        game_state public gameState;
    }
}
