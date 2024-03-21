import { cn } from "@/lib/utils";
import { Member, Profile } from "@prisma/client";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { ActionTooltip } from "../action-tooltip";
import { UserAvatar } from "../user-avatar";
import { useRouter, useParams } from "next/navigation";

interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="ml-2 h-4 w-4 text-indigo-500" />,
  ADMIN: <ShieldAlert className="ml-2 h-4 w-4 text-rose-500" />,
};

export const ChatItem = ({
  id,
  content,
  member,
  timestamp,
  fileUrl,
  deleted,
  currentMember,
  isUpdated,
  socketUrl,
  socketQuery,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const params = useParams();
  const router = useRouter();

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  return (
    <div className="group relative flex w-full items-center p-4 transition hover:bg-black/5">
      <div className="group relative flex w-full items-center p-4 transition hover:bg-black/5">
        <div className="group flex w-full items-start gap-x-2">
          <div
            onClick={onMemberClick}
            className="cursor-pointer transition hover:drop-shadow-md"
          >
            <UserAvatar src={member.profile.imageUrl} />
          </div>
          <div className="flex w-full flex-col">
            <div className="flex items-center gap-x-2">
              <div className="flex items-center">
                <p
                  onClick={onMemberClick}
                  className="cursor-pointer text-sm font-semibold hover:underline"
                >
                  {member.profile.name}
                </p>
                <ActionTooltip label={member.role}>
                  {roleIconMap[member.role]}
                </ActionTooltip>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {timestamp}
              </span>
            </div>
            {!fileUrl && !isEditing && (
              <p
                className={cn(
                  "text-sm text-zinc-600 dark:text-zinc-300",
                  deleted &&
                    "mt-1 text-xs italic text-zinc-500 dark:text-zinc-400",
                )}
              >
                {content}
                {isUpdated && !deleted && (
                  <span className="mx-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                    (edited)
                  </span>
                )}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
