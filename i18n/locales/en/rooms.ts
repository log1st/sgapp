export default {
  field: {
    type: "Game type",
    creator: "Created by",
    status: "Status",
    title: "Title",
    password: "With password",
    info: "Game info",
  },
  type: {
    jeopardy: "Jeopardy",
    sixMinds: "Six Minds",
  },
  status: {
    new: "New",
    inProgress: "In Progress",
    finished: "Finished",
  },
  password: {
    true: "With password",
    false: "Without password",
  },
  private: {
    true: "Private",
    false: "Public",
  },
  startedAt: "Started {date}",
  finishedAt: "Finished {date}",
  pack: "Question pack",
  query: "Search...",
  search: "Search",
  create: {
    title: "Create room",
    hint: "The game won't start immediately, feel free to edit settings before start on next step",
    submit: "Create game",
  },
  room: {
    title: `{type}: <title>{title}</title>`,
  },
  form: {
    field: {
      type: {
        label: "Game type",
        validation: {
          invalid_type: "Type is required",
        },
      },
      title: {
        label: "Title",
        validation: {
          too_small:
            "Min length is {minimum, plural, =1{one symbol} other{# symbols}}",
        },
      },
      password: {
        label: "Password",
        hint: "Optional",
      },
      slug: {
        label: "Slug",
        hint: "Used in URL",
        validation: {
          unique: "Slug already taken",
        },
      },
      private: {
        label: "Private",
        hint: "If checked, user can see and/or connect only via invitation link or code",
      },
      config: {
        title: "Jeopardy Config",
        answerType: {
          label: "Answer type",
          hint: "If voice selected, text prompt wouldn't be shown and players must use voice chat to answer",
          value: {
            voice: "Voice",
            text: "Text",
          },
          validation: {
            invalid_type: "Type is required",
          },
        },
        maxPlayers: {
          label: "Max players",
          validation: {
            invalid_type: "Required",
            too_big:
              "Max is {maximum, plural, =1{one player} other{# players}}",
          },
        },
        partialText: {
          label: "Partial text",
          hint: "If answer type is text, question would appear letter-by-letter.",
        },
        falseStarts: {
          label: "False starts",
          hint: "Prevent players to press answer button for some time.",
        },
        previewAnswers: {
          label: "Preview answers",
          hint: "If true, showman will be able to see answers right after question start appearing.",
        },
        readingSpeed: {
          label: "Reading speed",
          hint: "How fast text must appear. Used if answer type is text.",
          validation: {
            invalid_type: "Required",
          },
        },
        stepByStep: {
          label: "Step by step",
          hint: "If true, game won't proceed any step until showman or owner press continue button.",
        },
        appellations: {
          label: "Appellations",
          hint: "Allow players to appellate answer",
        },
        noPenalty: {
          label: "No penalty",
          hint: "Don't reduce points for wrong answers",
        },
        awaitSync: {
          label: "Wait for sync",
          hint: "Make sure all players ready to answer",
        },
        preloadMedia: {
          label: "Preload media",
          hint: "Players will receive all media when join",
        },
        choosingQuestionTime: {
          label: "Choose question time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        thinkingOnQuestionTime: {
          label: "Think on question time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        answerTime: {
          label: "Time to answer",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        givingSecretQuestionTime: {
          label: "Give secret question time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        makingStakeTime: {
          label: "Make stake time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        thinkingOnStakeQuestionTime: {
          label: "Think on stake question time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        printingAnswerTime: {
          label: "Show right answer time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        roundTime: {
          label: "Round time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        choosingFinalCategoryTime: {
          label: "Choose final category time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        thinkingOnFinalQuestionTime: {
          label: "Think on final question time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        answerValidationTime: {
          label: "Answer validation time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        mediaPauseTime: {
          label: "Media pause time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        falseStartTime: {
          label: "False start time",
          hint: "",
          validation: {
            invalid_type: "Required",
          },
        },
        packId: {
          label: "Question pack",
          query: "Search question pack",
          validation: {
            invalid_type: "Required",
            exists: "Pack not found",
          },
        },
      },
    },
    error: {
      validation: "",
    },
  },
};
