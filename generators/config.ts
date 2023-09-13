import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("component", {
    description: "Adds a new component",
    prompts: [
      {
        type: "list",
        choices: ["component", "layout", "util"],
        message: "Type?",
        name: "type",
      },
      {
        type: "input",
        name: "name",
        message: "Name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "app/ui/{{kebabCase type}}s/{{kebabCase name}}/ui/ui.{{kebabCase name}}.module.scss",
        templateFile: "templates/component/ui/ui.component.module.scss.hbs",
        force: true,
      },
      {
        type: "add",
        path: "app/ui/{{kebabCase type}}s/{{kebabCase name}}/ui/ui.{{kebabCase name}}.tsx",
        templateFile: "templates/component/ui/ui.component.tsx.hbs",
        force: true,
      },
      {
        type: "add",
        path: "app/ui/{{kebabCase type}}s/{{kebabCase name}}/types/ui.{{kebabCase name}}.props.ts",
        templateFile: "templates/component/types/ui.component.props.ts.hbs",
        force: true,
      },
      {
        type: "add",
        path: "app/ui/{{kebabCase type}}s/{{kebabCase name}}/tests/ui.{{kebabCase name}}.stories.tsx",
        templateFile: "templates/component/tests/ui.component.stories.tsx.hbs",
        force: true,
      },
      {
        type: "add",
        path: "app/ui/{{kebabCase type}}s/{{kebabCase name}}/index.ts",
        templateFile: "templates/component/index.ts.hbs",
        force: true,
      },
    ],
  });
}
