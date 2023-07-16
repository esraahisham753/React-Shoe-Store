export default function cartReduce(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add": {
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        return cart.map((i) => {
          return i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i;
        });
      } else {
        return [...cart, { id, sku, quantity: 1 }];
      }
    }
    case "updateQuantity":
      const { sku, quantity } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        if (quantity === 0) {
          return cart.filter((i) => i.sku !== sku);
        } else {
          return cart.map((i) => {
            return i.sku === sku ? { ...i, quantity: quantity } : i;
          });
        }
      } else {
        return cart;
      }
    default:
      throw new Error("Unhandled action type " + action.type);
  }
}
