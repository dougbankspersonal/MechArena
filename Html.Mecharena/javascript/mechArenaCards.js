/* Deprecated */

define([
  "dojo/string",
  "dojo/dom-style",
  "sharedJavascript/cards",
  "sharedJavascript/debugLog",
  "sharedJavascript/htmlUtils",
  "javascript/gameInfo",
  "javascript/mechArenaCardData",
  "dojo/domReady!",
], function (
  string,
  domStyle,
  cards,
  debugLog,
  htmlUtils,
  gameInfo,
  mechArenaCardData
) {
  //-----------------------------------
  //
  // Constants
  //
  //-----------------------------------

  //-----------------------------------
  //
  // Functions
  //
  //-----------------------------------
  function addCardFront(parentNode, index) {
    var cardConfig = mechArenaCardData.getCardConfigFromGlobalCardIndex(index);
    var cardIndex =
      mechArenaCardData.getCardIndexInDeckFromGlobalCardIndex(index);
    var deckIndex = mechArenaCardData.getDeckIndexFromGlobalCardIndex(index);

    var cardFrontNode = cards.addCardFront(
      parentNode,
      ["mech-arena-card"],
      "mech-arena-card-" + deckIndex.toString() + "-" + cardIndex.toString()
    );

    var frontWrapperNode = htmlUtils.addDiv(
      cardFrontNode,
      ["front-wrapper"],
      "front-wrapper"
    );

    var titleNode = htmlUtils.addDiv(
      frontWrapperNode,
      ["title"],
      "title",
      cardConfig.title
    );
  }

  function addBackForDeck(parent, deckConfig) {
    // Sometimes we get a null config (going backwards across a page).
    // Return null.
    if (!deckConfig) {
      return null;
    }

    var cardBackNode = htmlUtils.addCard(
      parent,
      ["back", "mech-arena-card"],
      "back-" + deckConfig.deckId.toString(10)
    );
    cards.setCardSize(cardBackNode);

    var backWrapperNode = htmlUtils.addDiv(
      cardBackNode,
      ["back-wrapper"],
      "back-wrapper"
    );

    var backImageNode = htmlUtils.addImage(
      cardBackNode,
      [deckConfig.artConfig.backImage],
      "backImage"
    );

    var backTextNode = htmlUtils.addDiv(
      backWrapperNode,
      ["back-text"],
      "back-text",
      deckConfig.deckName
    );
    return cardBackNode;
  }

  // This returned object becomes the defined value of this module
  return {
    addCardFront: addCardFront,
    addBackForDeck: addBackForDeck,
  };
});
