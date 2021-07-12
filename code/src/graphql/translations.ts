import { OrderStatus, OrderType, Side } from './generated';

export const OrderStatusLookup: { [key in OrderStatus]: string } = {
  NEW: 'New',
  PLACED: 'Placed',
  EXECUTED: 'Executed',
  CANCELED: 'Canceled',
};

export const OrderTypeLookup: { [key in OrderType]: string } = {
  MARKET: 'Market',
  LIMIT: 'Limit',
};

export const SideLookup: { [key in Side]: string } = {
  BUY: 'Buy',
  SELL: 'Sell',
};
