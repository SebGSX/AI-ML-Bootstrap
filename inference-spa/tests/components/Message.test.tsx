/*
 * © 2024 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Message, { IMessageProps } from 'InferenceSPA/components/Message';

describe('Message Component Tests', () => {
  test('Message loads card.', () => {
    // Arrange
    const props: IMessageProps = {
      sender: 'Human',
      message: 'Hello',
      humanName: 'Human'
    }
    render(<Message {...props} />);

    // Act
    const messageCard: HTMLElement = screen.getByTestId('message-card')

    // Assert
    expect(messageCard).toBeInTheDocument;
  });
});