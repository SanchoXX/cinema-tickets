import { ticketType } from '../src/ticket/ticket';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';
import { isValidOrder } from '../src/ticket/validation';

describe('Test order tickets', () => {
  test('Order 1 adult Ticket', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);

    const orders = [adultTicket];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(true);
  });

  test('Order 20 Ticket - Max Allowed', () => {
    const adultTickets = new TicketTypeRequest(ticketType.ADULT, 20);

    const orders = [adultTickets];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(true);
  });
  test('Order 21 Ticket - bigger than Max No Allowed', () => {
    const adultTickets = new TicketTypeRequest(ticketType.ADULT, 21);

    const orders = [adultTickets];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(false);
  });

  test('Order 1 Children Ticket with no Adult - Not allowed', () => {
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);

    const orders = [childrenTicket];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(false);
  });

  test('Order 1 infant Ticket with no Adult - Not allowed', () => {
    const infantTickets = new TicketTypeRequest(ticketType.INFANT, 1);
    const orders = [infantTickets];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(false);
  });

  test('Order 1 adult and 1 infant Ticket - Allowed', () => {
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const orders = [adultTicket, infantTicket];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(true);
  });
  test('Order 1 adult and 2 infant Tickets - Not Allowed', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 2);

    const orders = [adultTicket, infantTicket];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(false);
  });
  test('Order 1 adult, 1 infant Tickets and 1 children - Allowed', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);

    const orders = [adultTicket, infantTicket, childrenTicket];

    const isValid = isValidOrder(orders);
    expect(isValid).toBe(true);
  });
  test('Order no adult, 1 infant Tickets and 1 children - Not Allowed', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 0);
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);

    const orders = [adultTicket , infantTicket , childrenTicket ];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(false);
  });
  test('Order 1 infant Tickets and 1 children Adult item missing - Not Allowed', () => {
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);
    const orders = [infantTicket, childrenTicket];
    const isValid = isValidOrder(orders);
    expect(isValid).toBe(false);
  });
});
