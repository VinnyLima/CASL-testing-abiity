import { createContext } from "react";
import { createContextualCan } from "@casl/react";
import { TypeAppAbility } from "../config/ability";

export const AbilityContext = createContext<TypeAppAbility>(undefined!);

export default createContextualCan(AbilityContext.Consumer);
