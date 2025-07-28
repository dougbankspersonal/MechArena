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

  function addJoinNode(parent, joinType) {
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

  function insertExpendablesNodes(parentNode, expendablesArray, opt_joinType) {
    debugLog.debugLog(
      "Cards",
      "insertExpendablesNodes expendablesArray = " +
        JSON.stringify(expendablesArray)
    );
    var joinType = opt_joinType || mechArenaCardData.joinTypes.And;
    for (var i = 0; i < expendablesArray.length; i++) {
      if (i > 0) {
        addJoinNode(parentNode, joinType);
      }

      var expendableConfig = expendablesArray[i];
      var count = expendableConfig.count || 1;
      for (var j = 0; j < count; j++) {
        var expendableImageNode = htmlUtils.addImage(
          parentNode,
          ["expendable", expendableConfig.type],
          "expendable-" + expendableConfig.type
        );
      }
    }
  }

  function addBodyPartNode(parentNode, cardConfig) {
    var bodyPartWrapperNode = htmlUtils.addDiv(
      parentNode,
      ["body-part-wrapper"],
      "body-part-wrapper"
    );

    for (var i = 0; i < cardConfig.bodyParts.length; i++) {
      if (i > 0) {
        addJoinNode(bodyPartWrapperNode, cardConfig.bodyPartsJoinType);
      }

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

  function addCountNode(parentNode, opt_count) {
    console.log("addCountNode", opt_count);
    if (opt_count === undefined || opt_count === null || opt_count <= 0) {
      return null;
    }
    var countNode = htmlUtils.addDiv(
      parentNode,
      ["count"],
      "count",
      `x${opt_count.toString()}`
    );
    return countNode;
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

  function addExpendablesNode(parentNode, cardConfig) {
    var expendabes = cardConfig.expendabes || [];
    if (expendabes.length === 0) {
      return null;
    }

    console.log("addExpendablesNode adding child");
    var expendableWrapperNode = htmlUtils.addDiv(
      parentNode,
      ["expendable-wrapper"],
      "expendable-wrapper"
    );

    insertExpendablesNodes(
      expendableWrapperNode,
      expendabes,
      cardConfig.expendableJoinType
    );
  }

  function addDetailsSectionNode(parentNode, sectionClass, sectionId) {
    return htmlUtils.addDiv(
      parentNode,
      ["details-section", sectionClass],
      sectionId
    );
  }

  function addAttackModNode(attackModsNode, attackMod) {
    debugLog.debugLog(
      "Cards",
      "addAttackModNode attackMod = " + JSON.stringify(attackMod)
    );
    // Making some assumptions for now, could break later (e.g. that we never go up or down more than one die).
    if (attackMod.type === mechArenaCardData.attackModTypes.DieUp) {
      var attackModImageNode = htmlUtils.addImage(
        attackModsNode,
        ["attack-mod", "die-up"],
        "attack-mod-die-up"
      );
    } else if (attackMod.type === mechArenaCardData.attackModTypes.DieDown) {
      var attackModImageNode = htmlUtils.addImage(
        attackModsNode,
        ["attack-mod", "die-down"],
        "attack-mod-die-down"
      );
    } else if (attackMod.type === mechArenaCardData.attackModTypes.Forbidden) {
      var attackModImageNode = htmlUtils.addImage(
        attackModsNode,
        ["attack-mod", "forbidden"],
        "attack-mod-forbidden"
      );
    } else if (attackMod.type === mechArenaCardData.attackModTypes.Reload) {
      // What expendables are being reloaded?
      var reloadImageNode = htmlUtils.addImage(
        attackModsNode,
        ["attack-mod", "reload"],
        "attack-mod-reload"
      );
      // We have to say what we're reloading, how much, etc.
      insertExpendablesNodes(attackModsNode, attackMod.expendables);
    } else if (attackMod.type === mechArenaCardData.attackModTypes.EvadeMelee) {
      // <Not sure what this means>>
      var evadeMeleeImageNode = htmlUtils.addImage(
        attackModsNode,
        ["attack-mod", "evade-melee"],
        "attack-mod-reload"
      );
      addCountNode(attackModsNode, attackMod.count);
    } else if (
      attackMod.type === mechArenaCardData.attackModTypes.DestroyLocation
    ) {
      var destroyLocationImageNode = htmlUtils.addImage(
        attackModsNode,
        ["attack-mod", "destroy-location"],
        "attack-mod-reload"
      );
    } else {
      debugLog.logError("Unknown attack mod type: ", attackModConfig.type);
      return null;
    }
  }

  function addAttackModsSection(
    parentNode,
    sectionClass,
    sectionId,
    opt_attackModsArray,
    opt_joinType
  ) {
    var attackModsArray = opt_attackModsArray || [];
    var joinType = opt_joinType || mechArenaCardData.joinTypes.And;

    if (attackModsArray.length === 0) {
      return null;
    }

    var attackModsNode = addDetailsSectionNode(
      parentNode,
      sectionClass,
      sectionId
    );

    for (var i = 0; i < attackModsArray.length; i++) {
      if (i > 0) {
        addJoinNode(attackModsNode, joinType);
      }

      var attackMod = attackModsArray[i];
      addAttackModNode(attackModsNode, attackMod);
    }
    return attackModsNode;
  }

  function addMovementPropertyNode(parentNode, cardConfig) {
    if (!cardConfig.movements || cardConfig.movements.length === 0) {
      return null;
    }

    var movementNode = addDetailsSectionNode(
      parentNode,
      "movement",
      "movement"
    );

    for (var i = 0; i < cardConfig.movements.length; i++) {
      if (i > 0) {
        addJoinNode(movementNode, cardConfig.movementsJoinType);
      }

      var movementConfig = cardConfig.movements[i];
      var movementImageNode = htmlUtils.addImage(
        movementNode,
        ["movement-image", movementConfig.type],
        "movement-image-" + movementConfig.type
      );
    }

    return movementNode;
  }

  function addDiscardEffectNode(parentNode, discardEffectConfig) {
    debugLog.debugLog(
      "Cards",
      "addDiscardEffectNode = " + JSON.stringify(discardEffectConfig)
    );

    if (
      discardEffectConfig == undefined ||
      discardEffectConfig == null ||
      discardEffectConfig.length == 0
    ) {
      return null;
    }

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

    if (
      discardEffectConfig.type ==
      mechArenaCardData.discardEffectTypes.GetExpendables
    ) {
      var reloadImageNode = htmlUtils.addImage(
        discardEffectWrapperNode,
        ["discard-effect", "reload"],
        "discard-effect-reload"
      );
      insertExpendablesNodes(
        discardEffectWrapperNode,
        discardEffectConfig.expendables
      );
    } else {
      var discardEffectImageNode = htmlUtils.addImage(
        discardEffectWrapperNode,
        ["discard-effect", discardEffectConfig.type],
        "discard-effect"
      );
    }

    addCountNode(discardEffectImageNode, discardEffectConfig.count);

    return discardEffectWrapperNode;
  }

  function addCardFront(parentNode, index) {
    var cardConfig = mechArenaCardData.getCardConfigFromGlobalCardIndex(index);
    var deckConfig = mechArenaCardData.getDeckConfigFromGlobalCardIndex(index);
    console.log("addCardFront", index, cardConfig, deckConfig);
    var cardIndex =
      mechArenaCardData.getCardIndexInDeckFromGlobalCardIndex(index);
    console.log("cardIndex", cardIndex);
    var deckIndex = mechArenaCardData.getDeckIndexFromGlobalCardIndex(index);
    console.log("deckIndex", deckIndex);
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
    addDiscardEffectNode(cardFrontNode, cardConfig.discardEffect);
    addExpendablesNode(cardFrontNode, cardConfig);

    var frontWrapperNode = htmlUtils.addDiv(
      cardFrontNode,
      ["front-wrapper"],
      "front-wrapper"
    );

    var titleNode = addTitleNode(frontWrapperNode, cardConfig);

    addMovementPropertyNode(frontWrapperNode, cardConfig);
    addAttackModsSection(
      frontWrapperNode,
      "outgoing-melee-attack-mods",
      "outgoing-melee-attack-mods",
      cardConfig.outgoingMeleeAttackMods
    );
    addAttackModsSection(
      frontWrapperNode,
      "outgoing-ranged-attack-mods",
      "outgoing-ranged-attack-mods",
      cardConfig.outgoingRangedAttackMods
    );
    addAttackModsSection(
      frontWrapperNode,
      "incoming-melee-attack-mods",
      "incoming-melee-attack-mods",
      cardConfig.incomingMeleeAttackMods
    );
    addAttackModsSection(
      frontWrapperNode,
      "incoming-ranged-attack-mods",
      "incoming-ranged-attack-mods",
      cardConfig.incomingRangedAttackMods
    );
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
