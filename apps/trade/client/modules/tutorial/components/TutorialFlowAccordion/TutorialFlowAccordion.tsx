import * as Accordion from '@radix-ui/react-accordion';
import { UserTutorialFlowStepID } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { TutorialAccordionContent } from 'client/modules/tutorial/components/TutorialFlowAccordion/TutorialAccordionContent';
import { TutorialAccordionTrigger } from 'client/modules/tutorial/components/TutorialFlowAccordion/TutorialAccordionTrigger';
import { UserTutorialFlowStep } from 'client/modules/tutorial/hooks/useTutorialFlowSteps';

interface Props {
  steps: UserTutorialFlowStep[];
  performStep: (stepId: UserTutorialFlowStepID) => void;
  skipStep: (stepId: UserTutorialFlowStepID) => void;
  setActiveStepId: (stepId: UserTutorialFlowStepID) => void;
  activeStepId: UserTutorialFlowStepID | undefined;
  completedStepIds: UserTutorialFlowStepID[];
}

export function TutorialFlowAccordion({
  steps,
  performStep,
  skipStep,
  setActiveStepId,
  activeStepId,
  completedStepIds,
}: Props) {
  return (
    <div className="bg-background rounded-lg px-3 py-2">
      <Accordion.Root
        value={activeStepId}
        onValueChange={setActiveStepId}
        className="flex flex-col gap-y-1"
        type="single"
        collapsible
      >
        {/* Conscious decision to separate 'Connect wallet' step from TUTORIAL_FLOW_ACCORDION_ITEMS, assumed to be completed and hence not persisted to LS*/}
        <Accordion.Item value="" disabled>
          <TutorialAccordionTrigger
            open={false}
            triggerLabel="Connect wallet"
            isCompleted
          />
        </Accordion.Item>
        {steps.map((step) => {
          const isCompleted = completedStepIds.includes(step.id);
          return (
            <Accordion.Item
              key={step.id}
              value={step.id}
              disabled={isCompleted}
            >
              <TutorialAccordionTrigger
                open={activeStepId === step.id}
                triggerLabel={step.triggerLabel}
                isCompleted={isCompleted}
              />
              <TutorialAccordionContent
                description={step.description}
                actionLabel={step.actionLabel}
                onActionClick={() => performStep(step.id)}
                onSkipClick={() => skipStep(step.id)}
              />
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
