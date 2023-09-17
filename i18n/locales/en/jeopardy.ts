const form = {
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
  },
  round: "Round #{number}",
  noRounds: "No rounds yet. Click {kbd} button above",
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
    round: {
      remove: "Remove round",
      field: {
        name: {
          label: "Name",
        },
        type: {
          label: "Type",
          types: {
            normal: "Normal",
            final: "Final",
          },
        },
      },
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
};
