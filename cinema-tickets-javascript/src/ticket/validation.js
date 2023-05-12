import { ticketType } from './ticket.js';

const maxTicketsPerPurchase = 20;

const getTotalNumOfTickets = (ticket) => {
  let result = 0;

  ticket.forEach((item) => {
    result += item.getNoOfTickets();
  });

  return result;
};

export const isValidSeatingArrangement = (orders) => {
  const errors = [];
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
      errors.push(); // no errors
    } else {
      errors.push('1 or more infrant dont have a adult lap to sit on');
    }
  } else {
    errors.push('Needs at least 1 adult');
  }
  return errors;
};

export const isValidOrder = (orders) => {
  let errors = [];
  // check if it is a vaild array
  if (Array.isArray(orders)) {
    let numberOfTickets = 0;
    orders.forEach((item) => {
      numberOfTickets += item.getNoOfTickets();
    });
    // Can't order more than 20 tickets
    if (numberOfTickets > 0) {
      if (numberOfTickets <= maxTicketsPerPurchase) {
        const settingError = isValidSeatingArrangement(orders);
        errors = [...settingError];
      } else {
        errors.push('Cannot Order more than 20 tickets');
      }
    } else {
      errors.push('Cannot Order less than 1 tickets');
    }
  }
  return errors;
};
