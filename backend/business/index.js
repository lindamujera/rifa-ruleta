const PrizePoolBusiness = require("./PrizePoolBusiness");
const RoundBusiness = require("./RoundBusiness");
const TicketBusiness = require("./TicketBusiness");
const SpinBusiness = require("./SpinBusiness");
const LotteryBusiness = require("./LotteryBusiness");
const BusinessService = require("./BusinessService");

module.exports = BusinessService;


class BusinessService {

    constructor() {

        this.prizePool = PrizePoolBusiness;
        this.round = RoundBusiness;
        this.ticket = TicketBusiness;
        this.spin = SpinBusiness;
        this.lottery = LotteryBusiness;

    }

    obtenerServicios() {

        return {
            prizePool: this.prizePool,
            round: this.round,
            ticket: this.ticket,
            spin: this.spin,
            lottery: this.lottery
        };

    }

}

module.exports = new BusinessService();