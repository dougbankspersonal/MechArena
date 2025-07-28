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
  const DiscardEffectType_GetExpendables = "get-expendables";
  const DiscardEffectType_BattleRetreat = "battle-retreat";

  const ExpendableType_Energy = "energy";
  const ExpendableType_Ammo = "ammo";

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

  const AttackMod_DieUp = "die-up";
  const AttackMod_DieDown = "die-down";
  const AttackMod_Reload = "reload";
  const AttackMod_EvadeMelee = "evade-melee";
  const AttackMod_DestroyLocation = "destroy-location";
  const AttackMod_Forbidden = "forbidden";

  const attackModTypes = {
    DieUp: AttackMod_DieUp,
    DieDown: AttackMod_DieDown,
    Reload: AttackMod_Reload,
    EvadeMelee: AttackMod_EvadeMelee,
    DestroyLocation: AttackMod_DestroyLocation,
    Forbidden: AttackMod_Forbidden,
  };

  const cardTypes = {
    Movement: CardType_Movement,
    Attack: CardType_Attack,
    System: CardType_System,
  };

  const discardEffectTypes = {
    Reposition: DiscardEffectType_Reposition,
    GetExpendables: DiscardEffectType_GetExpendables,
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

  const expendableTypes = {
    Energy: ExpendableType_Energy,
    Ammo: ExpendableType_Ammo,
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
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        outgoingRangedAttackMods: [{ type: attackModTypes.DieDown }],
        incomingMeleeAttackMods: [{ type: attackModTypes.DieUp }],
        incomingRangedAttackMods: [{ type: attackModTypes.DieUp }],
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
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        outgoingRangedAttackMods: [{ type: attackModTypes.DieDown }],
        incomingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
      },
      {
        title: "Pulse Laser",
        type: cardTypes.Attack,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
        bodyParts: [{ type: bodyPartTypes.Weapon }],
        expendabes: [{ type: expendableTypes.Energy, count: 1 }],
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
      },
      {
        title: "Rocket Pod",
        type: cardTypes.Attack,
        initiative: 2,
        bodyParts: [{ type: bodyPartTypes.Weapon }],
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
        bodyParts: [{ type: bodyPartTypes.Rotor, side: bodyPartSides.Right }],
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingRangedAttackMods: [{ type: attackModTypes.DieUp }],
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
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
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
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        outgoingRangedAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingRangedAttackMods: [{ type: attackModTypes.DieUp }],
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
          type: discardEffectTypes.GetExpendables,
          expendables: [{ type: expendableTypes.Ammo }],
        },
        bodyParts: [{ type: bodyPartTypes.Turret }],
        bodyPartNumber: 1,
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        outgoingRangedAttackMods: [{ type: attackModTypes.DieDown }],
      },

      {
        title: "Recharge",
        count: 2,
        type: cardTypes.System,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.GetExpendables,
          expendables: [{ type: expendableTypes.Ammo }],
        },
        bodyParts: [{ type: bodyPartTypes.Core }],
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        outgoingRangedAttackMods: [
          {
            type: attackModTypes.Reload,
            expendables: [{ type: expendableTypes.Energy, count: 2 }],
          },
        ],
      },
      {
        title: "Reload",
        type: cardTypes.System,
        initiative: 2,
        discardEffect: {
          type: discardEffectTypes.GetExpendables,
          expendables: [{ type: expendableTypes.Energy }],
        },
        bodyParts: [{ type: bodyPartTypes.Turret }],
        bodyPartNumber: 1,
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        outgoingRangedAttackMods: [
          {
            type: attackModTypes.Reload,
            expendables: [{ type: expendableTypes.Ammo }],
          },
        ],
      },
      {
        title: "Rapid Turn",
        type: cardTypes.Movement,
        initiative: 3,
        discardEffect: {
          type: discardEffectTypes.GetExpendables,
          expendables: [{ type: expendableTypes.Energy }],
        },
        bodyParts: [{ type: bodyPartTypes.Track, side: bodyPartSides.Right }],
        bodyPartNumber: 5,
        movements: [
          { type: movementTypes.Short },
          { type: movementTypes.Long },
        ],
        movementsJoinType: joinTypes.Or,
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        outgoingRangedAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingMeleeAttackMods: [{ type: attackModTypes.EvadeMelee }],
        incomingRangedAttackMods: [{ type: attackModTypes.DieUp }],
      },
      {
        title: "Reposition",
        count: 2,
        type: cardTypes.Movement,
        initiative: 5,
        discardEffect: {
          type: discardEffectTypes.GetExpendables,
          expendables: [{ type: expendableTypes.Energy }],
        },
        bodyParts: [{ type: bodyPartTypes.Track, side: bodyPartSides.Right }],
        movements: [
          { type: movementTypes.Short },
          { type: movementTypes.Long },
        ],
        movementsJoinType: joinTypes.Toggle,
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingMeleeAttackMods: [
          { type: attackModTypes.EvadeMelee, count: 5 },
        ],
      },
      {
        title: "Retreat to Long",
        type: cardTypes.Movement,
        initiative: 6,
        discardEffect: {
          type: discardEffectTypes.BattleRetreat,
        },
        bodyParts: [{ type: bodyPartTypes.Track, side: bodyPartSides.Left }],
        movements: [{ type: movementTypes.Long }],
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        outgoingRangedAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingMeleeAttackMods: [
          { type: attackModTypes.EvadeMelee, count: 5 },
        ],
        incomingRangedAttackMods: [{ type: attackModTypes.DieUp }],
      },
      {
        title: "Fire Railgun",
        count: 2,
        type: cardTypes.Attack,
        initiative: 8,
        discardEffect: {
          type: discardEffectTypes.Reposition,
        },
        bodyParts: [{ type: bodyPartTypes.Turret }],
        bodyPartNumber: 1,
        expendabes: [
          { type: expendableTypes.Energy, count: 2 },
          { type: expendableTypes.Ammo, count: 1 },
        ],
        outgoingMeleeAttackMods: [{ type: attackModTypes.Forbidden }],
        incomingMeleeAttackMods: [{ type: attackModTypes.DestroyLocation }],
      },
    ],
  };

  const deckConfigs = [attackDroneDeckConfig, railgunTankDeckConfig];

  //-----------------------------------
  //
  // Functions
  //
  //-----------------------------------
  function getDeckConfigFromGlobalCardIndex(globalCardIndex) {
    for (var i = 0; i < deckConfigs.length; i++) {
      var deckConfig = deckConfigs[i];
      for (var j = 0; j < deckConfig.cardConfigs.length; j++) {
        var cardConfigCount = deckConfig.cardConfigs[j].count || 1;
        if (globalCardIndex < cardConfigCount) {
          return deckConfig;
        }
        globalCardIndex -= cardConfigCount;
      }
    }
    return null;
  }

  function getCardConfigFromGlobalCardIndex(globalCardIndex) {
    for (var i = 0; i < deckConfigs.length; i++) {
      var deckConfig = deckConfigs[i];
      for (var j = 0; j < deckConfig.cardConfigs.length; j++) {
        var cardConfigCount = deckConfig.cardConfigs[j].count || 1;
        if (globalCardIndex < cardConfigCount) {
          return deckConfig.cardConfigs[j];
        }
        globalCardIndex -= cardConfigCount;
      }
    }
    return null;
  }

  function getNumCards() {
    var numCards = 0;
    for (var i = 0; i < deckConfigs.length; i++) {
      for (var j = 0; j < deckConfigs[i].cardConfigs.length; j++) {
        var cardConfigCount = deckConfigs[i].cardConfigs[j].count || 1;
        numCards += cardConfigCount;
      }
    }
    return numCards;
  }

  function getCardIndexInDeckFromGlobalCardIndex(globalCardIndex) {
    var indexThisDeck = globalCardIndex;
    for (var i = 0; i < deckConfigs.length; i++) {
      var cardsInDeck = 0;
      for (var j = 0; j < deckConfigs[i].cardConfigs.length; j++) {
        var cardConfigCount = deckConfigs[i].cardConfigs[j].count || 1;
        cardsInDeck += cardConfigCount;
      }

      if (indexThisDeck < cardsInDeck) {
        return indexThisDeck;
      }
      indexThisDeck -= cardsInDeck;
    }
    return null;
  }

  function getDeckIndexFromGlobalCardIndex(globalCardIndex) {
    var indexThisDeck = globalCardIndex;
    for (var i = 0; i < deckConfigs.length; i++) {
      var cardsInDeck = 0;
      for (var j = 0; j < deckConfigs[i].cardConfigs.length; j++) {
        var cardConfigCount = deckConfigs[i].cardConfigs[j].count || 1;
        cardsInDeck += cardConfigCount;
      }

      if (indexThisDeck < cardsInDeck) {
        return i;
      }
      indexThisDeck -= cardsInDeck;
    }
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
    expendableTypes: expendableTypes,
    attackModTypes: attackModTypes,

    getDeckConfigFromGlobalCardIndex: getDeckConfigFromGlobalCardIndex,
    getCardConfigFromGlobalCardIndex: getCardConfigFromGlobalCardIndex,
    getCardIndexInDeckFromGlobalCardIndex:
      getCardIndexInDeckFromGlobalCardIndex,
    getDeckIndexFromGlobalCardIndex: getDeckIndexFromGlobalCardIndex,
    getNumCards: getNumCards,
  };
});
