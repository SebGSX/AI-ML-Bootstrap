/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import '@testing-library/jest-dom';
import {expect, test} from 'vitest';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {setupServer} from 'msw/node';
import Chat from 'InferenceSPA/components/Chat';

const server = setupServer(
    http.post('https://localhost:44393/inference', () => {
        return HttpResponse.json({text: 'Hi Human!'});
    })
);

describe('Chat component...', () => {
    beforeAll(() => server.listen());
    afterEach(() => server.resetHandlers());
    afterAll(() => server.close());

    /**
     * Tests that the Chat component renders correctly.
     */
    test('renders correctly.', () => {
        // Act
        render(<Chat/>);

        // Assert
        expect(screen.getByTestId('chat-feed-box')).toBeInTheDocument();
        expect(screen.getByTestId('chat-messages-box')).toBeInTheDocument();
        expect(screen.getByTestId('chat-textfield')).toBeInTheDocument();
        expect(screen.getByTestId('chat-iconbutton')).toBeInTheDocument();
        expect(screen.getByTestId('chat-textfield-input')).toBeInTheDocument();
        expect(screen.queryAllByTestId('message-card').length).toBe(0);
    });

    /**
     * Tests that the Chat component text field is unchanged when it is empty and the ENTER key is pressed.
     */
    test('text field unchanged when empty and ENTER key pressed.', async () => {
        // Act
        render(<Chat/>);

        const textField: HTMLTextAreaElement = screen.getByTestId('chat-textfield-input') as HTMLTextAreaElement;
        textField.focus();
        await userEvent.keyboard('{enter}');

        // Assert
        await waitFor(() => {
            expect(textField.value).toBe('');
        });
    });

    /**
     * Tests that the Chat component text field is unchanged when it is empty and the icon button is clicked.
     */
    test('text field unchanged when empty and icon button clicked.', async () => {
        // Act
        render(<Chat/>);

        const textField: HTMLTextAreaElement = screen.getByTestId('chat-textfield-input');
        const iconButton: HTMLButtonElement = screen.getByTestId('chat-iconbutton');
        await userEvent.click(iconButton)

        // Assert
        await waitFor(() => {
            expect(textField.value).toBe('');
        });
    });

    /**
     * Tests that the Chat component text field updates its value when text typed.
     */
    test('text field updates value when text typed.', async () => {
        // Arrange
        const inputText: string = 'Hello, AI!';

        // Act
        render(<Chat/>);
        const textField = screen.getByTestId('chat-textfield-input') as HTMLInputElement;
        await userEvent.type(textField, inputText);

        // Assert
        expect(textField.value).toBe(inputText);
    });

    /**
     * Tests that the Chat component sends a message and receives a response when text is typed and the ENTER key is
     * pressed.
     */
    test('sends message and response when text field not empty and ENTER pressed.', async () => {
        // Arrange
        const inputText: string = 'Hello, AI!';

        // Act
        render(<Chat/>);
        const textField = screen.getByTestId('chat-textfield-input') as HTMLInputElement;
        await userEvent.type(textField, inputText);

        textField.focus();
        await userEvent.keyboard('{enter}');

        const messageCards: HTMLElement[] = screen.queryAllByTestId('message-card');

        // Assert
        await waitFor(() => {
            expect(textField.value).toBe('');
            expect(messageCards.length).toBe(2);
        });
    });

    /**
     * Tests that the Chat component sends a message and receives a response when text is typed and the icon button is
     * clicked.
     */
    test('sends message and response when text field not empty and icon button clicked.', async () => {
        // Arrange
        const inputText: string = 'Hello, AI!';

        // Act
        render(<Chat/>);
        const textField = screen.getByTestId('chat-textfield-input') as HTMLInputElement;
        await userEvent.type(textField, inputText);

        const iconButton: HTMLButtonElement = screen.getByTestId('chat-iconbutton');
        await userEvent.click(iconButton)

        const messageCards: HTMLElement[] = screen.queryAllByTestId('message-card');

        // Assert
        await waitFor(() => {
            expect(textField.value).toBe('');
            expect(messageCards.length).toBe(2);
        });
    });
});
