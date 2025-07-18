/* Deprecated */

define([
  "dojo/dom-style",
  "sharedJavascript/cards",
  "sharedJavascript/debugLog",
  "sharedJavascript/htmlUtils",
  "javascript/mechArenaCardData",
  "dojo/domReady!",
], function (domStyle, cards, debugLog, htmlUtils, mechArenaCardData) {
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

  function maybeAddJoinNode(parent, joinType, needAJoin) {
    if (!needAJoin) {
      return null;
    }
    var joinText;
    if (joinType == mechArenaCardData.joinTypes.And) {
      joinText = "+";
    } else if (joinType == mechArenaCardData.joinTypes.Or) {
      joinText = "/";
    } else if (joinType == mechArenaCardData.joinTypes.Toggle) {
      joinText = "<->";
    }
    var joinNode = htmlUtils.addDiv(
      parent,
      ["join"],
      "body-part-join",
      joinText
    );
    return joinNode;
  }

  function addBodyPartNode(parentNode, cardConfig) {
    var bodyPartWrapperNode = htmlUtils.addDiv(
      parentNode,
      ["body-part-wrapper"],
      "body-part-wrapper"
    );

    for (var i = 0; i < cardConfig.bodyParts.length; i++) {
      var bodyPartConfig = cardConfig.bodyParts[i];
      var bodyPartImageNode = htmlUtils.addImage(
        bodyPartWrapperNode,
        ["body-part", bodyPartConfig.type],
        "body-part-" + bodyPartConfig.type
      );
      if (bodyPartConfig.side) {
        var bodyPartSideNode = htmlUtils.addDiv(
          bodyPartImageNode,
          ["side"],
          "body-part-" + bodyPartConfig.side,
          bodyPartConfig.side == mechArenaCardData.bodyPartSides.Left
            ? "L"
            : "R"
        );
      }

      maybeAddJoinNode(
        bodyPartWrapperNode,
        cardConfig.bodyPartsJoinType,
        i < cardConfig.bodyParts.length - 1
      );
    }

    var number = cardConfig.bodyPartNumber
      ? cardConfig.bodyPartNumber.toString()
      : cardConfig.initiative.toString();

    var numberNode = htmlUtils.addDiv(
      bodyPartWrapperNode,
      ["number"],
      "body-part-number",
      number
    );

    return bodyPartWrapperNode;
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

  function addMovementPropertyNode(parentNode, cardConfig) {
    if (!cardConfig.movements || cardConfig.movements.length === 0) {
      return null;
    }

    var movementNode = htmlUtils.addDiv(
      parentNode,
      ["details-section", "movement"],
      "movement"
    );

    for (var i = 0; i < cardConfig.movements.length; i++) {
      var movementConfig = cardConfig.movements[i];
      var movementImageNode = htmlUtils.addImage(
        movementNode,
        ["movement-image", movementConfig.type],
        "movement-image-" + movementConfig.type
      );

      maybeAddJoinNode(
        movementNode,
        cardConfig.movementsJoinType,
        i < cardConfig.movements.length - 1
      );
    }

    return movementNode;
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

    domStyle.set(cardFrontNode, {
      "background-color": deckConfig.color,
    });

    addInitiativeNode(cardFrontNode, cardConfig);
    addBodyPartNode(cardFrontNode, cardConfig);

    var frontWrapperNode = htmlUtils.addDiv(
      cardFrontNode,
      ["front-wrapper"],
      "front-wrapper"
    );

    addTitleNode(frontWrapperNode, cardConfig);

    addMovementPropertyNode(frontWrapperNode, cardConfig);

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

    domStyle.set(backWrapperNode, {
      "background-color": deckConfig.color,
    });

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
