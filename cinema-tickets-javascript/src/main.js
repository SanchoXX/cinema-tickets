import readline from 'readline-sync';
import * as _ from 'underscore';
import TicketTypeRequest from './pairtest/lib/TicketTypeRequest.js';
import TicketService from './pairtest/TicketService.js';
import InvalidPurchaseException from './pairtest/lib/InvalidPurchaseException.js';

function main() {
  let ordering = true;
  const ticketsType = ['ADULT', 'CHILD', 'INFANT'];
  const ticketProcessService = new TicketService();

  while (ordering) {
    const tickets = [];

    ticketsType.forEach((item) => {
      const value = readline.question(`How Many ${item} Tickets: `);

      const numberValue = parseInt(value, 10);

      const numOfTicket = Number.isNaN(numberValue) ? 0 : numberValue;
      const ticketsOrder = new TicketTypeRequest(item, numOfTicket);
      tickets.push(ticketsOrder);
    });

    try {
      const accountId = _.random(0, 100);
      console.log(`Processing Ticket Purchasing For Account ${accountId}`);

      ticketProcessService.purchaseTickets(
        accountId,
        tickets[0],
        tickets[1],
        tickets[2],
      );

      console.log(`Order Processed For Account ${accountId}`);
    } catch (error) {
      if (error instanceof InvalidPurchaseException) {
        const errorMsg = error.getErrors();

        if (Array.isArray(errorMsg)) {
          errorMsg.forEach((item) => {
            console.log(`Ticket Purchasing Failed Reason: ${item}`);
          });
        }
      } else {
        console.log(error.message);
      }
    } finally {
      ordering = false;
    }
  }
}
main();
