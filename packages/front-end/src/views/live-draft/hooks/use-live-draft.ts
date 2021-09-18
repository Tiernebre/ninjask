import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { DraftSelection } from "../../../api";
import { LiveDraftSelectionMessage } from "../types/live-draft-selection-message";

type LiveDraftHookReturnValue = {
  currentDraftSelections: DraftSelection[];
};

export const useLiveDraft = (draftId: number): LiveDraftHookReturnValue => {
  const [currentDraftSelections, setCurrentDraftSelections] = useState<
    DraftSelection[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { lastMessage, readyState, sendMessage } = useWebSocket(
    `${process.env.REACT_APP_BACK_END_API_WS_URL as string}/drafts/${Number(
      draftId
    )}/live-selections`
  );

  const finalizeDraftSelection = (request: LiveDraftSelectionMessage): void => {
    sendMessage(JSON.stringify(request));
  };

  useEffect(() => {
    setCurrentDraftSelections(lastMessage as DraftSelection[]);
  }, [lastMessage]);

  return {
    currentDraftSelections,
  };
};
