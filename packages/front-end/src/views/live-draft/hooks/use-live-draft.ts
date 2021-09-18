import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { DraftSelection } from "../../../api";
import { LiveDraftSelectionMessage } from "../types/live-draft-selection-message";

type LiveDraftHookParams = {
  draftId: number;
  liveSessionToken: string;
};

type LiveDraftHookReturnValue = {
  currentDraftSelections: DraftSelection[];
  finalizeDraftSelection: (request: LiveDraftSelectionMessage) => void;
};

export const useLiveDraft = ({
  draftId,
  liveSessionToken,
}: LiveDraftHookParams): LiveDraftHookReturnValue => {
  const [currentDraftSelections, setCurrentDraftSelections] = useState<
    DraftSelection[]
  >([]);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { lastJsonMessage, sendMessage } = useWebSocket(
    `${process.env.REACT_APP_BACK_END_API_WS_URL as string}/drafts/${Number(
      draftId
    )}/live-selections?ticket=${liveSessionToken}`
  );

  const finalizeDraftSelection = (request: LiveDraftSelectionMessage): void => {
    sendMessage(JSON.stringify(request));
  };

  useEffect(() => {
    setCurrentDraftSelections(lastJsonMessage as DraftSelection[]);
  }, [lastJsonMessage]);

  return {
    currentDraftSelections,
    finalizeDraftSelection,
  };
};
