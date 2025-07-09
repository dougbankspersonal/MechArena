/* Deprecated */

define(["sharedJavascript/debugLog", "dojo/domReady!"], function (debugLog) {
  //-----------------------------------
  //
  // Constants
  //
  //-----------------------------------

  var nextDeckId = 0;

  const sampleDeckConfigTeam1 = {
    deckId: nextDeckId++,
    deckName: "Saber",
    artConfig: {
      backImage: "mech1",
    },

    cardConfigs: [
      {
        title: "Move",
      },
      {
        title: "Maneuver",
      },
    ],
  };

  const sampleDeckConfigTeam2 = {
    deckId: nextDeckId++,
    deckName: "Claw",
    artConfig: {
      backImage: "mech2",
    },

    cardConfigs: [
      {
        title: "Move",
      },
      {
        title: "Maneuver",
      },
      {
        title: "Stun",
      },
    ],
  };

  const deckConfigs = [sampleDeckConfigTeam1, sampleDeckConfigTeam2];

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

    getDeckConfigFromGlobalCardIndex: getDeckConfigFromGlobalCardIndex,
    getCardConfigFromGlobalCardIndex: getCardConfigFromGlobalCardIndex,
    getCardIndexInDeckFromGlobalCardIndex:
      getCardIndexInDeckFromGlobalCardIndex,
    getDeckIndexFromGlobalCardIndex: getDeckIndexFromGlobalCardIndex,

    getNumCards: getNumCards,
  };
});
