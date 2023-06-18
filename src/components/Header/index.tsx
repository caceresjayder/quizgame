'use client'

import { Psychology } from '@mui/icons-material'
import { AppBar, Stack, Typography } from '@mui/material'
import React from 'react'

export default function Header() {
  return (
    <Stack height={50}>
        <AppBar sx={{height: 50, display: 'flex', alignContent: 'center', justifyContent: 'center', width: '100%'}} >
            <Stack direction='row' mx='auto' alignContent='center' justifyContent='center'>
            <Psychology fontSize='large'/>
            <Typography variant='h6'>QuizGame</Typography>
            </Stack>
        </AppBar>
    </Stack>
  )
}
