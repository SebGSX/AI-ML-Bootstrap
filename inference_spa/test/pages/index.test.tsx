/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Index from 'InferenceSPA/pages/index';

const uuidMock = jest.fn();
jest.mock('uuid', () => ({
    v4: () => uuidMock(),
}));

describe('Index Component Tests', () => {
    test('Index loads the chat feed.', () => {
        // Arrange
        render(<Index/>);

        // Act
        const chatFeedBox = screen.getByTestId('chat-feed-box')

        // Assert
        expect(chatFeedBox).toBeInTheDocument();
    });
});
