import * as React from "react";

import { ReloadIcon } from "@radix-ui/react-icons";
import { ControlButton, useReactFlow } from "@xyflow/react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { initialNodes } from "@/features/flow/constants";

export function ResetButton() {
  const { fitView, setNodes, updateNodeData } = useReactFlow();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ControlButton title="Reset">
          <ReloadIcon />
        </ControlButton>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will reset your flow to the
            initial state.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setNodes(initialNodes);
              updateNodeData(initialNodes[0].id, {
                value: undefined,
              });
              setTimeout(fitView);
            }}
          >
            Reset
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
