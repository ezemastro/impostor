import Feather from "@expo/vector-icons/Feather";
import { cssInterop } from "nativewind";
interface IconProps extends Partial<React.ComponentProps<typeof Feather>> {
  className?: string;
}

cssInterop(Feather, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});

export const ConfigIcon = ({ className, ...props }: IconProps) => (
  <Feather size={24} {...props} className={className} name="settings" />
);
export const PlusIcon = ({ className, ...props }: IconProps) => (
  <Feather size={24} {...props} className={className} name="plus" />
);
export const MinusIcon = ({ className, ...props }: IconProps) => (
  <Feather size={24} {...props} className={className} name="minus" />
);
export const EditIcon = ({ className, ...props }: IconProps) => (
  <Feather size={24} {...props} className={className} name="edit-3" />
);
export const TrashIcon = ({ className, ...props }: IconProps) => (
  <Feather size={24} {...props} className={className} name="trash-2" />
);
export const CrossIcon = ({ className, ...props }: IconProps) => (
  <Feather size={24} {...props} className={className} name="x" />
);
