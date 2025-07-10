/* Deprecated */

define(["sharedJavascript/debugLog", "dojo/domReady!"], function (debugLog) {
  //-----------------------------------
  //
  // Constants
  //
  //-----------------------------------

  const CardType_Movement = "movement";
  const CardType_Attack = "attack";
  const CardType_System = "system";

  var cardTypes = {
    Movement: CardType_Movement,
    Attack: CardType_Attack,
    System: CardType_System,
  };

  var DiscardEffectType_Reposition = "reposition";
  var DiscardEffectType_Ammo = "ammo";
  var DiscardEffectType_Energy = "energy";
  var DiscardEffectType_BattleRetreat = "battle-retreat";

  var discardEffectTypes = {
    Reposition: DiscardEffectType_Reposition,
    Ammo: DiscardEffectType_Ammo,
    Energy: DiscardEffectType_Energy,
    BattleRetreat: DiscardEffectType_BattleRetreat,
  };

  var nextDeckId = 0;
  const attackDroneDeckConfig = {
    deckId: nextDeckId++,
    deckName: "Attack Drone",
    artConfig: {
      mechImage: "attack-drone",
    },

    cardConfigs: [
      {
        title: "Dive Attack",
        type: cardTypes.Movement,
        initiative: 1,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
      },
      {
        title: "Target Lock",
        type: cardTypes.System,
        initiative: 1,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
      },
      {
        title: "Pulse Laser",
        type: cardTypes.Attack,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
      },
      {
        title: "Rocket Pod",
        type: cardTypes.Attack,
        initiative: 2,
      },
      {
        title: "Flanking Turn",
        type: cardTypes.Movement,
        initiative: 3,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
      },
      {
        title: "Reposition",
        type: cardTypes.Movement,
        initiative: 4,
      },
      {
        title: "Disengage",
        type: cardTypes.Movement,
        initiative: 4,
      },
    ],
  };

  const railgunTankDeckConfig = {
    deckId: nextDeckId++,
    deckName: "Railgun Tank",
    artConfig: {
      mechImage: "railgun-tank",
    },

    cardConfigs: [
      {
        title: "Target Lock",
        type: cardTypes.System,
        initiative: 1,
        discardEffect: {
          type: discardEffectTypes.Ammo,
          count: 1,
        },
      },
      {
        title: "Recharge",
        count: 2,
        type: cardTypes.System,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.Energy,
          count: 2,
        },
      },
      {
        title: "Reload",
        type: cardTypes.System,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.Energy,
          count: 1,
        },
      },
      {
        title: "Rapid Turn",
        type: cardTypes.Movement,
        initiative: 3,
        discardEffect: {
          type: discardEffectTypes.Energy,
          count: 1,
        },
      },
      {
        title: "Reposition",
        count: 2,
        type: cardTypes.Movement,
        initiative: 5,
        discardEffect: {
          type: discardEffectTypes.Energy,
          count: 1,
        },
      },
      {
        title: "Retreat to Long",
        type: cardTypes.Movement,
        initiative: 6,
        discardEffect: {
          type: discardEffectTypes.BattleRetreat,
          count: 1,
        },
      },
      {
        title: "Fire Railgun",
        count: 2,
        type: cardTypes.Attack,
        initiative: 8,
        discardEffect: {
          type: discardEffectTypes.Reposition,
          count: 1,
        },
      },
    ],
  };

  const deckConfigs = [attackDroneDeckConfig, railgunTankDeckConfig];

  //-----------------------------------
  //
  // Functions
  //
  //-----------------------------------
  function getDeckConfigFromGlobalCardIndex(index) {
    debugLog.debugLog(
      "Cards",
      "getDeckConfigFromGlobalCardIndex: index = " + index
    );
    debugLog.debugLog(
      "Cards",
      "getDeckConfigFromGlobalCardIndex: deckConfigs.length = " +
        deckConfigs.length
    );
    for (var i = 0; i < deckConfigs.length; i++) {
      var deckConfig = deckConfigs[i];
      if (index < deckConfig.cardConfigs.length) {
        return deckConfig;
      }
      index -= deckConfig.cardConfigs.length;
    }
    return null;
  }

  function getCardConfigFromGlobalCardIndex(index) {
    for (var i = 0; i < deckConfigs.length; i++) {
      var deckConfig = deckConfigs[i];
      if (index < deckConfig.cardConfigs.length) {
        return deckConfig.cardConfigs[index];
      }
      index -= deckConfig.cardConfigs.length;
    }
    return null;
  }

  var _numCards = 0;
  function getNumCards() {
    if (_numCards == 0) {
      var numCards = 0;
      for (var i = 0; i < deckConfigs.length; i++) {
        numCards += deckConfigs[i].cardConfigs.length;
      }
      _numCards = numCards;
    }
    debugLog.debugLog("Cards", "getNumCards: _numCards = " + _numCards);
    return _numCards;
  }

  function getCardIndexInDeckFromGlobalCardIndex(index) {
    for (var i = 0; i < deckConfigs.length; i++) {
      var deckConfig = deckConfigs[i];
      if (index < deckConfig.cardConfigs.length) {
        debugLog.debugLog(
          "Cards",
          "getCardIndexInDeckFromGlobalCardIndex: returning = " + index
        );
        return index;
      }
      index -= deckConfig.cardConfigs.length;
    }
    debugLog.debugLog(
      "Cards",
      "getCardIndexInDeckFromGlobalCardIndex: returning null"
    );
    return null;
  }

  function getDeckIndexFromGlobalCardIndex(index) {
    for (var i = 0; i < deckConfigs.length; i++) {
      var deckConfig = deckConfigs[i];
      if (index < deckConfig.cardConfigs.length) {
        debugLog.debugLog(
          "Cards",
          "getCardIndexInDeckFromGlobalCardIndex: returning = " + i
        );
        return i;
      }
      index -= deckConfig.cardConfigs.length;
    }
    debugLog.debugLog(
      "Cards",
      "getDeckIndexFromGlobalCardIndex: returning null"
    );
    return null;
  }

  // This returned object becomes the defined value of this module
  return {
    deckConfigs: deckConfigs,
    cardTypes: cardTypes,
    discardEffectTypes: discardEffectTypes,

    getDeckConfigFromGlobalCardIndex: getDeckConfigFromGlobalCardIndex,
    getCardConfigFromGlobalCardIndex: getCardConfigFromGlobalCardIndex,
    getCardIndexInDeckFromGlobalCardIndex:
      getCardIndexInDeckFromGlobalCardIndex,
    getDeckIndexFromGlobalCardIndex: getDeckIndexFromGlobalCardIndex,
    getNumCards: getNumCards,
  };
});
