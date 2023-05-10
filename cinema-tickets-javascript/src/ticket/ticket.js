export const ticketType = {
  ADULT: 'ADULT',
  CHILD: 'CHILD',
  INFANT: 'INFANT',
};

const getPriceByTicketType = (type) => {
  switch (type) {
    case ticketType.ADULT:
      return 20;
    case ticketType.CHILD:
      return 10;
    case ticketType.INFANT:
      return 0;
    default:
      // default to adult price
      return 20;
  }
};

export const getTotalCost = (orders) => {
  let result = 0;

  orders.forEach((item) => {
    result += getPriceByTicketType(item.getTicketType());
  });

  return result;
};

export const getTotalSeat = (orders) => {
  let result = 0;

  // Infant dont need a seat.
  const processedOrders = orders.filter(
    (item) => item.getTicketType() !== ticketType.INFANT,
  );

  processedOrders.forEach((item) => {
    result += item.getNoOfTickets();
  });

  return result;
};
