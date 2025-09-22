/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import {act, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Chat from 'InferenceSPA/components/Chat';
import { IMessageProps } from 'InferenceSPA/components/Message';

/**
 * Tests that the Chat component renders correctly.
 */
test('Chat component renders correctly', () => {
    // Act
    render(<Chat />);

    // Assert
    expect(screen.getByTestId('chat-feed-box')).toBeInTheDocument();
    expect(screen.getByTestId('chat-messages-box')).toBeInTheDocument();
    expect(screen.getByTestId('chat-textfield')).toBeInTheDocument();
    expect(screen.getByTestId('chat-iconbutton')).toBeInTheDocument();
    expect(screen.getByTestId('chat-textfield-input')).toBeInTheDocument();
    expect(screen.queryAllByTestId('message-card').length).toBe(0);
});

/**
 * Tests that the Chat component text field updates its value when key typed.
 */
test('Chat component text field updates value when key typed', async () => {
    // Arrange
    const keyedText: string = 'Hello, AI!';

    // Act
    render(<Chat />);
    const textField = screen.getByTestId('chat-textfield-input') as HTMLInputElement;
    await act(async () => {
        await userEvent.type(textField, keyedText)
    });

    // Assert
    expect(textField.value).toBe(keyedText);
});

