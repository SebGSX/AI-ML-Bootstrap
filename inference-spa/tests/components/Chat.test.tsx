/*
 * © 2023 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chat from 'InferenceSPA/components/Chat';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  // Create a mock API handler using the `rest` object from `msw`.
  rest.post('https://localhost:44393/inference', (req, res, ctx) => {
    return res(ctx.json({ text: 'Hi Human!' }));
  })
);

describe('Chat Component Tests', () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  test('Chat loads appropriate components.', () => {
    // Arrange
    render(<Chat />);

    // Act
    const chatFeedBox: HTMLElement = screen.getByTestId('chat-feed-box');
    const chatMessagesBox: HTMLElement = screen.getByTestId('chat-messages-box');
    const chatTextField: HTMLTextAreaElement = screen.getByTestId('chat-textfield');
    const chatSendButton: HTMLButtonElement = screen.getByTestId('chat-sendbutton');
    const messageCards: HTMLElement[] = screen.queryAllByTestId('message-card');

    // Assert
    expect(chatFeedBox).toBeInTheDocument;
    expect(chatMessagesBox).toBeInTheDocument;
    expect(chatTextField).toBeInTheDocument;
    expect(chatSendButton).toBeInTheDocument;
    expect(messageCards.length).toBe(0);
  });

  test('Chat text field updates value on key typed.', async () => {
    // Arrange
    render(<Chat />);
    const keyTyped: string = 'a';

    // Act
    var chatTextFieldInput: HTMLTextAreaElement = screen.getByTestId('chat-textfield-input');
    await userEvent.type(chatTextFieldInput, keyTyped);

    // Assert
    expect(chatTextFieldInput.value).toBe(keyTyped);
  });

  test('Completed chat text field resets on <ENTER> pressed.', async () => {
    // Arrange
    render(<Chat />);

    // Act
    const chatTextFieldInput: HTMLTextAreaElement = screen.getByTestId('chat-textfield-input') as HTMLTextAreaElement;
    await userEvent.type(chatTextFieldInput, 'Hi AI!');
    chatTextFieldInput.focus();
    await userEvent.keyboard('{enter}');
    const messageCards: HTMLElement[] = screen.queryAllByTestId('message-card');

    // Assert
    expect(chatTextFieldInput.value).toBe('');
    expect(messageCards.length).toBe(2);
  });

  test('Completed chat text field resets on send button clicked.', async () => {
    // Arrange
    render(<Chat />);

    // Act
    const chatTextFieldInput: HTMLTextAreaElement = screen.getByTestId('chat-textfield-input') as HTMLTextAreaElement;
    await userEvent.type(chatTextFieldInput, 'Hi AI!');
    const chatSendButton: HTMLButtonElement = screen.getByTestId('chat-sendbutton');
    await userEvent.click(chatSendButton);
    const messageCards: HTMLElement[] = screen.queryAllByTestId('message-card');

    // Assert
    expect(chatTextFieldInput.value).toBe('');
    expect(messageCards.length).toBe(2);
  });

  test('Empty chat text field unchanged on <ENTER> pressed.', async () => {
    // Arrange
    render(<Chat />);

    // Act
    const chatTextFieldInput: HTMLTextAreaElement = screen.getByTestId('chat-textfield-input') as HTMLTextAreaElement;
    chatTextFieldInput.focus();
    await userEvent.keyboard('{enter}');

    // Assert
    expect(chatTextFieldInput.value).toBe('');
  });

  test('Empty chat text field unchanged on send button clicked.', async () => {
    // Arrange
    render(<Chat />);

    // Act
    const chatTextFieldInput: HTMLTextAreaElement = screen.getByTestId('chat-textfield-input');;
    const chatSendButton: HTMLButtonElement = screen.getByTestId('chat-sendbutton');
    await userEvent.click(chatSendButton);

    // Assert
    expect(chatTextFieldInput.value).toBe('');
  });
});