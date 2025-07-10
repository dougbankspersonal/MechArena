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
  function addInitiativeNode(parentNode, cardConfig) {
    var imageNode = htmlUtils.addImage(
      parentNode,
      ["initiative"],
      "initiative"
    );
    var numberNode = htmlUtils.addDiv(
      imageNode,
      ["number"],
      "number",
      cardConfig.initiative.toString()
    );

    return imageNode;
  }

  function addDeckMarkerNode(parentNode, deckConfig) {
    var deckImageNde = htmlUtils.addImage(
      parentNode,
      ["deck-marker", deckConfig.artConfig.mechImage],
      "deck-marker"
    );
    return deckImageNde;
  }

  function addTitleNode(parentNode, cardConfig) {
    var titleNode = htmlUtils.addDiv(
      parentNode,
      ["title"],
      "title",
      cardConfig.title
    );

    return titleNode;
  }

  function addDiscardEffectNode(parentNode, discardEffectConfig) {
    var discardEffectWrapperNode = htmlUtils.addDiv(
      parentNode,
      ["discard-effect-wrapper"],
      "discard-effect-wrapper"
    );
    var discardNode = htmlUtils.addImage(
      discardEffectWrapperNode,
      ["discard"],
      "discard"
    );
    var colonNode = htmlUtils.addDiv(
      discardEffectWrapperNode,
      ["colon"],
      "colon",
      ":"
    );

    var discardEffectImageNode = htmlUtils.addImage(
      discardEffectWrapperNode,
      ["discard-effect", discardEffectConfig.type],
      "discard-effect"
    );

    if (discardEffectConfig.count > 1) {
      var countNode = htmlUtils.addDiv(
        discardEffectWrapperNode,
        ["count"],
        "count",
        `x${discardEffectConfig.count.toString()}`
      );
    }

    return discardEffectWrapperNode;
  }

  function addCardFront(parentNode, index) {
    var cardConfig = mechArenaCardData.getCardConfigFromGlobalCardIndex(index);
    var deckConfig = mechArenaCardData.getDeckConfigFromGlobalCardIndex(index);
    var cardIndex =
      mechArenaCardData.getCardIndexInDeckFromGlobalCardIndex(index);
    var deckIndex = mechArenaCardData.getDeckIndexFromGlobalCardIndex(index);

    var cardFrontNode = cards.addCardFront(
      parentNode,
      ["mech-arena-card", cardConfig.type],
      "mech-arena-card-" + deckIndex.toString() + "-" + cardIndex.toString()
    );

    addInitiativeNode(cardFrontNode, cardConfig);
    addDeckMarkerNode(cardFrontNode, deckConfig);

    var frontWrapperNode = htmlUtils.addDiv(
      cardFrontNode,
      ["front-wrapper"],
      "front-wrapper"
    );

    addTitleNode(frontWrapperNode, cardConfig);

    if (cardConfig.discardEffect) {
      addDiscardEffectNode(cardFrontNode, cardConfig.discardEffect);
    }
  }

  function addBackForDeck(parent, deckConfig) {
    // Sometimes we get a null config (going backwards across a page).
    // Return null.
    if (!deckConfig) {
      return null;
    }

    var deckClass = "deck-" + deckConfig.deckId.toString(10);
    var cardBackNode = htmlUtils.addCard(
      parent,
      ["back", "mech-arena-card", deckClass],
      "back-" + deckConfig.deckId.toString(10)
    );
    cards.setCardSize(cardBackNode);

    var backWrapperNode = htmlUtils.addDiv(
      cardBackNode,
      ["back-wrapper"],
      "back-wrapper"
    );

    var mechImageNode = htmlUtils.addImage(
      backWrapperNode,
      [deckConfig.artConfig.mechImage],
      "mechImage"
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
