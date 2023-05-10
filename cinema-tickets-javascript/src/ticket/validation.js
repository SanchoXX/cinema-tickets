import { ticketType } from './ticket';

const maxTicketsPerPurchase = 20;

const getTotalNumOfTickets = (ticket) => {
  let result = 0;

  ticket.forEach((item) => {
    result += item.getNoOfTickets();
  });

  return result;
};

export const isValidSeatingArrangement = (orders) => {
  const adultTickets = orders.filter(
    (item) => item.getTicketType() === ticketType.ADULT,
  );
  const infantTicket = orders.filter(
    (item) => item.getTicketType() === ticketType.INFANT,
  );

  const numOfAdultTickets = getTotalNumOfTickets(adultTickets);
  const numOfInfantTickets = getTotalNumOfTickets(infantTicket);

  // must have at least 1 adult
  if (numOfAdultTickets > 0) {
    // infant must seat on adult lap
    if (numOfAdultTickets >= numOfInfantTickets) {
      return true;
    }
    return false;
  }
  return false;
};

export const isValidOrder = (orders) => {
  let result = false;
  // check if it is a vaild array
  if (Array.isArray(orders)) {
    let numberOfTickets = 0;
    orders.forEach((item) => {
      numberOfTickets += item.getNoOfTickets();
    });
    // Can't order more than 20 tickets
    if (numberOfTickets > 0 && numberOfTickets <= maxTicketsPerPurchase) {
      result = isValidSeatingArrangement(orders);
    }
  }
  return result;
};
