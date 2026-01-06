export interface TCommunity {
  id: string;
  name: string;
  image: string;
  chat: Chat;
  createdAt: string;
}

export interface Chat {
  _count: Count;
}

export interface Count {
  participants: number;
}

export type TMember = {
  id: string;
  role: string;
  auth: {
    id: string;
    person: {
      name: string;
      email: string;
      image?: string;
    } | null;
    business: {
      name: string;
      email: string;
      image?: string;
    } | null;
  };
};
