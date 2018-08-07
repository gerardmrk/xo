/**
 * models for the global message state
 */

import { SemanticCOLORS } from "semantic-ui-react";
import { DeepReadonlyObject } from "utility-types";
import { MessagePresets } from "@client/views/connected/GlobalMessageOverlay/preset-options";

export type GlobalMessage =
  | DeepReadonlyObject<{
      header: string;
      color: SemanticCOLORS;
      content: string | undefined;
      list: string[] | undefined;
    }>
  | keyof MessagePresets
  | undefined;
