import * as React from "react";

import { useReactFlow } from "@xyflow/react";

import { RotateCcw } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { initialNodes } from "@/features/flow/constants";

export function ResetConfirmationAlert() {
  const { fitView, setNodes, updateNodeData } = useReactFlow();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          onClick={() => {
            setNodes(initialNodes);
            updateNodeData(initialNodes[0].id, {
              value: undefined,
            });
            setTimeout(fitView);
          }}
        >
          <span className="text-sm font-bold capitalize">
            <RotateCcw size={16} />
          </span>
        </Button>
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
          <AlertDialogAction>Reset</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
