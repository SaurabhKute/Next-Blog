export type Post = {
  id: number;
  title: string;
  content: string;
  image: string;
  author: string;
  tags: string[];
  category: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  total_likes: number;
  is_liked: boolean;
};

export type Category = {
  id: number;
  name: string;
};

export type PostUpdate = {
  title: string;
  content: string;
  image?: string;
  tags?: string[];
  category?: string;
};

export type UserProfileUpdate = {
  name?: string;
  bio?: string;
  avatar?: string;
};

export type BreadcrumbProps = {
  breadcrumb: {
    href?: string;
    label: string;
  };
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export type NavLinkProps = {
  href: string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
};

export type DropdownItemProps = {
  href: string;
  label: string;
  onClick?: () => void;
};

export type FormData = {
  [key: string]: string;
};
