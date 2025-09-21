/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Message } from 'InferenceSPA/components/Message';

/**
 * Tests that the Message component renders correctly.
 */
test('Message component renders correctly', () => {
    // Arrange
    const id = 'id';
    const humanName = 'humanName';
    const messageText = 'message';
    const sender = 'sender';

    // Act
    render(<Message sender={sender} message={messageText} humanName={humanName} id={id} />);

    // Assert
    expect(screen.getByTestId('message-card')).toBeInTheDocument();
    expect(screen.getByText(`${sender}:`)).toBeInTheDocument();
    expect(screen.getByText(messageText)).toBeInTheDocument();
});

/**
 * Tests that the Message component has the correct variant when the sender is the human interlocutor.
 */
test('Message variant is outlined when sender is human', () => {
    // Arrange
    const id = 'id';
    const humanName = 'humanName';
    const messageText = 'message';

    // Act
    render(<Message sender={humanName} message={messageText} humanName={humanName} id={id} />);

    // Assert
    expect(screen.getByTestId('message-card')).toBeInTheDocument();
    expect(screen.getByText(`${humanName}:`)).toBeInTheDocument();
    expect(screen.getByTestId('message-card')).toHaveClass('MuiPaper-outlined');
});

/**
 * Tests that the Message component has the correct variant when the sender is not the human interlocutor.
 */
test('Message variant is outlined when sender is not human', () => {
    // Arrange
    const id = 'id';
    const humanName = 'humanName';
    const messageText = 'message';
    const sender = 'sender';

    // Act
    render(<Message sender={sender} message={messageText} humanName={humanName} id={id} />);

    // Assert
    expect(screen.getByTestId('message-card')).toBeInTheDocument();
    expect(screen.getByText(`${sender}:`)).toBeInTheDocument();
    expect(screen.getByTestId('message-card')).toHaveClass('MuiPaper-elevation');
});
