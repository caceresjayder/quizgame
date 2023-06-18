"use client";

import {
  Box,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Modal,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { questions, responses } from "@/api/mocks/questions";
import { Cancel, Check, CheckCircle, Clear, Close } from "@mui/icons-material";

const initialState = {
  step: 0,
  responses: {},
};

const modalState = {
    is_open: false,
    responses: []
}

interface InitialState {
  step: number;
  responses: any;
}

export default function QuizRender() {
  const [stepperState, setStepperState] = useState<any>(initialState);
  const [modal, setModal] = useState(modalState)

  const setStep = (idx: number) => {
    const newState = {
      ...stepperState,
      step: idx,
    };
    setStepperState(newState);
  };

  const setResponse = (questionidx: number, e: any) => {
    const newState: InitialState = {
      ...stepperState,
      responses: {
        ...stepperState.responses,
        [questionidx]: e.target.value,
      },
    };
    console.log(newState);
    setStepperState(newState);
  };

  const verifyResponses = () => {
        const stateRes: any = stepperState.responses
        const toShow: any = []
        responses.map((item: any, idx: number) => {
            toShow.push({
                question: item.question,
                userRes: stateRes[idx],
                correctRes: item.response 
            })
        })
        console.log(toShow)
        setModal({responses: [], is_open: true})
        setTimeout(() => setModal({responses: toShow, is_open: true}), 3000)

  } 

  const StepperTab = (item: any, idx: number) => {
    if (stepperState.step === idx) {
      return (
        <Card sx={{ p: 2, width: {xs: '100%', sm: 500, mx:"auto"} }}>
          <Typography>{item.proposition}</Typography>
          <Typography mt={4}>{item.question}</Typography>
          <FormControl sx={{ my: 4 }}>
            <FormLabel>Select the correct option</FormLabel>
            <RadioGroup row>
              {item.options.map((option: string) => {
                return (
                  <FormControlLabel
                    onChange={(e) => setResponse(idx, e)}
                    value={option}
                    label={option}
                    key={`option-${option}`}
                    control={<Radio />}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
          <Stack direction="row" justifyContent="space-between">
            <Button
              variant="outlined"
              disabled={stepperState.step === 0}
              onClick={() => setStep(stepperState.step - 1)}
            >
              Back
            </Button>
            {idx !== 2 ? (
              <Button
                variant="outlined"
                disabled={stepperState.responses[idx] === undefined}
                onClick={() => setStep(stepperState.step + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                disabled={stepperState.responses[idx] === undefined}
                onClick={verifyResponses}
              >
                {" "}
                Finish
              </Button>
            )}
          </Stack>
        </Card>
      );
    }
  };

  return (
    <Box>
      <Stepper activeStep={stepperState.step}>
        {questions.map((item: any, idx: number) => {
          return (
            <Step key={`step-${idx}`}>
              <StepButton></StepButton>
            </Step>
          );
        })}
      </Stepper>
      <Divider sx={{ my: 2 }} />
      {questions.map((item: any, idx: number) => {
        return <Stack key={`question-${idx}`}>{StepperTab(item, idx)}</Stack>;
      })}
      <Modal open={modal.is_open} onClose={() => setModal({responses: [], is_open: false})}>
            <Card sx={{width: 400, p: 2, mx: 'auto', mt: 4}}>
                <CardHeader title='Answers' action={<IconButton onClick={() => setModal({responses: [], is_open: false})}><Close/></IconButton>}/>
            {modal.responses.length > 0 ? <Stack>
                {modal.responses.map((item: any, idx: number) => {
                    return(
                        <Stack key={`Answer-${idx}`}>
                            <Divider sx={{my: 4}}/>
                            <Typography>{item.question}</Typography>
                            {item.userRes === item.correctRes ? <CheckCircle color="success" sx={{fontSize: '48px', mx: 'auto', my: 2}}/> : <Cancel color="error" sx={{fontSize: '48px', mx: 'auto', my: 2}}/>}
                            <Typography>Corrent Answer: {item.correctRes}</Typography>
                        </Stack>
                    )
                })}
            </Stack> : <Box sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: 150}}> <CircularProgress size={60}/> </Box>}
            </Card>
      </Modal>
    </Box>
  );
}
