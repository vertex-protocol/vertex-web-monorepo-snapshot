import { useTutorialFlowState } from './useTutorialFlowState';
import { useEVMContext } from '@vertex-protocol/react-client';

export function useShouldShowTutorialFlow() {
  const { connectionStatus } = useEVMContext();
  const { tutorialFlowState, didLoadPersistedValue } = useTutorialFlowState();

  return (
    didLoadPersistedValue &&
    connectionStatus.type === 'connected' &&
    !tutorialFlowState.isDismissed
  );
}
