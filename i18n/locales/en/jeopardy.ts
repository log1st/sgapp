const form = {
  action: {
    removeRound: {
      hint: "Are you sure want\n to remove this round?",
      action: "Remove",
    },
    removeQuestion: {
      hint: "Are you sure want\n to remove this question?",
      action: "Remove",
    },
  },
  field: {
    name: {
      label: "Name",
      validation: {
        too_small:
          "Min length is {minimum, plural, =1{one symbol} other{# symbols}}",
      },
    },
    private: {
      label: "Private",
      hint: "If true, pack will be visible only for you - even on list page",
    },
    difficulty: {
      label: "Difficulty",
      validation: {
        invalid_type: "Required",
      },
    },
    rounds: {
      type: {
        label: "Type",
        types: {
          normal: "Normal",
          final: "Final",
        },
      },
      name: {
        label: "Topic",
        validation: {
          too_small:
            "Min length is {minimum, plural, =1{one symbol} other{# symbols}}",
        },
      },
      questions: {
        type: {
          label: "Type",
          types: {
            normal: "Normal",
            stake: "Stake",
            secret: "Secret",
            commonSecret: "Common secret",
            noRisk: "No risk",
          },
        },
        cost: {
          label: "Cost",
        },
        hint: {
          label: "Hint",
        },
        text: {
          label: "Question text",
          validation: {
            required: "Text question or at least one media required",
          },
        },
        selfSecret: {
          label: "Self secret",
          placeholder: "Allow",
        },
        secretTopic: {
          label: "Secret topic",
          validation: {
            required: "Required",
          },
        },
        secretCost: {
          label: "Secret cost",
        },
        commonSecretCostReveal: {
          label: "Reveal cost",
          options: {
            after: "After",
            before: "Before",
            never: "Never",
          },
        },
        secretCostType: {
          label: "Cost type",
          options: {
            minMax: "Round min/max",
            customMinMax: "Custom min/max",
            fixed: "Fixed",
          },
        },
        secretMinMaxCost: {
          min: {
            label: "Min",
          },
          max: {
            label: "Max",
          },
          step: {
            label: "Step",
          },
        },
        answers: {
          label: "Answers",
          placeholder: "Enter answer and press Enter to add more",
          validation: {
            too_small:
              "At least {minimum, plural, =1{one answer} other{# answers}} required",
          },
        },
        medias: {
          from: {
            label: "From",
            validation: {
              too_small: "Too small",
            },
          },
          to: {
            label: "To",
            validation: {
              too_small: "Too small",
            },
          },
        },
        validation: {
          too_small:
            "At least {minimum, plural, =1{one question} other{# questions}} required",
        },
      },
      validation: {
        too_small:
          "At least {minimum, plural, =1{one round} other{# rounds}} required",
      },
    },
  },
  round: "Round #{number}",
  noRounds: "No rounds yet. Click {kbd} button above",
  addQuestion: "Add question",
  addMedia: {
    label: "Drop media files here",
    hint: "or click to browse",
  },
  error: {
    validation: "",
  },
};

export default {
  infoCard: {
    noShowman: "No showman yet",
    showman: "Showman: {login}",
    players: "{count, plural, =1{One player} other{# players}}",
    points: "{points, plural, =1{# point} other{# points}}",
  },
  packs: {
    create: {
      ...form,
      title: "Create Jeopardy pack",
      submit: "Create",
    },
    field: {
      name: "Name",
      creator: "Created by",
      info: "Pack info",
      difficulty: "Difficulty",
      createdAt: "Created at",
    },
    private: {
      true: "Private",
    },
    roundsCount: "{count, plural, =1{One round} other{# rounds}}",
    playsCount:
      "{count, plural, =0{No plays yet} =1{One time played} other{# times played}}",
    form,
  },
  query: "Search...",
  search: "Search",
  creator: "All creators",
  page: {
    title: "Jeopardy pack: {name}",
  },
};
