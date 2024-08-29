import { Handle, Position } from "@xyflow/react";
import { Cylinder, Grid2X2, LucideIcon, RectangleEllipsis } from "lucide-react";

interface EditorNodeProps {
  label: string;
  title: string;
  icon: LucideIcon;
  children?: React.ReactNode;
  leftHandle?: boolean;
  rightHandle?: boolean;
}

function EditorNode({
  label,
  title,
  icon: Icon,
  children,
  leftHandle = true,
  rightHandle: rightHandle = true,
}: EditorNodeProps) {
  return (
    <div className="min-w-40 rounded-lg border bg-background">
      <div className="relative flex items-center justify-between p-2">
        {leftHandle ? (
          <Handle
            type="target"
            id="node-source"
            position={Position.Left}
            className="!-left-[2px] !h-4 !w-1 !min-w-0 !rounded-none !rounded-l-[2px] !border-none !bg-black"
          />
        ) : null}
        <div className="flex items-center space-x-2">
          <div className="text-editor-node-text flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
            <Icon size={20} />
          </div>
          <div className="flex flex-col pr-1">
            <p className="text-[10px] opacity-50">{label}</p>
            <p className="text-xs font-bold">{title}</p>
          </div>
        </div>
        {rightHandle ? (
          <Handle
            type="source"
            id="node-target"
            position={Position.Right}
            className="!-right-[2px] !h-4 !w-1 !min-w-0 !rounded-none !rounded-r-[2px] !border-none !bg-black"
          />
        ) : null}
      </div>
      {children}
    </div>
  );
}

export default EditorNode;

const BucketNode = () => {
  return (
    <EditorNode
      label="Bucket"
      title="example-bucket"
      icon={Cylinder}
      leftHandle={false}
      rightHandle
    />
  );
};

const MeasurementNode = () => {
  return (
    <EditorNode
      label="Measurement"
      title="example-measurement"
      icon={Grid2X2}
      leftHandle
      rightHandle
    />
  );
};

export const FieldNode = () => {
  return (
    <EditorNode
      label="Field"
      title="example-field"
      icon={RectangleEllipsis}
      leftHandle
      rightHandle
    />
  );
};

export const nodeTypes = {
  bucket: BucketNode,
  measurement: MeasurementNode,
  field: FieldNode,
} as any;
