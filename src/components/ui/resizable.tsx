import * as React from "react"
import { GripVertical } from "lucide-react"
import { PanelGroup as Group, Panel, PanelResizeHandle as Separator } from "react-resizable-panels"
import { cn } from "@/lib/utils"

const ResizablePanelGroup = (props: any) => {
  return <Group {...props} className={cn("flex h-full w-full", props.className)} />;
}

const ResizablePanel = Panel;

const ResizableHandle = ({ withHandle, className, ...props }: any) => {
  return (
    <Separator className={cn("relative flex w-px items-center justify-center bg-border", className)} {...props}>
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </Separator>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
