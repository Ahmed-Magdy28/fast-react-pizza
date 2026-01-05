export type CartITem = {
   pizzaId: number;
   name: string;
   quantity: number;
   unitPrice: number;
   totalPrice: number;
};

export type CartType = CartITem[];

export type Pizza = {
   id: number;
   name: string;
   unitPrice: number;
   ingredients: string[];
   soldOut: boolean;
   imageUrl: string;
};
export type OrderType = {
   id: string;
   customer: string;
   phone: string;
   address: string;
   priority: boolean;
   estimatedDelivery: string;
   cart: CartType;
   position: string;
   orderPrice: number;
   priorityPrice: number;
   status: Status;
};

export type Menu = Pizza[];
export type Status = 'preparing' | 'on the way' | 'delivered';
export type Orders = OrderType[];
export type item = CartITem;
export type positionObj = {
   coords: {
      latitude: number;
      longitude: number;
   };
};

export type useRouteErrorType = {
   statusText?: string;
   message?: string;
   toString: () => string;
   internal: boolean;
   status: number;
   data: string;
};

export type RootStateType = {
   user: userInitialStateType;
   cart: cartInitialStateType;
};

export type userInitialStateType = {
   username: string;
   status: 'idle' | 'loading' | 'failed';
   position: { latitude: number; longitude: number } | null;
   address?: string;
   error: string;
};
export type cartInitialStateType = {
   cart: CartType;
};
