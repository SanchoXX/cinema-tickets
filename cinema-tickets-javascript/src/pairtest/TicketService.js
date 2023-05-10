/* eslint-disable*/

import InvalidPurchaseException from './lib/InvalidPurchaseException.js';
import { getTotalCost, getTotalSeat } from '../ticket/ticket.js';
import { isValidOrder } from '../ticket/validation.js';
import TicketPaymentService from '../thirdparty/paymentgateway/TicketPaymentService.js';
import SeatReservationService from '../thirdparty/seatbooking/SeatReservationService.js';

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    const isRequestVaild = isValidOrder(ticketTypeRequests);
    const paymentService = new TicketPaymentService();
    const reservationService = new SeatReservationService();

    if (isRequestVaild) {
      // work out cost
      const totalCost = getTotalCost(ticketTypeRequests);

      // do the payment
      paymentService.makePayment(accountId, totalCost);

      // get Number of seats
      const totalSeats = getTotalSeat(ticketTypeRequests);

      // do the seat booking]
      reservationService.reserveSeat(accountId, totalSeats);
    } else {
      throw new InvalidPurchaseException('Not an vaild ticket selection');
    }
  }
}
