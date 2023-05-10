import { ticketType, getTotalSeat } from '../src/ticket/ticket';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';

describe('Test calculate total cost', () => {
  test('Order 1 adult Ticket', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);

    const orders = [adultTicket];
    const totalCost = getTotalSeat(orders);
    expect(totalCost).toBe(1);
  });
  test('Order 1 adult and 1 children Ticket', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);

    const orders = [adultTicket,childrenTicket];
    const totalCost = getTotalSeat(orders);
    expect(totalCost).toBe(2);
  });
  test('Order 1 adult and 1 infant Ticket', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);

    const orders = [adultTicket,infantTicket];
    const totalCost = getTotalSeat(orders);
    expect(totalCost).toBe(1);
  });
});