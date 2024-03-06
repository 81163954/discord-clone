"use client";

import { FunctionComponent } from "react";
import { useSocket } from "./providers/socket-provider";
import { Badge } from "./ui/badge";

interface SocketIndicatorProps {}

const SocketIndicator: FunctionComponent<SocketIndicatorProps> = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant="outline" className="border-none bg-yellow-600 text-white">
        Fallback: Polling every 1s
      </Badge>
    );
  }

  return (
    <Badge variant="outline" className="border-none bg-emerald-600 text-white">
      Live: Real-time updates
    </Badge>
  );
};

export default SocketIndicator;
