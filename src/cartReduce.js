export default function cartReduce(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
    case "add":
      const { id, sku } = action;
      const itemInCart = cart.find((i) => i.sku === sku);
      if (itemInCart) {
        return cart.map((i) => {
          return i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i;
        });
      } else {
        return [...cart, { id, sku, quantity: 1 }];
      }
    case "update":
      const { sku, quantity } = action;
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        if (quantity === 0) {
          return items.filter((i) => i.sku !== sku);
        } else {
          return items.map((i) => {
            return i.sku === sku ? { ...i, quantity: quantity } : i;
          });
        }
      } else {
        return items;
      }
    default:
      throw new Error("Unhandled action type " + action.type);
  }
}
