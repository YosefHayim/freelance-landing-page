import { useEffect, useState } from 'react';
import { listenForFirstInteraction } from '../pageLoad/listenForFirstInteraction';
import { firstWorkType, nextWorkType, type WorkTypeName } from './workTypes';

const rotationDelay = 2800;

export const useWorkTypeRotation = (canRotate: boolean) => {
  const [activeWorkType, setActiveWorkType] = useState<WorkTypeName>(firstWorkType);
  const [hasVisitorInteracted, setHasVisitorInteracted] = useState(false);
  const [hasVisitorChosen, setHasVisitorChosen] = useState(false);
  const isRotating = canRotate && hasVisitorInteracted && !hasVisitorChosen;

  useEffect(() => listenForFirstInteraction(() => setHasVisitorInteracted(true)), []);

  useEffect(() => {
    if (!isRotating) return;
    const intervalId = setInterval(() => setActiveWorkType(nextWorkType), rotationDelay);
    return () => clearInterval(intervalId);
  }, [isRotating]);

  const chooseWorkType = (workType: WorkTypeName) => {
    setHasVisitorChosen(true);
    setActiveWorkType(workType);
  };

  return { activeWorkType, chooseWorkType };
};
