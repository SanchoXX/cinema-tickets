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
    console.log(`Validating`);
    const errors = isValidOrder(ticketTypeRequests);
    const paymentService = new TicketPaymentService();
    const reservationService = new SeatReservationService();

    // no errors
    if (errors.length === 0) {
      // work out cost
      const totalCost = getTotalCost(ticketTypeRequests);
      // do the payment
      console.log('Processing Payment: ', totalCost);
      paymentService.makePayment(accountId, totalCost);
      console.log('Payment Processed !');

      // get Number of seats
      const totalSeats = getTotalSeat(ticketTypeRequests);
      console.log('Reserving Number of seats : ', totalSeats);

      // do the seat booking]
      reservationService.reserveSeat(accountId, totalSeats);
      console.log('Seats are reserved !');
    } else {
      throw new InvalidPurchaseException(errors);
    }
  }
}
