/*
 * © 2025 Seb Garrioch. All rights reserved.
 * Published under the MIT License.
 */

import {
  AppBar,
  Box,
  Container,
  IconButton,
  Link,
  Toolbar,
  Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react';

/**
 * Creates the layout component. The layout component is a container that contains the app bar and the footer shared by
 * all pages.
 * @param props The props for the component.
 * @returns A JSX.Element representing the layout component.
 */
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
    return (
        <>
            <Container data-testid='layout-container' maxWidth='lg'>
                <Box data-testid='layout-content-box' height='100vh' display='flex' flexDirection='column'>
                    <AppBar position='static'>
                        <Toolbar variant='dense'>
                            <IconButton edge='start' color='inherit' aria-label='menu' sx={{mr: 2}}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant='h6' color='inherit' component='div'>
                                Welcome to Chatbot
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    {children}
                </Box>
            </Container>
            <Box data-testid='layout-footer-box'
                 sx={{
                     bottom: 0,
                     mb: '1rem',
                     position: 'fixed',
                     width: '100%'
                 }}
                 component='footer'>
                <Typography sx={{textAlign: 'center'}} variant='body2'>&copy; 2025 Seb Garrioch. All rights reserved.
                    Published under the <Link href='https://github.com/SebGSX/AI-ML-Bootstrap/blob/main/LICENSE'
                                              target='_blank'>MIT License</Link>.</Typography>
            </Box>
        </>
    );
}
