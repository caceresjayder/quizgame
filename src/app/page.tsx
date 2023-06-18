'use client'
import Header from '@/components/Header'
import QuizRender from '@/components/QuizRender'
import StartQuiz from '@/components/StartQuiz'
import React, { useState } from 'react'

export default function Page() {
    const [view, setView] = useState('main')
  return (
    <div>
        <Header/>
        {view === 'main' && <StartQuiz action={setView}/>}
        {view === 'quiz' && <QuizRender/>}
    </div>
  )
}
