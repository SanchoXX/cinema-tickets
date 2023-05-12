import { ticketType, getTotalCost } from '../src/ticket/ticket';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';

describe('Test calculate total cost', () => {
  test('Order 0 adult Ticket', () => {
    const orders = [];
    const totalCost = getTotalCost(orders);
    expect(totalCost).toBe(0);
  });
  test('Order 1 adult Ticket', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);

    const orders = [adultTicket];
    const totalCost = getTotalCost(orders);
    expect(totalCost).toBe(20);
  });
  test('Order 1 adult and 1 children Ticket', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);

    const orders = [adultTicket, childrenTicket];
    const totalCost = getTotalCost(orders);
    expect(totalCost).toBe(30);
  });
  test('Order 1 adult and 1 infant Ticket', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);

    const orders = [adultTicket, infantTicket];
    const totalCost = getTotalCost(orders);
    expect(totalCost).toBe(20);
  });
});
