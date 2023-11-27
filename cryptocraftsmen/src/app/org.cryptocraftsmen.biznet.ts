import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.cryptocraftsmen.biznet{
   export class TradingCard extends Asset {
      sportsCardId: string;
      sportsCardName: string;
      sportsCardDescription: string;
      cardType: GameType;
      quantity: number;
      price: number;
      forTrade: boolean;
      cardOwner: Trader;
   }
   export class Trader extends Participant {
      traderOwnerId: string;
      traderOwnerName: string;
   }
   export class TradeCard extends Transaction {
      sportsCard: TradingCard;
      newOwnerName: Trader;
   }
   export class TradeNotification extends Event {
      sportsCard: TradingCard;
   }
   export enum GameType {
      Basketball,
      Football,
      Cricket,
   }
// }
