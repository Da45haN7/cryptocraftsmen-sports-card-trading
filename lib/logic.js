/**
 * Buy card transaction
 * @param {org.cryptocraftsmen.biznet.TradeCard} trade
 * @transaction
 */
async function buyCard(trade) {
  if (trade.card.forTrade) {
    // If card is available for trade
    trade.card.owner = trade.newOwnerName;
    return getAssetRegistry("org.cryptocraftsmen.biznet.TradingCard")
      .then(assetRegistry => {
        return assetRegistry.update(trade.card); // Update the network registry
      })
      .then(() => {
        let eve = getFactory().newEvent(
          "org.cryptocraftsmen.biznet",
          "TradeNotification"
        ); // Get a reference to the event specified in the modeling language
        eve.card = trade.card;
        emit(eve); // Fire off the event
      });
  }
}
