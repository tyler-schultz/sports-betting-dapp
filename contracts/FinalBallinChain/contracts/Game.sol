pragma solidity >=0.5.0 <0.6.0;
import "./safemath.sol";

contract GameTemplate {
    using SafeMath for uint256;
    using SafeMath32 for uint32;
    using SafeMath16 for uint16;

    struct Team {
        string teamName;
        string record;
        uint totalBetters;
        uint totalAmount;
    }

    struct Bet {
        string betTeam;
        uint betAmount;
    }

    struct Game {
        uint256 gameId;
        uint256 game_start;
        uint256 game_end;
        string date;
        Team homeTeam;
        Team awayTeam;
        string winner;
        string score;
        uint256 pool;
        uint256 finalPool;
        mapping(address => Bet) bets;
    }
}
