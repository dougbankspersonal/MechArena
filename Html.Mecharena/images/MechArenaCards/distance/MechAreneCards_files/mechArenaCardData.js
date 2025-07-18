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

  const DiscardEffectType_Reposition = "reposition";
  const DiscardEffectType_Ammo = "ammo";
  const DiscardEffectType_Energy = "energy";
  const DiscardEffectType_BattleRetreat = "battle-retreat";

  const BodyPartType_Rotor = "rotor";
  const BodyPartType_Head = "head";
  const BodyPartType_Weapon = "weapon";
  const BodyPartType_Turret = "turret";
  const BodyPartType_Core = "core";
  const BodyPartType_Track = "track";

  const BodyPartSide_Left = "left";
  const BodyPartSide_Right = "right";

  const JoinType_And = "and";
  const JoinType_Or = "or";
  const JoinType_Toggle = "toggle";

  const MovementType_Melee = "melee";
  const MovementType_Short = "short";
  const MovementType_Long = "long";
  const MovementType_Side = "side";
  const MovementType_BattleRetreat = "battle-retreat";

  const cardTypes = {
    Movement: CardType_Movement,
    Attack: CardType_Attack,
    System: CardType_System,
  };

  const discardEffectTypes = {
    Reposition: DiscardEffectType_Reposition,
    Ammo: DiscardEffectType_Ammo,
    Energy: DiscardEffectType_Energy,
    BattleRetreat: DiscardEffectType_BattleRetreat,
  };

  const bodyPartTypes = {
    Rotor: BodyPartType_Rotor,
    Head: BodyPartType_Head,
    Weapon: BodyPartType_Weapon,
    Turret: BodyPartType_Turret,
    Core: BodyPartType_Core,
    Track: BodyPartType_Track,
  };

  const bodyPartSides = {
    Left: BodyPartSide_Left,
    Right: BodyPartSide_Right,
  };

  const joinTypes = {
    And: JoinType_And,
    Or: JoinType_Or,
    Toggle: JoinType_Toggle,
  };

  const movementTypes = {
    Melee: MovementType_Melee,
    Short: MovementType_Short,
    Long: MovementType_Long,
    Side: MovementType_Side,
    BattleRetreat: MovementType_BattleRetreat,
  };

  var nextDeckId = 0;
  const attackDroneDeckConfig = {
    deckId: nextDeckId++,
    deckName: "Attack Drone",
    artConfig: {
      mechImage: "attack-drone",
    },
    color: "#fff2cc",

    cardConfigs: [
      {
        title: "Dive Attack",
        type: cardTypes.Movement,
        initiative: 1,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
        bodyParts: [
          { type: bodyPartTypes.Rotor, side: bodyPartSides.Left },
          { type: bodyPartTypes.Rotor, side: bodyPartSides.Right },
        ],
        bodyPartsJoinType: JoinType_And,
        movements: [
          { type: movementTypes.Melee },
          { type: movementTypes.Short },
        ],
        movementsJoinType: joinTypes.Or,
      },
      {
        title: "Target Lock",
        type: cardTypes.System,
        initiative: 1,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
        bodyParts: [{ type: bodyPartTypes.Head }],
      },
      {
        title: "Pulse Laser",
        type: cardTypes.Attack,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
        bodyParts: [{ type: bodyPartTypes.Weapon }],
      },
      {
        title: "Rocket Pod",
        type: cardTypes.Attack,
        initiative: 2,
        bodyParts: [{ type: bodyPartTypes.Weapon }],
      },
      {
        title: "Flanking Turn",
        type: cardTypes.Movement,
        initiative: 3,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
        bodyParts: [{ type: bodyPartTypes.Rotor, side: bodyPartSides.Right }],
      },
      {
        title: "Reposition",
        type: cardTypes.Movement,
        initiative: 4,
        bodyParts: [
          { type: bodyPartTypes.Rotor, side: bodyPartSides.Left },
          { type: bodyPartTypes.Rotor, side: bodyPartSides.Right },
        ],
        bodyPartsJoinType: JoinType_Or,
        movements: [
          { type: movementTypes.Short },
          { type: movementTypes.Long },
        ],
        movementsJoinType: joinTypes.Toggle,
      },
      {
        title: "Disengage",
        type: cardTypes.Movement,
        initiative: 4,
        bodyParts: [{ type: bodyPartTypes.Rotor, side: bodyPartSides.Left }],
        movements: [
          { type: movementTypes.Long },
          { type: movementTypes.BattleRetreat },
        ],
        movementsJoinType: joinTypes.Or,
      },
    ],
  };

  const railgunTankDeckConfig = {
    deckId: nextDeckId++,
    deckName: "Railgun Tank",
    artConfig: {
      mechImage: "railgun-tank",
    },
    color: "#b6d7a8",

    cardConfigs: [
      {
        title: "Target Lock",
        type: cardTypes.System,
        initiative: 1,
        discardEffect: {
          type: discardEffectTypes.Ammo,
          count: 1,
        },
        bodyParts: [{ type: bodyPartTypes.Turret }],
        bodyPartNumber: 1,
      },
      {
        title: "Recharge",
        count: 2,
        type: cardTypes.System,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.Ammo,
          count: 1,
        },
        bodyParts: [{ type: bodyPartTypes.Core }],
      },
      {
        title: "Reload",
        type: cardTypes.System,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.Energy,
          count: 1,
        },
        bodyParts: [{ type: bodyPartTypes.Turret }],
        bodyPartNumber: 1,
      },
      {
        title: "Rapid Turn",
        type: cardTypes.Movement,
        initiative: 3,
        discardEffect: {
          type: discardEffectTypes.Energy,
          count: 1,
        },
        bodyParts: [{ type: bodyPartTypes.Track, side: bodyPartSides.Right }],
        bodyPartNumber: 5,
        movements: [
          { type: movementTypes.Short },
          { type: movementTypes.Long },
        ],
        movementsJoinType: joinTypes.Or,
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
        bodyParts: [{ type: bodyPartTypes.Track, side: bodyPartSides.Right }],
        movements: [
          { type: movementTypes.Short },
          { type: movementTypes.Long },
        ],
        movementsJoinType: joinTypes.Toggle,
      },
      {
        title: "Retreat to Long",
        type: cardTypes.Movement,
        initiative: 6,
        discardEffect: {
          type: discardEffectTypes.BattleRetreat,
          count: 1,
        },
        bodyParts: [{ type: bodyPartTypes.Track, side: bodyPartSides.Left }],
        movements: [{ type: movementTypes.Long }],
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
        bodyParts: [{ type: bodyPartTypes.Turret }],
        bodyPartNumber: 1,
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
    bodyPartTypes: bodyPartTypes,
    bodyPartSides: bodyPartSides,
    joinTypes: joinTypes,

    getDeckConfigFromGlobalCardIndex: getDeckConfigFromGlobalCardIndex,
    getCardConfigFromGlobalCardIndex: getCardConfigFromGlobalCardIndex,
    getCardIndexInDeckFromGlobalCardIndex:
      getCardIndexInDeckFromGlobalCardIndex,
    getDeckIndexFromGlobalCardIndex: getDeckIndexFromGlobalCardIndex,
    getNumCards: getNumCards,
  };
});
