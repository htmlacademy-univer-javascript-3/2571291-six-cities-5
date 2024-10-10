import { createContext, useContext, useState } from 'react';

type User = {
  email: string;
};

const userContext = createContext<
  | { user: User | undefined; updateUser: (user: User | undefined) => void }
    | undefined
    >(undefined);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [_user, setUser] = useState<User | undefined>(undefined);

  const updateUser = (user: User | undefined) => setUser(user);

  return (
    <userContext.Provider value={{ user: _user, updateUser }}>
      {children}
    </userContext.Provider>
  );
}

export function useUser() {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
