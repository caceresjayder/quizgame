import { Button, Card, CardHeader, Stack } from '@mui/material'
import React from 'react'

export default function StartQuiz(props: any) {
  return (
    <Card sx={{width: 400, mt: 4, mx: 'auto', p: 2}}>
        <CardHeader title='Spanish Test' subheader='Test your knowledge on the spanish language'/>
        <Stack justifyContent='flex-end' alignItems='flex-end' width='100%' my={2}>
        <Button onClick={() => props.action('quiz')} variant='contained'> Take test</Button>
        </Stack>
    </Card>
  )
}
