/**
 * models for the global message state
 */

import { SemanticCOLORS } from "semantic-ui-react";

export interface GlobalMessage {
  message?: string;
  color?: SemanticCOLORS;
  autoDismiss: boolean;
}
