import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";
import { Todo } from "../services/todo-storage";

type Actions = "manage" | "create" | "read" | "update" | "delete";
type Subjects = "Todo" | Todo | "all";

export type TypeAppAbility = Ability<[Actions, Subjects]>;
export const AppAbility = Ability as AbilityClass<TypeAppAbility>;

export default function defineRulesFor(role: string) {
  const { can, rules } = new AbilityBuilder(AppAbility);

  console.log(role);

  if (role === "admin") {
    can("manage", "all");
  } else {
    can(["read", "create"], "Todo");
    can(["update", "delete"], "Todo", { assignee: "me" });
  }

  return rules;
}

export function buildAbilityFor(role: string): TypeAppAbility {
  return new AppAbility(defineRulesFor(role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object) => object!.type,
  });
}
