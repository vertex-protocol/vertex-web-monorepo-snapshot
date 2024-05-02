import * as Accordion from '@radix-ui/react-accordion';
import { UserTutorialFlowStepID } from 'client/modules/localstorage/userState/types/userTutorialFlowTypes';
import { TutorialAccordionContent } from 'client/modules/tutorial/components/TutorialFlowAccordion/TutorialAccordionContent';
import { TutorialAccordionTrigger } from 'client/modules/tutorial/components/TutorialFlowAccordion/TutorialAccordionTrigger';
import { TUTORIAL_FLOW_ACCORDION_ITEMS } from './tutorialFlowAccordionItems';

interface Props {
  performStep: (step: UserTutorialFlowStepID) => void;
  skipStep: (step: UserTutorialFlowStepID) => void;
  setActiveStep: (step: UserTutorialFlowStepID) => void;
  activeStep: UserTutorialFlowStepID | undefined;
  completedSteps: UserTutorialFlowStepID[];
}

export function TutorialFlowAccordion({
  performStep,
  skipStep,
  setActiveStep,
  activeStep,
  completedSteps,
}: Props) {
  return (
    <div className="bg-background rounded-lg px-3 py-2">
      <Accordion.Root
        value={activeStep}
        onValueChange={setActiveStep}
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
        {TUTORIAL_FLOW_ACCORDION_ITEMS.map((item) => {
          const isCompleted = completedSteps.includes(item.stepId);
          return (
            <Accordion.Item
              key={item.stepId}
              value={item.stepId}
              disabled={isCompleted}
            >
              <TutorialAccordionTrigger
                open={activeStep === item.stepId}
                triggerLabel={item.triggerLabel}
                isCompleted={isCompleted}
              />
              <TutorialAccordionContent
                description={item.description}
                actionLabel={item.actionLabel}
                onActionClick={() => performStep(item.stepId)}
                onSkipClick={() => skipStep(item.stepId)}
              />
            </Accordion.Item>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
