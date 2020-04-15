pragma solidity >=0.5.0 <0.6.0;
import "./safemath.sol";

contract GameTemplate {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    struct Team {
        string teamName;
        string record;
        uint totalBidders;
    }

    struct Bid {
        string bidTeam;
        uint bidAmount;
    }

    struct Game {
        uint256 gameId;
        uint256 game_start;
        uint256 game_end;
        Team homeTeam;
        Team awayTeam;
        string winner;
        string score;
        uint256 pool;
        mapping(address => Bid) bids;
    }

    modifier only_owner(){
        require(msg.sender==contract_owner);
        _;
    }

    modifier game_yet_to_start(){
        require(now < game_start);
        _;
    }

    modifier game_finished(){
        require(now > game_end);
        _;
    }
}
