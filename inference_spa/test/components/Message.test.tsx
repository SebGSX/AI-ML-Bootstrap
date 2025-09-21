/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { IMessageProps, Message } from 'InferenceSPA/components/Message';

describe('Message Component Tests', () => {
    test('Message loads card.', async () => {
        // Arrange
        const props: IMessageProps = {
            id: "Test-ID",
            sender: 'Human',
            message: 'Hello',
            humanName: 'Human'
        }
        render(<Message {...props} />);

        // Act
        const messageCard: HTMLElement = screen.getByTestId('message-card')

        // Assert
        await waitFor(() => {
            expect(messageCard).toBeInTheDocument();
        });
    });
});