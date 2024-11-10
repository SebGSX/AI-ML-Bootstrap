/*
 * © 2024 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import * as React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

/**
 * An interface representing the Message component props.
 */
export interface IMessageProps {
    /**
     * A string representing the name of the sender.
     */
    sender: string;
    /**
     * A string representing the message.
     */
    message: string;
    /**
     * A string representing the name of the human chat participant.
     */
    humanName: string;
}

/**
 * A component that renders a chat message.
 * @param props An IMessageProps representing the props for the component.
 * @returns A JSX element representing the component.
 */
export function Message({ sender, message, humanName }: Readonly<IMessageProps>) {
    const variant = sender === humanName ? 'outlined' : 'elevation';
    return (
        <Card data-testid='message-card' sx={{ mb: '0.5rem'}} variant={variant}>
            <CardContent sx={{ px: '1rem', py: '0.5rem' }}>
                <Typography sx={{ mr: '1rem' }} variant='subtitle2' component='span'>{sender}:</Typography>
                <Typography variant='body2' component='span'>{message}</Typography>
            </CardContent>
        </Card>
    )
}