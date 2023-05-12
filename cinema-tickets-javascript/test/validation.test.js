import { ticketType } from '../src/ticket/ticket';
import TicketTypeRequest from '../src/pairtest/lib/TicketTypeRequest';
import { isValidOrder } from '../src/ticket/validation';

describe('Test order tickets', () => {
  test('Order 1 adult Ticket', () => {
    console.log('Order 1 adult Ticket');
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);

    const orders = [adultTicket];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual([]);
  });

  test('Order 20 Ticket - Max Allowed', () => {
    const adultTickets = new TicketTypeRequest(ticketType.ADULT, 20);

    const orders = [adultTickets];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual([]);
  });
  test('Order 21 Ticket - bigger than Max No Allowed', () => {
    const adultTickets = new TicketTypeRequest(ticketType.ADULT, 21);

    const orders = [adultTickets];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual(['Cannot Order more than 20 tickets']);
  });

  test('Order 1 Children Ticket with no Adult - Not allowed', () => {
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);

    const orders = [childrenTicket];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual(['Needs at least 1 adult']);
  });

  test('Order 1 infant Ticket with no Adult - Not allowed', () => {
    const infantTickets = new TicketTypeRequest(ticketType.INFANT, 1);
    const orders = [infantTickets];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual(['Needs at least 1 adult']);
  });

  test('Order 1 adult and 1 infant Ticket - Allowed', () => {
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const orders = [adultTicket, infantTicket];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual([]);
  });
  test('Order 1 adult and 2 infant Tickets - Not Allowed', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 2);

    const orders = [adultTicket, infantTicket];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual([
      '1 or more infrant dont have a adult lap to sit on',
    ]);
  });
  test('Order 1 adult, 1 infant Tickets and 1 children - Allowed', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 1);
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);

    const orders = [adultTicket, infantTicket, childrenTicket];

    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual([]);
  });
  test('Order no adult, 1 infant Tickets and 1 children - Not Allowed', () => {
    const adultTicket = new TicketTypeRequest(ticketType.ADULT, 0);
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);

    const orders = [adultTicket, infantTicket, childrenTicket];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual(['Needs at least 1 adult']);
  });
  test('Order 1 infant Tickets and 1 children Adult item missing - Not Allowed', () => {
    const infantTicket = new TicketTypeRequest(ticketType.INFANT, 1);
    const childrenTicket = new TicketTypeRequest(ticketType.CHILD, 1);
    const orders = [infantTicket, childrenTicket];
    const errors = isValidOrder(orders);
    expect(errors).toStrictEqual(["Needs at least 1 adult"]);

  });
});
